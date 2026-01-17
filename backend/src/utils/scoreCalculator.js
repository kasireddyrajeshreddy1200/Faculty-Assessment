const Evaluation = require('../models/Evaluation');
const Contribution = require('../models/Contribution');

const calculateFacultyScore = async (facultyId, academicYear) => {
  const contributions = await Contribution.find({
    faculty: facultyId,
    academicYear,
    status: 'APPROVED'
  });

  if (contributions.length === 0) {
    throw new Error('No approved contributions found');
  }

  const contributionIds = contributions.map(c => c._id);

  const evaluations = await Evaluation.find({
    contribution: { $in: contributionIds }
  });

  const totalScore = evaluations.reduce(
    (sum, e) => sum + e.score,
    0
  );

  return totalScore;
};

module.exports = calculateFacultyScore;
