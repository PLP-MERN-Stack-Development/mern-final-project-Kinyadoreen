import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Clock } from 'lucide-react';

function CourseCard({ course }) {
  return (
    <Link
      to={`/courses/${course._id}`}
      className="card hover:shadow-xl transition-shadow cursor-pointer group"
    >
      <div className="h-40 bg-gradient-to-br from-primary-500 to-purple-600 rounded-t-xl -mt-6 -mx-6 mb-4 flex items-center justify-center">
        <BookOpen size={64} className="text-white" />
      </div>

      <div className="flex gap-2 mb-3">
        <span className="px-3 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full capitalize">
          {course.level}
        </span>
        <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
          {course.category}
        </span>
      </div>

      <h3 className="text-xl font-bold mb-2 group-hover:text-primary-600 transition">
        {course.title}
      </h3>
      <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>

      <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-3">
        <div className="flex items-center gap-1">
          <Users size={16} />
          <span>{course.enrolledStudents?.length || 0}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock size={16} />
          <span>{course.lessons?.length || 0} lessons</span>
        </div>
      </div>

      <div className="mt-3 text-sm text-gray-600">
        👨‍🏫 {course.instructor?.name}
      </div>
    </Link>
  );
}

export default CourseCard;
