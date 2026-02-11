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

// ✅ FINAL MUST COME BEFORE :contributionId
router.post(
  '/final',
  protect,
  authorizeRoles('EVALUATOR'),
  evaluationController.createFinalFacultyEvaluation
);

router.get(
  '/faculty-list',
  protect,
  authorizeRoles('EVALUATOR'),
  evaluationController.getFacultyListForFinalEvaluation
);

router.get(
  '/faculty/:facultyId/years',
  protect,
  authorizeRoles('EVALUATOR'),
  evaluationController.getFacultyContributionYears
);

router.get(
  '/final-preview/:facultyId/:academicYear',
  protect,
  authorizeRoles('EVALUATOR'),
  evaluationController.previewFinalEvaluation
);

// ❗ ALWAYS KEEP PARAM ROUTES LAST
router.post(
  '/:contributionId',
  protect,
  authorizeRoles('EVALUATOR'),
  evaluationController.evaluateContribution
);

module.exports = router;
