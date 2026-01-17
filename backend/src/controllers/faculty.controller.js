const FacultyProfile = require('../models/FacultyProfile');

/**
 * @desc Create or Update faculty profile
 * @route POST /api/faculty/profile
 */
exports.upsertFacultyProfile = async (req, res) => {
  try {
    const { department, designation, joiningDate, qualifications } = req.body;

    let profile = await FacultyProfile.findOne({ user: req.user.id });

    if (profile) {
      profile.department = department;
      profile.designation = designation;
      profile.joiningDate = joiningDate;
      profile.qualifications = qualifications;

      await profile.save();

      return res.json({
        message: 'Faculty profile updated',
        profile
      });
    }

    profile = await FacultyProfile.create({
      user: req.user.id,
      department,
      designation,
      joiningDate,
      qualifications
    });

    res.status(201).json({
      message: 'Faculty profile created',
      profile
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc Get logged-in faculty profile
 * @route GET /api/faculty/profile
 */
exports.getFacultyProfile = async (req, res) => {
  try {
    const profile = await FacultyProfile
      .findOne({ user: req.user.id })
      .populate('user', 'name email role');

    if (!profile) {
      return res.status(404).json({
        message: 'Profile not found'
      });
    }

    res.json(profile);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
