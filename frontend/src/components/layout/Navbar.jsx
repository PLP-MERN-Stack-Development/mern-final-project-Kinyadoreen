import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, LogOut, User, GraduationCap } from "lucide-react";
import { useAuthStore } from "../../store/authStore.js";
import './Navbar.css';

function Navbar() {
  const { user, isAuthenticated, logout } = useAuthStore();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <BookOpen size={32} />
          <span>EduBridge</span>
        </Link>

        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/courses">Courses</Link>

          {isAuthenticated && (
            <>
              <Link to="/dashboard">Dashboard</Link>
              {user?.role === "teacher" && (
                <Link to="/teacher" className="teacher-link">
                  <GraduationCap size={18} />
                  My Courses
                </Link>
              )}
            </>
          )}
        </div>

        <div className="navbar-actions">
          {isAuthenticated ? (
            <div className="user-info">
              <User size={20} />
              <span>{user?.name}</span>
              <button onClick={logout}>
                <LogOut size={18} /> Logout
              </button>
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="login-btn">Login</Link>
              <Link to="/register" className="signup-btn">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
