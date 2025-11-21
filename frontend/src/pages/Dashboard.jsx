import React from 'react';
import { useNavigate } from 'react-router-dom';
import useDashboard from '../hooks/useDashboard.js';
import { useCurrentUser, useLogout } from '../hooks/useAuth.js';

export default function Dashboard() {
  const navigate = useNavigate();
  const currentUser = useCurrentUser();
  const logout = useLogout();

  const { stats, courses, activities, isLoading } = useDashboard();

  const handleLogout = () => {
    logout();
  };

  const handleCourseClick = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {currentUser?.name || 'Student'}! 👋
              </h1>
              <p className="text-gray-600 mt-1">
                Continue your learning journey
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {/* Total Courses */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Courses</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stats.data?.totalCourses || 0}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <span className="text-3xl">📚</span>
              </div>
            </div>
          </div>

          {/* In Progress */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">In Progress</p>
                <p className="text-3xl font-bold text-yellow-600 mt-2">
                  {stats.data?.inProgressCourses || 0}
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <span className="text-3xl">⏳</span>
              </div>
            </div>
          </div>

          {/* Completed */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Completed</p>
                <p className="text-3xl font-bold text-green-600 mt-2">
                  {stats.data?.completedCourses || 0}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <span className="text-3xl">✅</span>
              </div>
            </div>
          </div>

          {/* Total Hours */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Hours</p>
                <p className="text-3xl font-bold text-purple-600 mt-2">
                  {stats.data?.totalHours || 0}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <span className="text-3xl">⏱️</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* My Courses */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">My Courses</h2>
                <button
                  onClick={() => navigate('/courses')}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  Browse All →
                </button>
              </div>

              {courses.isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                </div>
              ) : courses.data && courses.data.length > 0 ? (
                <div className="space-y-4">
                  {courses.data.map((enrollment) => (
                    <div
                      key={enrollment._id}
                      onClick={() => handleCourseClick(enrollment.course._id)}
                      className="border rounded-lg p-4 hover:border-blue-500 hover:shadow-md transition cursor-pointer"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {enrollment.course.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3">
                            {enrollment.course.description}
                          </p>

                          {/* Progress Bar */}
                          <div className="mb-2">
                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                              <span>Progress</span>
                              <span>{enrollment.progress || 0}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full transition-all"
                                style={{ width: `${enrollment.progress || 0}%` }}
                              ></div>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>👤 {enrollment.course.instructor}</span>
                            <span>⏱️ {enrollment.course.duration}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              enrollment.status === 'completed'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {enrollment.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">📚</div>
                  <p className="text-gray-600 mb-4">No enrolled courses yet</p>
                  <button
                    onClick={() => navigate('/courses')}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Browse Courses
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>

              {activities.isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                </div>
              ) : activities.data && activities.data.length > 0 ? (
                <div className="space-y-4">
                  {activities.data.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 pb-4 border-b last:border-b-0">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <span className="text-xl">{activity.icon || '📖'}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {activity.time || 'Just now'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-gray-400 text-4xl mb-2">📋</div>
                  <p className="text-gray-500 text-sm">No recent activity</p>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-md p-6 mt-6 text-white">
              <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={() => navigate('/courses')}
                  className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white py-2 rounded-lg transition text-sm font-medium"
                >
                  Browse Courses
                </button>
                <button
                  onClick={() => navigate('/profile')}
                  className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white py-2 rounded-lg transition text-sm font-medium"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => navigate('/certificates')}
                  className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white py-2 rounded-lg transition text-sm font-medium"
                >
                  My Certificates
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
