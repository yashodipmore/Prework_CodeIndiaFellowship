import React from 'react';
import ThemeToggle from './ThemeToggle';
import './Navbar.css';

/**
 * Simple navigation bar component
 */
const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
          </svg>
          <span>Student Management Dashboard</span>
        </div>
        <div className="navbar-actions">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
