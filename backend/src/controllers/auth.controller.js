const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields required' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    res.status(201).json({
      message: 'User registered successfully'
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: '1d' }
//     );

//     res.json({
//       message: 'Login successful',
//       token
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


exports.login = async (req, res) => {
  try {
    console.log('LOGIN REQUEST BODY:', req.body);

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log('USER FROM DB:', user);

    if (!user) {
      console.log('❌ User not found');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('PASSWORD MATCH:', isMatch);

    if (!isMatch) {
      console.log('❌ Password mismatch');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    console.log('✅ LOGIN SUCCESS');

    res.json({
      message: 'Login successful',
      token
    });

  } catch (error) {
    console.error('LOGIN ERROR:', error);
    res.status(500).json({ message: error.message });
  }
};
