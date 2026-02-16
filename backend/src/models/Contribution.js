const mongoose = require('mongoose');

const contributionSchema = new mongoose.Schema(
  {
    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    category: {
      type: String,
      enum: [
        'TEACHING',
        'RESEARCH',
        'ADMINISTRATION',
        'EXTENSION',
        'OTHER'
      ],
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    academicYear: {
      type: String,
      required: true // e.g. 2023-2024
    },
    score: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ['PENDING', 'APPROVED', 'REJECTED'],
      default: 'PENDING'
    },
   proofFiles: [
  {
    fileName: { type: String },
    filePath: { type: String },
    fileType: { type: String },
    fileSize: { type: Number },
    uploadedAt: { type: Date }
  }
]

  },
  { timestamps: true }
);

module.exports = mongoose.model('Contribution', contributionSchema);
