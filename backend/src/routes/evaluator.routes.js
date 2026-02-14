const express = require('express');
const router = express.Router();

const {
  upsertEvaluatorProfile,
  getEvaluatorProfile
} = require('../controllers/evaluator.controller');

const { protect } = require('../middleware/auth.middleware');
const { authorizeRoles } = require('../middleware/role.middleware');

// Create / Update Evaluator Profile
router.post(
  '/profile',
  protect,
  authorizeRoles('EVALUATOR'),
  upsertEvaluatorProfile
);

// Get Evaluator Profile
router.get(
  '/profile',
  protect,
  authorizeRoles('EVALUATOR'),
  getEvaluatorProfile
);

module.exports = router;
