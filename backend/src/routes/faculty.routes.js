const express = require('express');
const router = express.Router();

const facultyController = require('../controllers/faculty.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorizeRoles } = require('../middleware/role.middleware');

router.post(
  '/profile',
  protect,
  authorizeRoles('FACULTY'),
  facultyController.upsertFacultyProfile
);

router.get(
  '/profile',
  protect,
  authorizeRoles('FACULTY'),
  facultyController.getFacultyProfile
);

module.exports = router;
