const EvaluatorProfile = require('../models/EvaluatorProfile');

exports.upsertEvaluatorProfile = async (req, res) => {
  try {
    const { department, designation, joiningDate, qualifications } = req.body;

    let profile = await EvaluatorProfile.findOne({ user: req.user.id });

    if (profile) {
      profile.department = department;
      profile.designation = designation;
      profile.joiningDate = joiningDate;
      profile.qualifications = qualifications;
      await profile.save();

      return res.json({
        message: 'Evaluator profile updated',
        profile
      });
    }

    profile = await EvaluatorProfile.create({
      user: req.user.id,
      department,
      designation,
      joiningDate,
      qualifications
    });

    res.status(201).json({
      message: 'Evaluator profile created',
      profile
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEvaluatorProfile = async (req, res) => {
  try {
    const profile = await EvaluatorProfile
      .findOne({ user: req.user.id })
      .populate('user', 'name email role');

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(profile);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
