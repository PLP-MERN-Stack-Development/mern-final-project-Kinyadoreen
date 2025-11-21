const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Course = require('../models/Course');
const Progress = require('../models/Progress');
require('dotenv').config();

// Users
const users = [
  { name: 'Admin User', email: 'admin@edubridge.com', password: 'password123', role: 'admin' },
  { name: 'John Teacher', email: 'teacher@demo.com', password: 'password123', role: 'teacher' },
  { name: 'Jane Student', email: 'student@demo.com', password: 'password123', role: 'student' },
];

// Courses
const courses = [
  {
    title: 'Introduction to Web Development',
    description: 'Learn HTML, CSS, JavaScript.',
    category: 'Programming',
    level: 'beginner',
    isPublished: true,
    lessons: [
      { title: 'Getting Started with HTML', content: 'HTML basics', duration: 45, order: 1 },
      { title: 'Styling with CSS', content: 'CSS basics', duration: 60, order: 2 },
      { title: 'JavaScript Fundamentals', content: 'JS basics', duration: 75, order: 3 },
      { title: 'Building Your First Website', content: 'Complete website', duration: 90, order: 4 },
    ],
  },
  {
    title: 'Python for Beginners',
    description: 'Learn Python from scratch.',
    category: 'Programming',
    level: 'beginner',
    isPublished: true,
    lessons: [
      { title: 'Python Basics', content: 'Variables, data types', duration: 40, order: 1 },
      { title: 'Control Flow', content: 'If statements, loops', duration: 50, order: 2 },
      { title: 'Functions and Modules', content: 'Reusable code', duration: 55, order: 3 },
    ],
  },
  {
    title: 'Mathematics Fundamentals',
    description: 'Learn algebra, geometry, and basic calculus.',
    category: 'Mathematics',
    level: 'intermediate',
    isPublished: true,
    lessons: [
      { title: 'Algebra Basics', content: 'Variables, expressions, equations', duration: 45, order: 1 },
      { title: 'Geometry Fundamentals', content: 'Shapes, angles, spatial reasoning', duration: 50, order: 2 },
    ],
  },
  {
    title: 'English Communication Skills',
    description: 'Improve English for academic and professional settings.',
    category: 'Languages',
    level: 'beginner',
    isPublished: true,
    lessons: [
      { title: 'Grammar Essentials', content: 'Parts of speech, sentence structure', duration: 40, order: 1 },
      { title: 'Speaking Practice', content: 'Pronunciation, conversation skills', duration: 45, order: 2 },
    ],
  },
  {
    title: 'Digital Literacy for Everyone',
    description: 'Learn essential computer skills.',
    category: 'Life Skills',
    level: 'beginner',
    isPublished: true,
    lessons: [
      { title: 'Computer Basics', content: 'Hardware, software, OS', duration: 35, order: 1 },
      { title: 'Internet Essentials', content: 'Browsing, searching, online safety', duration: 40, order: 2 },
    ],
  },
  {
    title: 'Marketing Fundamentals',
    description: 'Learn the basics of marketing strategy and tactics.',
    category: 'Business',
    level: 'beginner',
    isPublished: true,
    lessons: [
      { title: 'Introduction to Marketing', content: 'Marketing principles', duration: 40, order: 1 },
      { title: 'Digital Marketing Basics', content: 'Social media, email campaigns', duration: 50, order: 2 },
    ],
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://kinyadoreen01_db_user:dFWqKZlkzPcORwcO@cluster0.wqmrhpg.mongodb.net/edubridge?retryWrites=true&w=majority');
    console.log('✅ MongoDB Connected');

    await User.deleteMany();
    await Course.deleteMany();
    await Progress.deleteMany();
    console.log('🗑️ Cleared existing data');

    // Hash passwords before creating users
    const hashedUsers = await Promise.all(
      users.map(async (u) => ({ ...u, password: await bcrypt.hash(u.password, 12) }))
    );
    const createdUsers = await User.insertMany(hashedUsers);
    console.log(`✅ Created ${createdUsers.length} users`);

    const teacher = createdUsers.find(u => u.role === 'teacher');
    const coursesWithInstructor = courses.map(c => ({ ...c, instructor: teacher._id }));

    const createdCourses = await Course.insertMany(coursesWithInstructor);
    console.log(`✅ Created ${createdCourses.length} courses`);

    // Progress for students
    const students = createdUsers.filter(u => u.role === 'student');
    for (const student of students) {
      const progressData = createdCourses.map(c => ({
        student: student._id,
        course: c._id,
        completedLessons: [],
        progressPercentage: 0,
      }));
      await Progress.insertMany(progressData);
    }
    console.log(`✅ Created progress records for ${students.length} students`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('Demo accounts:');
    console.log('Admin: admin@edubridge.com / password123');
    console.log('Teacher: teacher@demo.com / password123');
    console.log('Student: student@demo.com / password123');

    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding database:', err);
    process.exit(1);
  }
};

seedDatabase();
