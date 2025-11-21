import Course from '../models/courseModel.js';
import Progress from '../models/progressModel.js';
import User from '../models/userModel.js';

export const getDashboard = async (req, res) => {
  try {
    const userId = req.user._id;

    // Fetch all courses the student is enrolled in
    const enrolledCourses = await Course.find({ enrolledStudents: userId });

    // Fetch progress records for the student
    const progressRecords = await Progress.find({ student: userId });

    // Map progress data to courses
    const coursesWithProgress = enrolledCourses.map((course) => {
      const progress = progressRecords.find(
        (p) => p.course.toString() === course._id.toString()
      );
      const completedLessons = progress?.completedLessons.length || 0;
      const totalLessons = course.lessons.length;

      return {
        _id: course._id,
        title: course.title,
        description: course.description,
        completedLessons,
        totalLessons,
      };
    });

    // Calculate stats
    const totalCourses = enrolledCourses.length;
    const completedCourses = coursesWithProgress.filter(
      (c) => c.completedLessons === c.totalLessons
    ).length;
    const certificates = completedCourses; // assuming 1 certificate per completed course

    res.json({
      stats: { totalCourses, completedCourses, certificates },
      enrolledCourses: coursesWithProgress,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
