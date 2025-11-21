import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCourses } from '../store/slices/courseSlice';
import { logout } from '../store/slices/authSlice';

function Home() {
  const dispatch = useDispatch();
  const { courses, isLoading, isError, message } = useSelector((state) => state.courses);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  const stats = [
    { icon: '👥', number: '50,000+', label: 'Students' },
    { icon: '📚', number: '200+', label: 'Free Courses' },
    { icon: '🏆', number: '15,000+', label: 'Certificates' },
    { icon: '📈', number: '95%', label: 'Success Rate' },
  ];

  const features = [
    { emoji: '💰', title: '100% Free', desc: 'All courses completely free. No hidden costs ever.' },
    { emoji: '⏰', title: 'Learn at Your Pace', desc: 'Study anytime, anywhere on any device.' },
    { emoji: '👨‍🏫', title: 'Expert Instructors', desc: 'Learn from industry professionals.' },
    { emoji: '🎓', title: 'Certificates', desc: 'Earn certificates to boost your career.' },
    { emoji: '📱', title: 'Mobile Friendly', desc: 'Perfect experience on all devices.' },
    { emoji: '🌍', title: 'Global Community', desc: 'Join learners from around the world.' },
  ];

  const handleLogout = () => {
    dispatch(logout());
    window.location.reload();
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-content">
          <a href="/" className="navbar-brand">
            🎓 EduBridge
          </a>
          <ul className="navbar-menu">
            <li><a href="/" className="navbar-link">Home</a></li>
            <li><a href="/courses" className="navbar-link">Courses</a></li>
            <li><a href="/about" className="navbar-link">About</a></li>
          </ul>
          <div className="flex gap-md">
            {user ? (
              <>
                <span className="navbar-link" style={{ fontWeight: 600 }}>
                  👤 {user.name}
                </span>
                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <a href="/login">
                  <button className="btn btn-secondary btn-sm">Login</button>
                </a>
                <a href="/signup">
                  <button className="btn btn-primary btn-sm">Sign Up</button>
                </a>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '5rem 1rem',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ 
            fontSize: '3.5rem', 
            fontWeight: 800, 
            marginBottom: '1.5rem',
            color: 'white'
          }}>
            Quality Education for <span style={{ color: '#FCD34D' }}>Everyone</span>
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            marginBottom: '2rem',
            maxWidth: '800px',
            margin: '0 auto 2rem',
            opacity: 0.95,
            lineHeight: 1.6
          }}>
            Bridge the gap in education with free, accessible courses designed for
            underprivileged communities worldwide
          </p>
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <a href="/courses">
              <button className="btn btn-secondary btn-lg" style={{ 
                background: 'white',
                color: '#667eea'
              }}>
                Explore Courses →
              </button>
            </a>
            <a href="/signup">
              <button className="btn btn-lg" style={{
                background: 'transparent',
                border: '2px solid white',
                color: 'white'
              }}>
                Get Started Free
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: '4rem 1rem', background: 'white' }}>
        <div className="container">
          <div className="grid grid-4">
            {stats.map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{stat.icon}</div>
                <div style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: 800, 
                  marginBottom: '0.5rem',
                  color: 'var(--gray-900)'
                }}>
                  {stat.number}
                </div>
                <div style={{ color: 'var(--gray-600)', fontSize: '1.1rem' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ 
        padding: '5rem 1rem',
        background: 'linear-gradient(to bottom right, #F9FAFB, #EEF2FF)'
      }}>
        <div className="container">
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 800, 
            textAlign: 'center',
            marginBottom: '1rem'
          }}>
            Why Choose EduBridge?
          </h2>
          <p style={{ 
            textAlign: 'center',
            color: 'var(--gray-600)',
            maxWidth: '700px',
            margin: '0 auto 3rem',
            fontSize: '1.1rem'
          }}>
            Join thousands of learners who are transforming their lives through quality education
          </p>
          <div className="grid grid-3">
            {features.map((feature, i) => (
              <div key={i} className="card" style={{ 
                transition: 'all 0.3s',
                cursor: 'default'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                  {feature.emoji}
                </div>
                <h3 style={{ 
                  fontSize: '1.4rem', 
                  fontWeight: 700,
                  marginBottom: '1rem'
                }}>
                  {feature.title}
                </h3>
                <p style={{ color: 'var(--gray-600)' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section style={{ padding: '5rem 1rem', background: 'white' }}>
        <div className="container">
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 800, 
            textAlign: 'center',
            marginBottom: '1rem'
          }}>
            Featured Courses
          </h2>
          <p style={{ 
            textAlign: 'center',
            color: 'var(--gray-600)',
            marginBottom: '3rem',
            fontSize: '1.1rem'
          }}>
            Start learning with our most popular courses
          </p>

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

          {isLoading ? (
            <div className="loading-container">
              <div className="spinner"></div>
            </div>
          ) : courses.length === 0 ? (
            <div className="card" style={{ textAlign: 'center' }}>
              <h3>No courses available yet</h3>
              <p style={{ color: 'var(--gray-500)' }}>Check back soon for new courses!</p>
            </div>
          ) : (
            <div className="grid grid-3">
              {courses.slice(0, 6).map((course) => (
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

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <a href="/courses">
              <button className="btn btn-primary btn-lg">
                View All Courses →
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ 
        padding: '5rem 1rem',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 800,
            marginBottom: '1.5rem',
            color: 'white'
          }}>
            Ready to Start Learning?
          </h2>
          <p style={{ 
            fontSize: '1.25rem',
            marginBottom: '2rem',
            opacity: 0.95
          }}>
            Join our community and access hundreds of free courses today
          </p>
          <a href="/signup">
            <button className="btn btn-lg" style={{
              background: 'white',
              color: '#667eea',
              padding: '1rem 2.5rem',
              fontSize: '1.1rem'
            }}>
              Sign Up Now - It's Free →
            </button>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        backgroundColor: '#1F2937',
        color: 'white',
        padding: '3rem 0'
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

export default Home;