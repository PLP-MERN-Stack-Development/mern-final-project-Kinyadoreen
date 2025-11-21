import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCourses } from './store/slices/courseSlice';

function App() {
  const dispatch = useDispatch();
  const { courses, isLoading, isError, message } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-content">
          <div className="navbar-brand">
            🎓 EduBridge
          </div>
          <ul className="navbar-menu">
            <li><a href="/" className="navbar-link">Home</a></li>
            <li><a href="/courses" className="navbar-link">Courses</a></li>
            <li><a href="/about" className="navbar-link">About</a></li>
          </ul>
          <div className="flex gap-md">
            <button className="btn btn-secondary btn-sm">Login</button>
            <button className="btn btn-primary btn-sm">Sign Up</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{ 
        padding: '4rem 0', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
      }}>
        <div className="container text-center" style={{ color: 'white' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'white' }}>
            Welcome to EduBridge
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.9)' }}>
            Quality Education for All - Free E-Learning Platform
          </p>
          <button className="btn btn-secondary btn-lg" style={{ marginTop: '2rem' }}>
            Explore Courses
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container" style={{ marginTop: '3rem', marginBottom: '3rem' }}>
        <h2 className="text-center" style={{ marginBottom: '2rem' }}>
          Featured Courses
        </h2>

        {/* Error Message */}
        {isError && (
          <div className="card" style={{ 
            backgroundColor: '#FEE2E2', 
            borderLeft: '4px solid #EF4444',
            marginBottom: '2rem'
          }}>
            <p style={{ color: '#991B1B', margin: 0 }}>
              ⚠️ Error: {message || 'Failed to load courses'}
            </p>
          </div>
        )}

        {/* Loading Spinner */}
        {isLoading ? (
          <div className="loading-container">
            <div className="spinner"></div>
          </div>
        ) : courses.length === 0 ? (
          <div className="card text-center">
            <h3>No courses available yet</h3>
            <p className="text-muted">Check back soon for new courses!</p>
          </div>
        ) : (
          <div className="grid grid-3" style={{ marginTop: '2rem' }}>
            {courses.map((course) => (
              <div key={course._id || course.id} className="course-card">
                <div className="course-thumbnail"></div>
                <div className="course-content">
                  <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
                    <span className="badge badge-primary">{course.category}</span>
                    <span className="badge badge-success">{course.level}</span>
                  </div>
                  <h3 className="course-title">{course.title}</h3>
                  <p className="course-description">{course.description}</p>
                  <div className="course-meta">
                    <span>📚 {course.duration}</span>
                    <span>👥 {course.enrolled} enrolled</span>
                  </div>
                  <button className="btn btn-primary w-full" style={{ marginTop: '1rem' }}>
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer style={{ 
        backgroundColor: '#1F2937',
        color: 'white',
        padding: '3rem 0',
        marginTop: '4rem'
      }}>
        <div className="container">
          <div className="grid grid-3" style={{ marginBottom: '2rem' }}>
            <div>
              <h3 style={{ color: 'white', marginBottom: '1rem' }}>🎓 EduBridge</h3>
              <p style={{ color: '#9CA3AF' }}>
                Empowering underprivileged children through free, quality education.
              </p>
            </div>
            <div>
              <h4 style={{ color: 'white', marginBottom: '1rem' }}>Quick Links</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <a href="/about" style={{ color: '#9CA3AF' }}>About Us</a>
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <a href="/courses" style={{ color: '#9CA3AF' }}>Courses</a>
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <a href="/contact" style={{ color: '#9CA3AF' }}>Contact</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: 'white', marginBottom: '1rem' }}>Contact</h4>
              <p style={{ color: '#9CA3AF' }}>📧 contact@edubridge.com</p>
              <p style={{ color: '#9CA3AF' }}>🌐 www.edubridge.com</p>
            </div>
          </div>
          <div style={{ 
            borderTop: '1px solid #374151',
            paddingTop: '2rem',
            textAlign: 'center',
            color: '#9CA3AF'
          }}>
            <p>© 2025 EduBridge. All rights reserved. | Supporting UN SDG 4: Quality Education</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;