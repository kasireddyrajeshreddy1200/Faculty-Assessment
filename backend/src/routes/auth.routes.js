const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorizeRoles } = require('../middleware/role.middleware');

// // sanity check (GET)
// router.get('/test', (req, res) => {
//   res.json({ message: 'Auth route working' });
// });

// // ⚠️ TEMP ROUTE — USE ONCE, THEN DELETE
// router.post('/seed-admin', async (req, res) => {
//   try {
//     const User = require('../models/User');
//     const bcrypt = require('bcryptjs');

//     const adminExists = await User.findOne({ role: 'ADMIN' });
//     if (adminExists) {
//       return res.status(400).json({ message: 'Admin already exists' });
//     }

//     const admin = await User.create({
//       name: 'System Admin',
//       email: 'admin@test.com',
//       password: await bcrypt.hash('admin123', 10),
//       role: 'ADMIN'
//     });

//     res.status(201).json({
//       message: 'Admin created successfully',
//       admin: {
//         email: admin.email,
//         role: admin.role
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

router.post(
  '/register',
  protect,
  authorizeRoles('ADMIN'),
  authController.register
);
router.post('/login', authController.login);

module.exports = router;
