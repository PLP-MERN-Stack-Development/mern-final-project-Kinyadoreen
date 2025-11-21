import mongoose from 'mongoose';

const ProgressSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    completedLessons: {
      type: [Number],
      default: [],
    },
    overallProgress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    lastAccessed: {
      type: Date,
      default: Date.now,
    },
    certificateIssued: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

ProgressSchema.index({ student: 1, course: 1 }, { unique: true });

export default mongoose.model('Progress', ProgressSchema);
