import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="page footer-grid">
        <div className="footer-col">
          <h3>Dengel Patient's Portal</h3>
          <p className="muted">Access your bookings, reports and profile information securely.</p>
          <p className="muted" style={{ marginTop: 8 }}>Version 1.0 • Patient interface</p>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <p className="muted">Email: <a href="mailto:patient@hospital.com">patient@hospital.com</a></p>
          <p className="muted">Phone: <a href="tel:+1234567890">+1 (234) 567-890</a></p>
          <p className="muted">Address: 123 Health St., Care City</p>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/doctors">Doctors</Link></li>
            <li><Link to="/mybooks">My Books</Link></li>
            <li><Link to="/myreports">My Reports</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="page">
          <small className="muted">© {new Date().getFullYear()} Hospital. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
}
