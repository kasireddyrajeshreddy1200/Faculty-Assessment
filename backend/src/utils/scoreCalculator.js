const Evaluation = require('../models/Evaluation');
const Contribution = require('../models/Contribution');

const calculateFacultyScore = async (facultyId, academicYear) => {
  // 1️⃣ Get all approved contributions for that faculty/year
  const contributions = await Contribution.find({
    faculty: facultyId,
    academicYear,
    status: 'APPROVED'
  });

  if (contributions.length === 0) {
    throw new Error('No approved contributions found for this academic year');
  }

  const contributionIds = contributions.map(c => c._id);

  // 2️⃣ Get evaluations for those contributions
  const evaluations = await Evaluation.find({
    contribution: { $in: contributionIds }
  });

  // 3️⃣ Check if any contribution is missing an evaluation
  if (evaluations.length !== contributions.length) {
    // Find which ones are missing
    const evaluatedIds = evaluations.map(e => e.contribution.toString());
    const missing = contributions
      .filter(c => !evaluatedIds.includes(c._id.toString()))
      .map(c => c.title || c._id);

    throw new Error(
      `Cannot calculate final score. Missing evaluations for contributions: ${missing.join(', ')}`
    );
  }

  // 4️⃣ Calculate total score
  const totalScore = evaluations.reduce((sum, e) => sum + e.score, 0);

  return totalScore;
};

module.exports = calculateFacultyScore;
