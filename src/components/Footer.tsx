import React from 'react';
import './Footer.css';

/**
 * Simple footer component
 */
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <p>Student Management Dashboard &copy; {currentYear}</p>
        <div className="footer-links">
          <a href="#about">About</a>
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
        </div>
        <p className="developer-credit">
          Developed by Yashodip More, as prework assignment for CodeIndia Fellowship
        </p>
      </div>
    </footer>
  );
};

export default Footer;
