// const Evaluation = require('../models/Evaluation');
// const Contribution = require('../models/Contribution');
// const FacultyEvaluation = require('../models/FacultyEvaluation');
// const calculateFacultyScore = require('../utils/scoreCalculator');

// /**
//  * @desc Evaluate contribution
//  * @route POST /api/evaluations/:contributionId
//  */
// exports.evaluateContribution = async (req, res) => {
//   try {
//     const { score, remarks } = req.body;
//     const { contributionId } = req.params;

//     if (score === undefined) {
//       return res.status(400).json({ message: 'Score is required' });
//     }

//     const contribution = await Contribution.findById(contributionId);
//     if (!contribution) {
//       return res.status(404).json({ message: 'Contribution not found' });
//     }

//     if (contribution.faculty.toString() === req.user.id) {
//       return res.status(403).json({
//         message: 'Cannot evaluate own contribution'
//       });
//     }

//     if (contribution.status !== 'PENDING') {
//       return res.status(400).json({
//         message: 'Contribution already evaluated'
//       });
//     }

//     const evaluation = await Evaluation.create({
//       contribution: contributionId,
//       evaluator: req.user.id,
//       score,
//       remarks
//     });

//     contribution.score = score;
//     contribution.status = 'APPROVED';
//     await contribution.save();

//     res.status(201).json({
//       message: 'Contribution evaluated',
//       evaluation
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// /**
//  * @desc Get all pending contributions
//  * @route GET /api/evaluations/pending
//  */
// exports.getPendingContributions = async (req, res) => {
//   try {
//     const contributions = await Contribution.find({ status: 'PENDING' })
//       .populate('faculty', 'name email');

//     res.json(contributions);

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };



// /**
//  * @desc Create final faculty evaluation (year-wise)
//  * @route POST /api/evaluations/final
//  */
// exports.createFinalFacultyEvaluation = async (req, res) => {
//   try {
//     const { facultyId, academicYear, remarks } = req.body;

//     const totalScore = await calculateFacultyScore(
//       facultyId,
//       academicYear
//     );

//     const finalEvaluation = await FacultyEvaluation.create({
//       faculty: facultyId,
//       academicYear,
//       totalScore,
//       evaluator: req.user.id,
//       remarks
//     });

//     res.status(201).json({
//       message: 'Final faculty evaluation created',
//       finalEvaluation
//     });

//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };


// // exports.getFacultyForFinalEvaluation = async (req, res) => {
// //   try {
// //     const Evaluation = require('../models/Evaluation');

// //     const evaluations = await Evaluation.find({
// //       status: 'EVALUATED'
// //     }).populate('faculty', 'name email');

// //     const facultyMap = new Map();

// //     evaluations.forEach((e) => {
// //       if (e.faculty && !facultyMap.has(e.faculty._id.toString())) {
// //         facultyMap.set(e.faculty._id.toString(), e.faculty);
// //       }
// //     });

// //     res.json(Array.from(facultyMap.values()));
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };

// exports.getFacultyListForFinalEvaluation = async (req, res) => {
//   try {
//     const Evaluation = require('../models/Evaluation');

//     const evaluations = await Evaluation.find()
//       .populate({
//         path: 'contribution',
//         populate: {
//           path: 'faculty',
//           select: 'name email'
//         }
//       });

//     const facultyMap = new Map();

//     evaluations.forEach((e) => {
//       if (e.contribution?.faculty) {
//         const f = e.contribution.faculty;
//         facultyMap.set(f._id.toString(), f);
//       }
//     });

//     res.json(Array.from(facultyMap.values()));
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


// exports.getFacultyContributionYears = async (req, res) => {
//   try {
//     const Contribution = require('../models/Contribution');

//     const contributions = await Contribution.find({
//       faculty: req.params.facultyId,
//       status: 'APPROVED'
//     }).select('academicYear');

//     const yearSet = new Set();

//     contributions.forEach((c) => {
//       if (c.academicYear) {
//         yearSet.add(c.academicYear);
//       }
//     });

//     res.json(Array.from(yearSet).sort());
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.previewFinalEvaluation = async (req, res) => {
//   try {
//     const { facultyId, academicYear } = req.params;

//     // const contributions = await Contribution.find({
//     //   faculty: facultyId,
//     //   academicYear,
//     //   status: 'APPROVED'
//     // }).select('title score');

//     const contributions = await Contribution.find({
//   faculty: facultyId,
//   academicYear,
//   status: 'APPROVED'
// }); // no select => returns all fields


//     if (contributions.length === 0) {
//       return res.json({
//         contributions: [],
//         finalScore: 0
//       });
//     }

//     const finalScore = contributions.reduce(
//       (sum, c) => sum + (c.score || 0),
//       0
//     );

//     res.json({
//       contributions,
//       finalScore
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
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

     // ✅ Check if contribution has already been evaluated
    const existingEvaluation = await Evaluation.findOne({ contribution: contributionId });
    if (existingEvaluation) {
      return res.status(400).json({ message: 'This contribution has already been evaluated' });
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

// exports.createFinalFacultyEvaluation = async (req, res) => {
//   try {
//     const { facultyId, academicYear, remarks } = req.body;

//     // ✅ Check if final evaluation already exists
//     const existing = await FacultyEvaluation.findOne({ faculty: facultyId, academicYear });
//     if (existing) {
//       return res.status(400).json({ message: 'Final evaluation for this faculty and year already exists' });
//     }

//     // ✅ Auto-calculate total score
//     const totalScore = await calculateFacultyScore(facultyId, academicYear);

//     const finalEvaluation = await FacultyEvaluation.create({
//       faculty: facultyId,
//       academicYear,
//       totalScore,
//       evaluator: req.user.id,
//       remarks
//     });

//     res.status(201).json({
//       message: 'Final faculty evaluation created',
//       finalEvaluation
//     });

//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };


exports.createFinalFacultyEvaluation = async (req, res) => {
  try {
    const { facultyId, academicYear, remarks } = req.body;

    const contributions = await Contribution.find({
      faculty: facultyId,
      academicYear
    });

    if (!contributions.length) {
      return res.status(400).json({
        message: 'No contributions found for this academic year'
      });
    }

    const pending = contributions.find(
      c => c.status !== 'APPROVED'
    );

    if (pending) {
      return res.status(400).json({
        message: 'All contributions must be evaluated before final evaluation'
      });
    }

    const alreadyEvaluated = await FacultyEvaluation.findOne({
      faculty: facultyId,
      academicYear
    });

    if (alreadyEvaluated) {
      return res.status(400).json({
        message: 'Final evaluation already submitted for this academic year'
      });
    }

    const totalScore = contributions.reduce(
      (sum, c) => sum + c.score,
      0
    );

    const finalEvaluation = await FacultyEvaluation.create({
      faculty: facultyId,
      academicYear,
      totalScore,
      evaluator: req.user.id,
      remarks
    });

    res.status(201).json(finalEvaluation);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};



/**
 * @desc Get list of faculties for final evaluation (only those with approved contributions)
 */
exports.getFacultyListForFinalEvaluation = async (req, res) => {
  try {
    const evaluations = await Evaluation.find()
      .populate({
        path: 'contribution',
        populate: { path: 'faculty', select: 'name email' }
      });

    const facultyMap = new Map();
    evaluations.forEach((e) => {
      if (e.contribution?.faculty) {
        facultyMap.set(e.contribution.faculty._id.toString(), e.contribution.faculty);
      }
    });

    res.json(Array.from(facultyMap.values()));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @desc Get academic years a faculty contributed
 */
// exports.getFacultyContributionYears = async (req, res) => {
//   try {
//     const contributions = await Contribution.find({
//       faculty: req.params.facultyId,
//       status: 'APPROVED'
//     }).select('academicYear');

//     const yearSet = new Set();
//     contributions.forEach((c) => {
//       if (c.academicYear) yearSet.add(c.academicYear);
//     });

//     res.json(Array.from(yearSet).sort());
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

exports.getFacultyContributionYears = async (req, res) => {
  try {
    const facultyId = req.params.facultyId;

    // 1️⃣ Get approved contribution years
    const contributions = await Contribution.find({
      faculty: facultyId,
      status: 'APPROVED'
    }).select('academicYear');

    const yearSet = new Set();
    contributions.forEach(c => {
      if (c.academicYear) yearSet.add(c.academicYear);
    });

    const allYears = Array.from(yearSet);

    // 2️⃣ Get finalized years
    const finalized = await FacultyEvaluation.find({
      faculty: facultyId
    }).select('academicYear');

    const finalizedYears = finalized.map(f => f.academicYear);

    // 3️⃣ Attach finalized flag
    const result = allYears.map(year => ({
      year,
      finalized: finalizedYears.includes(year)
    }));

    res.json(result.sort((a, b) => a.year.localeCompare(b.year)));

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


/**
 * @desc Preview final evaluation: all contributions + final score
 */
// exports.previewFinalEvaluation = async (req, res) => {
//   try {
//     const { facultyId, academicYear } = req.params;

//     // Get all contributions of that faculty & year
//     const contributions = await Contribution.find({
//       faculty: facultyId,
//       academicYear,
//       status: 'APPROVED'
//     }); // Returns all fields (title, description, score, category, etc)

//     // Auto-calculate final score
//     const finalScore = contributions.reduce((sum, c) => sum + (c.score || 0), 0);

//     res.json({
//       contributions,
//       finalScore
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

exports.previewFinalEvaluation = async (req, res) => {
  try {
    const { facultyId, academicYear } = req.params;

    // 🔥 Get ALL contributions (not only approved)
    const contributions = await Contribution.find({
      faculty: facultyId,
      academicYear
    });

    // if (!contributions.length) {
    //   return res.json({
    //     contributions: [],
    //     finalScore: 0,
    //     allEvaluated: false
    //   });
    // }

        
    const allEvaluated = contributions.every(
  c => c.status === 'APPROVED'   // or 'EVALUATED'
);

    const finalScore = contributions.reduce(
      (sum, c) => sum + (c.score || 0),
      0
    );

    res.json({
      contributions,
      finalScore,
      allEvaluated
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


/**
 * @desc Optional: Faculty can view their final evaluations
 * @route GET /api/evaluations/faculty-final
 */
exports.getMyFinalEvaluations = async (req, res) => {
  try {
    const evaluations = await FacultyEvaluation.find({ faculty: req.user.id })
      .populate('evaluator', 'name email')
      .populate('faculty', 'name email');

    res.json(evaluations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
