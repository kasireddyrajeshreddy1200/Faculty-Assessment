const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorizeRoles } = require('../middleware/role.middleware');
const { getMe } = require('../controllers/auth.controller');
const { getAllFaculty } = require('../controllers/auth.controller');

router.post(
  '/register',
  protect,
  authorizeRoles('ADMIN'),
  authController.register
);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
router.get('/me', protect, getMe);

router.get(
  '/faculty-list',
  protect,
  authorizeRoles('EVALUATOR', 'ADMIN'),
  getAllFaculty
);

module.exports = router;
