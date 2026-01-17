const Contribution = require('../models/Contribution');

/**
 * @desc Create contribution
 * @route POST /api/contributions
 */
exports.createContribution = async (req, res) => {
  try {
    const { category, title, description, academicYear } = req.body;

    const contribution = await Contribution.create({
      faculty: req.user.id,
      category,
      title,
      description,
      academicYear
    });

    res.status(201).json({
      message: 'Contribution created',
      contribution
    });

  } catch (error) {
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


    Object.assign(contribution, req.body);
    await contribution.save();

    res.json({
      message: 'Contribution updated',
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
