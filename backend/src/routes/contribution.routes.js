const express = require('express');
const router = express.Router();

const contributionController = require('../controllers/contribution.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorizeRoles } = require('../middleware/role.middleware');
const upload = require('../middleware/upload.middleware');


// router.post(
//   '/',
//   protect,
//   authorizeRoles('FACULTY'),
//   upload.array('proofFiles', 3), // max 3 files
//   contributionController.createContribution
// );
router.post(
  '/',
  protect,
  authorizeRoles('FACULTY'),
  (req, res, next) => {
    upload.array('proofFiles', 3)(req, res, function (err) {
      if (err) {
        return res.status(400).json({
          message: err.message
        });
      }
      next();
    });
  },
  contributionController.createContribution
);



router.get(
  '/',
  protect,
  authorizeRoles('FACULTY'),
  contributionController.getMyContributions
);

router.get(
  '/file/:contributionId/:fileIndex',
  protect,
  authorizeRoles('EVALUATOR', 'FACULTY', 'ADMIN'),
  contributionController.downloadProofFile
);


router.put(
  '/:id',
  protect,
  authorizeRoles('FACULTY'),
 // upload.array('proofFiles', 3),
 (req, res, next) => {
  upload.array('proofFiles', 3)(req, res, function (err) {
    if (err) {
      return res.status(400).json({
        message: err.message
      });
    }
    next();
  });
},

  contributionController.updateContribution
);


router.delete(
  '/:id',
  protect,
  authorizeRoles('FACULTY'),
  contributionController.deleteContribution
);

module.exports = router;
