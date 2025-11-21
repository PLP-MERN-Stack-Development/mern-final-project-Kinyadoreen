const express = require('express');
const router = express.Router();
const Course = require('../models/Course'); // Your Course model

// Seeded courses (sample)
const coursesSeed = [
  {
    title: 'Introduction to Web Development',
    description: 'Learn the fundamentals of web development including HTML, CSS, and JavaScript.',
    category: 'Programming',
    level: 'beginner', // must be lowercase to match enum
    lessons: [
      { title: 'Getting Started with HTML', content: 'HTML basics', duration: 45, order: 1 },
      { title: 'Styling with CSS', content: 'CSS basics', duration: 60, order: 2 },
      { title: 'JavaScript Fundamentals', content: 'JS basics', duration: 75, order: 3 },
    ],
    isPublished: true,
    price: 0,
  },
  {
    title: 'Python for Beginners',
    description: 'Start your programming journey with Python.',
    category: 'Programming',
    level: 'beginner',
    lessons: [
      { title: 'Python Basics', content: 'Python variables and types', duration: 40, order: 1 },
      { title: 'Control Flow', content: 'If statements and loops', duration: 50, order: 2 },
    ],
    isPublished: true,
    price: 0,
  },
  {
    title: 'Mathematics Fundamentals',
    description: 'Learn essential math concepts.',
    category: 'Mathematics',
    level: 'intermediate',
    lessons: [
      { title: 'Algebra Basics', content: 'Algebra intro', duration: 45, order: 1 },
      { title: 'Geometry Fundamentals', content: 'Geometry intro', duration: 50, order: 2 },
    ],
    isPublished: true,
    price: 0,
  },
];

// GET all courses
router.get('/', async (req, res) => {
  try {
    // Check if DB is empty; if yes, seed courses
    const count = await Course.countDocuments();
    if (count === 0) {
      await Course.insertMany(coursesSeed);
    }

    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET single course by ID
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
