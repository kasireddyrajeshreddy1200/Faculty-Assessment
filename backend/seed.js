const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/models/User');

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    // Clear existing users
    await User.deleteMany({});
    console.log('Cleared existing users');

    // Create test users
    const testUsers = [
      {
        name: 'Admin User',
        email: 'admin@test.com',
        password: await bcrypt.hash('password123', 10),
        role: 'ADMIN'
      },
      {
        name: 'Faculty User',
        email: 'faculty@test.com',
        password: await bcrypt.hash('password123', 10),
        role: 'FACULTY'
      },
      {
        name: 'Evaluator User',
        email: 'evaluator@test.com',
        password: await bcrypt.hash('password123', 10),
        role: 'EVALUATOR'
      }
    ];

    const createdUsers = await User.insertMany(testUsers);
    console.log('\n✅ Seed data created successfully!\n');
    console.log('Test Credentials:');
    console.log('─────────────────');
    console.log('Admin:');
    console.log('  Email: admin@test.com');
    console.log('  Password: password123\n');
    console.log('Faculty:');
    console.log('  Email: faculty@test.com');
    console.log('  Password: password123\n');
    console.log('Evaluator:');
    console.log('  Email: evaluator@test.com');
    console.log('  Password: password123\n');

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error.message);
    process.exit(1);
  }
}

seedDatabase();
