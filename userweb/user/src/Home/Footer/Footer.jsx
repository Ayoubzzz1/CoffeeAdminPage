import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* Newsletter Section */}
      <div className="newsletter-section">
        <div className="newsletter-content">
          <h2>Join Our Coffee Club</h2>
          <p>Subscribe to receive special offers, free giveaways, and unique coffee insights.</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email address" />
            <button className="subscribe-btn">Subscribe</button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="footer-content">
        <div className="footer-section brand-section">
          <h3 className="footer-logo">CaféDelight</h3>
          <p>Crafting perfect moments, one cup at a time. Visit us for an unforgettable coffee experience.</p>
          <div className="social-links">
            <a href="#" className="social-icon facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="social-icon instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="social-icon twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="social-icon pinterest">
              <i className="fab fa-pinterest-p"></i>
            </a>
          </div>
        </div>

        <div className="footer-section links-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Our Menu</a></li>
            <li><a href="#">Reservations</a></li>
            <li><a href="#">Gift Cards</a></li>
            <li><a href="#">Franchise</a></li>
          </ul>
        </div>

        <div className="footer-section contact-section">
          <h4>Contact Us</h4>
          <ul>
            <li>
              <i className="fas fa-map-marker-alt"></i>
              123 Coffee Street, Brew City, BC 12345
            </li>
            <li>
              <i className="fas fa-phone"></i>
              +1 (555) 123-4567
            </li>
            <li>
              <i className="fas fa-envelope"></i>
              info@cafedelight.com
            </li>
            <li>
              <i className="fas fa-clock"></i>
              Mon - Sun: 7:00 AM - 8:00 PM
            </li>
          </ul>
        </div>

      
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; {currentYear} CaféDelight. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button className="scroll-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <i className="fas fa-chevron-up"></i>
      </button>
    </footer>
  );
};

export default Footer;