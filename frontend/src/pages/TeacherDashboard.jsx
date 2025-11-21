import React, { useState } from 'react';
import { BookOpen, PlusCircle, Edit, Trash2 } from 'lucide-react';
import { useCourses, useCreateCourse } from '../hooks/useCourses.js';
import Button from '../components/ui/Button.jsx';
import Input from '../components/ui/Input.jsx';

export default function TeacherDashboard() {
  const [showModal, setShowModal] = useState(false);
  const { data, refetch } = useCourses();
  const { mutate: createCourse, isPending } = useCreateCourse();

  const courses = data?.courses || [];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Teacher Dashboard</h1>
            <p className="text-gray-600">Manage your courses and students</p>
          </div>
          <Button onClick={() => setShowModal(true)} className="flex items-center gap-2">
            <PlusCircle size={20} />
            Create Course
          </Button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="card">
            <p className="text-gray-600 mb-1">My Courses</p>
            <p className="text-4xl font-bold text-primary-600">{courses.length}</p>
          </div>
          <div className="card">
            <p className="text-gray-600 mb-1">Total Students</p>
            <p className="text-4xl font-bold text-green-600">
              {courses.reduce((sum, c) => sum + (c.enrolledStudents?.length || 0), 0)}
            </p>
          </div>
          <div className="card">
            <p className="text-gray-600 mb-1">Avg. Rating</p>
            <p className="text-4xl font-bold text-yellow-600">4.8 ⭐</p>
          </div>
        </div>

        {/* Courses */}
        <h2 className="text-2xl font-bold mb-6">My Courses</h2>

        {courses.length === 0 ? (
          <div className="card text-center py-12">
            <BookOpen className="mx-auto text-gray-300 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Courses Yet</h3>
            <p className="text-gray-600 mb-6">Create your first course to start teaching!</p>
            <Button onClick={() => setShowModal(true)}>Create Your First Course</Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course._id} className="card">
                <div className="h-32 bg-gradient-to-br from-primary-500 to-purple-600 rounded-t-xl -mt-6 -mx-6 mb-4 flex items-center justify-center">
                  <BookOpen size={48} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>👥 {course.enrolledStudents?.length || 0} students</span>
                  <span>📚 {course.lessons?.length || 0} lessons</span>
                </div>

                <div className="flex gap-2">
                  <Button variant="secondary" className="flex-1 flex items-center justify-center gap-1">
                    <Edit size={16} />
                    Edit
                  </Button>
                  <Button variant="danger" className="px-4">
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Create Course Modal */}
        {showModal && (
          <CreateCourseModal
            onClose={() => setShowModal(false)}
            onCreate={(data) => {
              createCourse(data, {
                onSuccess: () => {
                  setShowModal(false);
                  refetch();
                  alert('Course created! 🎉');
                },
              });
            }}
            isLoading={isPending}
          />
        )}
      </div>
    </div>
  );
}

function CreateCourseModal({ onClose, onCreate, isLoading }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Programming',
    level: 'beginner',
    lessons: [],
  });

  const [currentLesson, setCurrentLesson] = useState({
    title: '',
    content: '',
    duration: 30,
    order: 1,
  });

  const addLesson = () => {
    if (currentLesson.title && currentLesson.content) {
      setFormData({
        ...formData,
        lessons: [...formData.lessons, { ...currentLesson, order: formData.lessons.length + 1 }],
      });
      setCurrentLesson({ title: '', content: '', duration: 30, order: formData.lessons.length + 2 });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.lessons.length === 0) {
      alert('Please add at least one lesson');
      return;
    }
    onCreate(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl p-8 max-w-3xl w-full my-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Create New Course</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Course Title"
              placeholder="e.g., Introduction to React"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                className="input"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Programming">Programming</option>
                <option value="Business">Business</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Science">Science</option>
                <option value="Mathematics">Mathematics</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              className="input"
              rows="3"
              placeholder="Describe what students will learn..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
            <select
              className="input"
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: e.target.value })}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          {/* Lessons */}
          <div className="border-t-2 pt-6">
            <h3 className="text-xl font-bold mb-4">Lessons ({formData.lessons.length})</h3>

            {formData.lessons.length > 0 && (
              <div className="mb-4 space-y-2">
                {formData.lessons.map((lesson, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <span className="font-semibold">{lesson.title}</span>
                    <span className="text-sm text-gray-500">({lesson.duration} min)</span>
                  </div>
                ))}
              </div>
            )}

            <div className="bg-blue-50 p-4 rounded-lg space-y-3">
              <Input
                placeholder="Lesson Title"
                value={currentLesson.title}
                onChange={(e) => setCurrentLesson({ ...currentLesson, title: e.target.value })}
              />
              <textarea
                className="input"
                rows="3"
                placeholder="Lesson Content"
                value={currentLesson.content}
                onChange={(e) => setCurrentLesson({ ...currentLesson, content: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Duration (minutes)"
                value={currentLesson.duration}
                onChange={(e) => setCurrentLesson({ ...currentLesson, duration: parseInt(e.target.value) })}
              />
              <Button type="button" onClick={addLesson} className="w-full">
                + Add Lesson
              </Button>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" isLoading={isLoading} className="flex-1">
              Create Course
            </Button>
            <Button type="button" variant="secondary" onClick={onClose} className="px-8">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
