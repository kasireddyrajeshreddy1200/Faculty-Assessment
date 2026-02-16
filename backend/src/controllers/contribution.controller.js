const Contribution = require('../models/Contribution');
const fs = require('fs');
const path = require('path');

/**
 * @desc Create contribution
 * @route POST /api/contributions
 */
// exports.createContribution = async (req, res) => {
//   try {
//     const { category, title, description, academicYear } = req.body;

//     const contribution = await Contribution.create({
//       faculty: req.user.id,
//       category,
//       title,
//       description,
//       academicYear
//     });

//     res.status(201).json({
//       message: 'Contribution created',
//       contribution
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

exports.createContribution = async (req, res) => {
  try {
    const { category, title, description, academicYear } = req.body;

    // 🔴 Ensure at least 1 file uploaded
    if (!req.files || req.files.length < 1) {
      return res.status(400).json({
        message: 'At least one proof file is required'
      });
    }

    if (req.files.length > 3) {
  return res.status(400).json({
    message: 'Maximum 3 proof files allowed'
  });
}

    // Prepare file metadata
    const proofFiles = req.files.map(file => ({
      fileName: file.originalname,
      filePath: file.path,
      fileType: file.mimetype,
      fileSize: file.size,
      uploadedAt: new Date()
    }));

    const contribution = await Contribution.create({
      faculty: req.user.id,
      category,
      title,
      description,
      academicYear,
      proofFiles
    });

    res.status(201).json({
      message: 'Contribution created',
      contribution
    });

  } catch (error) {

    // 🧹 Cleanup uploaded files if DB fails
    if (req.files && req.files.length > 0) {
      req.files.forEach(file => {
        fs.unlink(file.path, err => {
          if (err) console.error('File cleanup error:', err);
        });
      });
    }

    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc Get logged-in faculty contributions
 * @route GET /api/contributions
 */
exports.getMyContributions = async (req, res) => {
  try {
    const contributions = await Contribution.find({
      faculty: req.user.id
    }).sort({ createdAt: -1 });

    res.json(contributions);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc Update contribution
 * @route PUT /api/contributions/:id
 */
exports.updateContribution = async (req, res) => {
  try {
    const contribution = await Contribution.findById(req.params.id);

    if (!contribution) {
      return res.status(404).json({ message: 'Contribution not found' });
    }

    if (contribution.faculty.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (contribution.status !== 'PENDING') {
      return res.status(400).json({
        message: 'Cannot edit evaluated contribution'
      });
    }

    const { category, title, description, academicYear, filesToRemove } = req.body;

    // ✅ Update basic fields
    contribution.category = category;
    contribution.title = title;
    contribution.description = description;
    contribution.academicYear = academicYear;

    /* =====================================================
       STEP 1 — REMOVE SELECTED EXISTING FILES
    ===================================================== */

    let removeList = [];

    if (filesToRemove) {
      try {
        removeList = JSON.parse(filesToRemove);
      } catch (err) {
        removeList = [];
      }
    }

    if (removeList.length > 0) {
      contribution.proofFiles = contribution.proofFiles.filter(file => {
        if (removeList.includes(file.filePath)) {
          // Delete file from disk
          fs.unlink(file.filePath, (err) => {
            if (err) console.error('File delete error:', err);
          });
          return false; // remove from DB
        }
        return true;
      });
    }

    /* =====================================================
       STEP 2 — ADD NEW FILES (IF ANY)
    ===================================================== */

    const existingCount = contribution.proofFiles.length;
    const newCount = req.files ? req.files.length : 0;

    if (existingCount + newCount > 3) {
      return res.status(400).json({
        message: 'Maximum 3 proof files allowed'
      });
    }

    if (req.files && req.files.length > 0) {
      const newFiles = req.files.map(file => ({
        fileName: file.originalname,
        filePath: file.path,
        fileType: file.mimetype,
        fileSize: file.size,
        uploadedAt: new Date()
      }));

      contribution.proofFiles.push(...newFiles);
    }

    await contribution.save();

    res.json({
      message: 'Contribution updated successfully',
      contribution
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/**
 * @desc Delete contribution
 * @route DELETE /api/contributions/:id
 */
exports.deleteContribution = async (req, res) => {
  try {
    const contribution = await Contribution.findById(req.params.id);

    if (!contribution) {
      return res.status(404).json({ message: 'Contribution not found' });
    }

    if (contribution.faculty.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await contribution.deleteOne();

    res.json({ message: 'Contribution deleted' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/**
 * @desc Download proof file
 * @route GET /api/contributions/file/:contributionId/:fileIndex
 */
exports.downloadProofFile = async (req, res) => {
  try {
    const { contributionId, fileIndex } = req.params;

    const contribution = await Contribution.findById(contributionId);

    if (!contribution) {
      return res.status(404).json({ message: 'Contribution not found' });
    }

    const file = contribution.proofFiles[fileIndex];

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    res.download(file.filePath, file.fileName);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
