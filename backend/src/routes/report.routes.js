const express = require('express');
const router = express.Router();

const {
  getFacultyYearReport,
  getCategorySummary,
  getSystemReport,getFacultyReportById
} = require('../controllers/report.controller');

const { protect } = require('../middleware/auth.middleware');
const { authorizeRoles } = require('../middleware/role.middleware');

router.get(
  '/faculty/:academicYear',
  protect,
  authorizeRoles('FACULTY'),
  getFacultyYearReport
);

router.get(
  '/faculty-report/:facultyId/:academicYear',
  protect,
  authorizeRoles('EVALUATOR', 'ADMIN'),
  getFacultyReportById
);


router.get(
  '/category/:academicYear',
  protect,
  authorizeRoles('ADMIN'),
  getCategorySummary
);

// router.get(
//   '/category-summary',
//   protect,
//   authorizeRoles('ADMIN'),
//   getCategorySummary
// );

router.get(
  '/system',
  protect,
  authorizeRoles('ADMIN'),
  getSystemReport
);

module.exports = router;
