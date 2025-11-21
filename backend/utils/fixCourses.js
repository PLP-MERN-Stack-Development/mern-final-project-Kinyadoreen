const mongoose = require('mongoose');
const Course = require('../models/Course');
const User = require('../models/User');
require('dotenv').config();

const fixCourses = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');

    // Find or create a default instructor
    let defaultInstructor = await User.findOne({ email: 'admin@edubridge.com' });
    
    if (!defaultInstructor) {
      defaultInstructor = await User.create({
        name: 'EduBridge Team',
        email: 'admin@edubridge.com',
        password: 'Admin@123456',
        role: 'instructor',
      });
      console.log('✅ Created default instructor:', defaultInstructor.name);
    } else {
      console.log('✅ Found default instructor:', defaultInstructor.name);
    }

    // Get ALL courses
    const allCourses = await Course.find({});
    console.log(`\n📊 Total courses in database: ${allCourses.length}`);

    // Show all courses and their instructor status
    console.log('\n📋 All Courses:');
    allCourses.forEach((course, index) => {
      console.log(`${index + 1}. ${course.title}`);
      console.log(`   - Instructor: ${course.instructor ? 'Has instructor ✅' : 'Missing instructor ❌'}`);
      console.log(`   - Published: ${course.isPublished ? 'Yes' : 'No'}`);
      console.log(`   - Category: ${course.category}`);
      console.log('');
    });

    // Update courses without instructor
    const coursesWithoutInstructor = await Course.find({
      $or: [
        { instructor: { $exists: false } },
        { instructor: null }
      ]
    });

    console.log(`\n🔧 Fixing ${coursesWithoutInstructor.length} courses without instructor...`);

    for (const course of coursesWithoutInstructor) {
      course.instructor = defaultInstructor._id;
      await course.save();
      console.log(`✅ Updated: ${course.title}`);
    }

    console.log(`\n✅ All courses fixed!`);
    console.log(`\n📊 Final count: ${allCourses.length} courses total`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

fixCourses();