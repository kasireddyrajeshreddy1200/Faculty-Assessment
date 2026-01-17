const express = require('express');
const router = express.Router();

const {
  getFacultyYearReport,
  getCategorySummary,
  getSystemReport
} = require('../controllers/report.controller');

const { protect } = require('../middleware/auth.middleware');
const { authorizeRoles } = require('../middleware/role.middleware');

router.get(
  '/faculty/:facultyId/:academicYear',
  protect,
  authorizeRoles('FACULTY', 'EVALUATOR', 'ADMIN'),
  getFacultyYearReport
);

router.get(
  '/category/:academicYear',
  protect,
  authorizeRoles('ADMIN'),
  getCategorySummary
);

router.get(
  '/system',
  protect,
  authorizeRoles('ADMIN'),
  getSystemReport
);

module.exports = router;
