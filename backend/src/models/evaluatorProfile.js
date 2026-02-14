const mongoose = require('mongoose');

const evaluatorProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    department: {
      type: String,
      required: true
    },
    designation: {
      type: String,
      required: true
    },
    joiningDate: {
      type: Date,
      required: true
    },
    qualifications: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('EvaluatorProfile', evaluatorProfileSchema);
