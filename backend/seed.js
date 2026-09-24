require('dotenv').config();
const { connectDB, disconnectDB } = require('./config/db');
const Student = require('./models/Student');
const User = require('./models/User');

async function seed() {
  await connectDB();
  await Student.deleteMany({});
  await User.deleteMany({});

  const students = await Student.insertMany([
    { name: 'Anu', branch: 'CSE', email: 'anu@sec.edu' },
    { name: 'Ravi', branch: 'IT', email: 'ravi@sec.edu' },
    { name: 'Priya', branch: 'AIML', email: 'priya@sec.edu' }
  ]);
  console.log('Students seeded:', students.map(s => s.email));

  const admin = await User.create({ name: 'Admin', email: 'admin@sec.edu', password: 'admin123' });
  console.log('Admin user seeded:', admin.email, '(password: admin123 hashed)');

  await disconnectDB();
}

seed().catch(e => { console.error(e); process.exit(1); });
