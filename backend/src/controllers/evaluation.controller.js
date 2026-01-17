const Evaluation = require('../models/Evaluation');
const Contribution = require('../models/Contribution');
const FacultyEvaluation = require('../models/FacultyEvaluation');
const calculateFacultyScore = require('../utils/scoreCalculator');

/**
 * @desc Evaluate contribution
 * @route POST /api/evaluations/:contributionId
 */
exports.evaluateContribution = async (req, res) => {
  try {
    const { score, remarks } = req.body;
    const { contributionId } = req.params;

    if (score === undefined) {
      return res.status(400).json({ message: 'Score is required' });
    }

    const contribution = await Contribution.findById(contributionId);
    if (!contribution) {
      return res.status(404).json({ message: 'Contribution not found' });
    }

    if (contribution.faculty.toString() === req.user.id) {
      return res.status(403).json({
        message: 'Cannot evaluate own contribution'
      });
    }

    if (contribution.status !== 'PENDING') {
      return res.status(400).json({
        message: 'Contribution already evaluated'
      });
    }

    const evaluation = await Evaluation.create({
      contribution: contributionId,
      evaluator: req.user.id,
      score,
      remarks
    });

    contribution.score = score;
    contribution.status = 'APPROVED';
    await contribution.save();

    res.status(201).json({
      message: 'Contribution evaluated',
      evaluation
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/**
 * @desc Get all pending contributions
 * @route GET /api/evaluations/pending
 */
exports.getPendingContributions = async (req, res) => {
  try {
    const contributions = await Contribution.find({ status: 'PENDING' })
      .populate('faculty', 'name email');

    res.json(contributions);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



/**
 * @desc Create final faculty evaluation (year-wise)
 * @route POST /api/evaluations/final
 */
exports.createFinalFacultyEvaluation = async (req, res) => {
  try {
    const { facultyId, academicYear, remarks } = req.body;

    const totalScore = await calculateFacultyScore(
      facultyId,
      academicYear
    );

    const finalEvaluation = await FacultyEvaluation.create({
      faculty: facultyId,
      academicYear,
      totalScore,
      evaluator: req.user.id,
      remarks
    });

    res.status(201).json({
      message: 'Final faculty evaluation created',
      finalEvaluation
    });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
