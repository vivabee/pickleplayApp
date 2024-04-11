import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2024 CodeMoms</p>
        <ul className="footer-links">
          <li><a href="/">Home</a></li>
          <li><a href="/team">Team</a></li>
          <li><a href="/login">Login</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
