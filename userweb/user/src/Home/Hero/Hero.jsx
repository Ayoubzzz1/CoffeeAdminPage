import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './hero.css';
import { Link } from 'preact-router';

function Hero() {
  return (
    <div className="hero-section">
      <div className="hero-overlay"></div>
      <div className="container position-relative">
        <div className="row min-vh-100 align-items-center">
          {/* Left Content */}
          <div className="col-lg-6 text-white text-start">
            <div className="badge bg-danger text-white mb-3 p-2 animate-badge">
              NEW SEASONAL BLEND
            </div>
            <h1 className="display-3 fw-bold mb-4 animate-title">
              Experience the Art of
              <span className="d-block text-danger mt-2">Perfect Coffee</span>
            </h1>
            <p className="lead mb-4 animate-text">
              Discover our handcrafted coffee selection, made from premium beans 
              and roasted to perfection. Join us for an unforgettable coffee experience.
            </p>
            <div className="d-flex gap-3 animate-buttons">
              <a href="#menu" className="btn btn-danger btn-lg px-4 fw-semibold">
                View Menu
              </a>
              <Link href="booking" className="btn btn-outline-light btn-lg px-4">
                Book Now
              </Link>
            </div>
            <div className="mt-5 d-flex gap-4 animate-features">
              <div className="feature-item">
                <div className="feature-icon mb-2">☕</div>
                <div className="feature-text">Premium Beans</div>
              </div>
              <div className="feature-item">
                <div className="feature-icon mb-2">🌿</div>
                <div className="feature-text">Organic</div>
              </div>
              <div className="feature-item">
                <div className="feature-icon mb-2">🏆</div>
                <div className="feature-text">Award Winning</div>
              </div>
            </div>
          </div>
          {/* Right Image */}
          <div className="col-lg-6 d-flex justify-content-center">
            <img src="/hero1.png" alt="Coffee" className="hero-image" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;