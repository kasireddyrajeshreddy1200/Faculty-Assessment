const mongoose = require('mongoose');

const evaluationSchema = new mongoose.Schema(
  {
    contribution: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contribution',
      required: true,
      unique: true
    },
    evaluator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    score: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    remarks: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Evaluation', evaluationSchema);
