const express = require('express');
const router = express.Router();

// Get dashboard statistics
router.get('/stats', async (req, res) => {
  try {
    res.json({
      totalStudents: 150,
      totalCourses: 25,
      totalEnrollments: 320,
      activeUsers: 89
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get recent activities
router.get('/activities', async (req, res) => {
  try {
    res.json({
      activities: [
        {
          id: 1,
          type: 'enrollment',
          message: 'New student enrolled in Web Development',
          timestamp: new Date().toISOString()
        }
      ]
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;