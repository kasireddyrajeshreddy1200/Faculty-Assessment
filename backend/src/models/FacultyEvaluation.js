const mongoose = require('mongoose');

const facultyEvaluationSchema = new mongoose.Schema(
  {
    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    academicYear: {
      type: String,
      required: true
    },
    totalScore: {
      type: Number,
      required: true
    },
    evaluator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    remarks: {
      type: String
    }
  },
  { timestamps: true }
);

// One evaluation per faculty per year
// facultyEvaluationSchema.index(
//   { faculty: 1, academicYear: 1 },
//   { unique: true }
// );

module.exports = mongoose.model(
  'FacultyEvaluation',
  facultyEvaluationSchema
);
