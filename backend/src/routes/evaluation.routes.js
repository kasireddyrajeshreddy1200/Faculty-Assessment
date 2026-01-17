const express = require('express');
const router = express.Router();

const evaluationController = require('../controllers/evaluation.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorizeRoles } = require('../middleware/role.middleware');

router.get(
  '/pending',
  protect,
  authorizeRoles('EVALUATOR'),
  evaluationController.getPendingContributions
);

router.post(
  '/:contributionId',
  protect,
  authorizeRoles('EVALUATOR'),
  evaluationController.evaluateContribution
);

router.post(
  '/final',
  protect,
  authorizeRoles('EVALUATOR'),
  evaluationController.createFinalFacultyEvaluation
);


module.exports = router;
