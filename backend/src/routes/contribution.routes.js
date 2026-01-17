const express = require('express');
const router = express.Router();

const contributionController = require('../controllers/contribution.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorizeRoles } = require('../middleware/role.middleware');

router.post(
  '/',
  protect,
  authorizeRoles('FACULTY'),
  contributionController.createContribution
);

router.get(
  '/',
  protect,
  authorizeRoles('FACULTY'),
  contributionController.getMyContributions
);

router.put(
  '/:id',
  protect,
  authorizeRoles('FACULTY'),
  contributionController.updateContribution
);

router.delete(
  '/:id',
  protect,
  authorizeRoles('FACULTY'),
  contributionController.deleteContribution
);

module.exports = router;
