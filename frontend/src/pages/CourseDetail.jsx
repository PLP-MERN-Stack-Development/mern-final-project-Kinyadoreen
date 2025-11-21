import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, CheckCircle, Lock } from 'lucide-react';
import { useCourse, useEnrollCourse } from '../hooks/useCourses.js';
import { useAuthStore } from '../store/authStore.js';
import Button from '../components/ui/Button.jsx';

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { data, isLoading } = useCourse(id);
  const { mutate: enroll, isPending } = useEnrollCourse();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const course = data?.course;

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Course not found</p>
          <Button onClick={() => navigate('/courses')}>Back to Courses</Button>
        </div>
      </div>
    );
  }

  const handleEnroll = () => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    enroll(course._id, {
      onSuccess: () => {
        alert('Successfully enrolled! 🎉');
      },
      onError: (error) => {
        alert(error.response?.data?.message || 'Enrollment failed');
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-600 to-purple-700 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate('/courses')}
            className="flex items-center gap-2 mb-4 hover:underline"
          >
            <ArrowLeft size={20} />
            Back to Courses
          </button>

          <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
          <p className="text-xl mb-6 opacity-90">{course.description}</p>

          <div className="flex flex-wrap gap-4 items-center">
            <span className="bg-white/20 px-4 py-2 rounded-lg">
              👨‍🏫 {course.instructor?.name}
            </span>
            <span className="bg-white/20 px-4 py-2 rounded-lg">
              📚 {course.lessons?.length || 0} Lessons
            </span>
            <span className="bg-white/20 px-4 py-2 rounded-lg">
              👥 {course.enrolledStudents?.length || 0} Students
            </span>
            <span className="bg-white/20 px-4 py-2 rounded-lg capitalize">
              📊 {course.level}
            </span>
            <span className="bg-white/20 px-4 py-2 rounded-lg">
              🏷️ {course.category}
            </span>
          </div>

          <Button
            onClick={handleEnroll}
            isLoading={isPending}
            className="mt-6 bg-white text-primary-600 hover:bg-gray-100"
          >
            Enroll Now - It's Free!
          </Button>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Lessons List */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold mb-4">Course Content</h2>
            <div className="space-y-2">
              {course.lessons?.map((lesson, index) => (
                <div
                  key={index}
                  className="card hover:shadow-md cursor-pointer transition"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <Play className="text-primary-600" size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{lesson.title}</div>
                      <span className="text-sm text-gray-500">{lesson.duration} min</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Course Info */}
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="text-2xl font-bold mb-4">About This Course</h2>
              <p className="text-gray-700 leading-relaxed mb-6">{course.description}</p>

              <h3 className="text-xl font-bold mb-3">What You'll Learn</h3>
              <ul className="space-y-2 mb-6">
                {course.lessons?.slice(0, 5).map((lesson, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                    <span className="text-gray-700">{lesson.title}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-xl font-bold mb-3">Requirements</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1" size={20} />
                  <span className="text-gray-700">No prior experience required</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1" size={20} />
                  <span className="text-gray-700">Internet connection</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 mt-1" size={20} />
                  <span className="text-gray-700">Willingness to learn</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
