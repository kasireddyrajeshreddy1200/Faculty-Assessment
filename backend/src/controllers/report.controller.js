const Contribution = require('../models/Contribution');

/**
 * Faculty-wise performance report (Year-based)
 * Access: FACULTY (self), EVALUATOR, ADMIN
 */
exports.getFacultyYearReport = async (req, res) => {
  try {
    const facultyId = req.user.id; // 🔥 from JWT
    const { academicYear } = req.params;

    const contributions = await Contribution.find({
      faculty: facultyId,
      academicYear,
      status: 'APPROVED'
    });

    const totalScore = contributions.reduce(
      (sum, c) => sum + (c.score || 0),
      0
    );

    res.status(200).json({
      academicYear,
      totalScore,
      contributionCount: contributions.length,
      contributions
    });

  } catch (error) {
    console.log("REPORT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


/**
 * Category-wise summary report (Admin)
 */
exports.getCategorySummary = async (req, res) => {
  try {
    const { academicYear } = req.params;

    const report = await Contribution.aggregate([
      {
        $match: {
          academicYear,
          status: 'APPROVED'
        }
      },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          totalScore: { $sum: '$score' }
        }
      }
    ]);

    res.status(200).json(report);

  } catch (error) {
    console.log("Category Report Error:", error);
    res.status(500).json({ message: error.message });
  }
};





/**
 * Overall system report (Admin)
 */
exports.getSystemReport = async (req, res) => {
  try {
    const report = await Contribution.aggregate([
      {
        $match: { status: 'APPROVED' }
      },
      {
        $group: {
          _id: '$academicYear',
          totalScore: { $sum: '$score' },
          totalContributions: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFacultyReportById = async (req, res) => {
  try {
    const { facultyId, academicYear } = req.params;

    const contributions = await Contribution.find({
      faculty: facultyId,
      academicYear,
      status: 'APPROVED'
    });

    const totalScore = contributions.reduce(
      (sum, c) => sum + (c.score || 0),
      0
    );

    res.status(200).json({
      academicYear,
      totalScore,
      contributionCount: contributions.length,
      contributions
    });

  } catch (error) {
    console.log("Evaluator Report Error:", error);
    res.status(500).json({ message: error.message });
  }
};

