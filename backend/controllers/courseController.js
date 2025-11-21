import Course from '../models/Course.js';
import User from '../models/User.js';
import Progress from '../models/Progress.js';
import { AppError } from '../middleware/errorHandler.js';

export const getCourses = async (req, res, next) => {
  try {
    const { category, level, search } = req.query;

    const query = {};
    if (category) query.category = category;
    if (level) query.level = level;
    if (search) query.$text = { $search: search };

    const courses = await Course.find(query)
      .populate('instructor', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: courses.length,
      courses,
    });
  } catch (error) {
    next(error);
  }
};

export const getCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('instructor', 'name email');

    if (!course) {
      return next(new AppError('Course not found', 404));
    }

    res.json({
      success: true,
      course,
    });
  } catch (error) {
    next(error);
  }
};

export const createCourse = async (req, res, next) => {
  try {
    if (req.user.role !== 'teacher' && req.user.role !== 'admin') {
      return next(new AppError('Only teachers can create courses', 403));
    }

    const course = await Course.create({
      ...req.body,
      instructor: req.user._id,
    });

    await User.findByIdAndUpdate(req.user._id, {
      $push: { createdCourses: course._id },
    });

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      course,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return next(new AppError('Course not found', 404));
    }

    if (course.instructor.toString() !== req.user._id.toString()) {
      return next(new AppError('Not authorized', 403));
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Course updated successfully',
      course: updatedCourse,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return next(new AppError('Course not found', 404));
    }

    if (course.instructor.toString() !== req.user._id.toString()) {
      return next(new AppError('Not authorized', 403));
    }

    await Course.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Course deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const enrollCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return next(new AppError('Course not found', 404));
    }

    if (course.enrolledStudents.includes(req.user._id)) {
      return next(new AppError('Already enrolled', 400));
    }

    course.enrolledStudents.push(req.user._id);
    await course.save();

    await User.findByIdAndUpdate(req.user._id, {
      $push: { enrolledCourses: course._id },
    });

    await Progress.create({
      student: req.user._id,
      course: course._id,
    });

    res.json({
      success: true,
      message: 'Enrolled successfully',
      course,
    });
  } catch (error) {
    next(error);
  }
};

export const getDashboard = async (req, res, next) => {
  try {
    const enrolledCourses = await Course.find({
      _id: { $in: req.user.enrolledCourses },
    }).populate('instructor', 'name');

    const progressData = await Progress.find({ student: req.user._id }).populate('course');

    res.json({
      success: true,
      enrolledCourses,
      progressData,
      stats: {
        totalCourses: enrolledCourses.length,
        completedCourses: progressData.filter((p) => p.overallProgress === 100).length,
        certificates: progressData.filter((p) => p.certificateIssued).length,
      },
    });
  } catch (error) {
    next(error);
  }
};
