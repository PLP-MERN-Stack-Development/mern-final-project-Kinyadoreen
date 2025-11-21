const mongoose = require('mongoose');
const Course = require('../models/Course');
const User = require('../models/User'); // ✅ Add this line
require('dotenv').config();

const checkCourses = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected\n');

    const allCourses = await Course.find({})
      .populate('instructor', 'name email')
      .lean();

    console.log(`📊 Total Courses: ${allCourses.length}\n`);
    console.log('═'.repeat(60));

    allCourses.forEach((course, index) => {
      console.log(`\n${index + 1}. ${course.title}`);
      console.log(`   Category: ${course.category}`);
      console.log(`   Level: ${course.level}`);
      console.log(`   Instructor: ${course.instructor ? course.instructor.name : 'None'}`);
      console.log(`   Lessons: ${course.lessons?.length || 0}`);
      console.log(`   Enrolled: ${course.enrolledStudents?.length || 0}`);
      console.log(`   Published: ${course.isPublished ? '✅' : '❌'}`);
      console.log(`   Created: ${new Date(course.createdAt).toLocaleDateString()}`);
    });

    console.log('\n' + '═'.repeat(60));
    console.log('\n✅ Check complete!\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

checkCourses();