const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  videoUrl: String,
  duration: { type: Number, required: true },
  order: { type: Number, required: true },
});

const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a course title'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Programming',
        'Business',
        'Design',
        'Marketing',
        'Science',
        'Mathematics',
        'Languages',
        'Life Skills',
      ],
    },
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    lessons: [LessonSchema],
    enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    rating: { type: Number, default: 0, min: 0, max: 5 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

CourseSchema.index({ title: 'text', description: 'text' });
CourseSchema.index({ category: 1, level: 1 });

module.exports = mongoose.model('Course', CourseSchema);
