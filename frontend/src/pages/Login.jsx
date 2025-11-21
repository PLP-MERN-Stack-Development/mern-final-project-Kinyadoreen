import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, reset } from '../store/slices/authSlice';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      alert(message);
    }

    if (isSuccess && user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
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
          </ul>
        </div>
      </nav>

      {/* Login Form */}
      <div className="container-sm" style={{ marginTop: '4rem', marginBottom: '4rem' }}>
        <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
          <div className="card-header">
            <h2 className="card-title text-center">Login to EduBridge</h2>
            <p className="text-center text-muted">Access your learning dashboard</p>
          </div>
          
          <div className="card-body">
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  placeholder="your.email@example.com"
                  onChange={onChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  placeholder="Enter your password"
                  onChange={onChange}
                  required
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <p className="text-muted">
                Don't have an account?{' '}
                <a href="/signup" style={{ fontWeight: 600 }}>Sign Up</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;