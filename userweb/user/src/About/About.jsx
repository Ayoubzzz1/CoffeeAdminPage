import React from 'react';
import { MapPin, Clock, Phone, Mail, Coffee, Users, Award, Instagram } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './About.css';

function About() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <div className="heroo-section">
        <div className="hero-overlay">
          <div className="container">
            <div className="hero-content text-center">
              <h1>Our Coffee Journey</h1>
              <p>Serving Perfect Cups Since 2018</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-4">
              <div className="feature-card">
                <Coffee className="feature-icon" />
                <h3>Premium Coffee</h3>
                <p>Sourced from the finest sustainable farms worldwide</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card">
                <Users className="feature-icon" />
                <h3>Community Hub</h3>
                <p>A gathering place for coffee lovers and friends</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card">
                <Award className="feature-icon" />
                <h3>Expert Baristas</h3>
                <p>Crafting the perfect cup with passion and skill</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-5">
        {/* Story Section */}
        <div className="row mb-5">
          <div className="col-lg-8">
            <div className="story-section">
              <h2>Our Story</h2>
              <p>Founded in 2018, Café Camorra Coffee has become a beloved destination for coffee enthusiasts in Sousse. What started as a small dream has grown into a vibrant gathering place where passion for exceptional coffee meets warm hospitality.</p>
              <p>We pride ourselves on sourcing the finest beans from sustainable farms worldwide and roasting them to perfection. Our skilled baristas are dedicated to serving you the perfect cup, whether you're starting your day or need an afternoon pick-me-up.</p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="menu-highlights">
              <h3>Menu Highlights</h3>
              <ul className="highlights-list">
                <li>Specialty Espresso Drinks</li>
                <li>Single Origin Pour-Overs</li>
                <li>House-Made Pastries</li>
                <li>Seasonal Beverages</li>
                <li>Local Tea Selection</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Location and Hours */}
        <div className="row">
          {/* Map Section */}
          <div className="col-md-6 mb-4">
            <div className="info-card">
              <h3>Find Us</h3>
              <div className="map-container">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d824.3372927512276!2d10.603398100000002!3d35.867550599999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd8b8987c3de1b%3A0xa2f3f94ddbcee906!2sCaf%C3%A9%20Camorra%20Coffee!5e0!3m2!1sen!2s!4v1708140000000!5m2!1sen!2s"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="contact-info">
                <div className="info-item">
                  <MapPin className="icon" />
                  <span>Café Camorra Coffee, Sousse, Tunisia</span>
                </div>
                <div className="info-item">
                  <Phone className="icon" />
                  <span>(+216) 73-123-456</span>
                </div>
                <div className="info-item">
                  <Mail className="icon" />
                  <span>hello@cafecamorra.com</span>
                </div>
                <div className="info-item">
                  <Instagram className="icon" />
                  <span>@cafecamorra</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hours Section */}
          <div className="col-md-6 mb-4">
            <div className="info-card">
              <h3>Hours</h3>
              <div className="hours-container">
                <div className="hours-header">
                  <Clock className="icon" />
                  <span>Opening Hours</span>
                </div>
                <div className="hours-list">
                  <div className="hours-item">
                    <span>Monday - Friday</span>
                    <span>6:00 AM - 8:00 PM</span>
                  </div>
                  <div className="hours-item">
                    <span>Saturday</span>
                    <span>7:00 AM - 9:00 PM</span>
                  </div>
                  <div className="hours-item">
                    <span>Sunday</span>
                    <span>7:00 AM - 6:00 PM</span>
                  </div>
                </div>
                <div className="special-notice mt-4">
                  <p className="mb-2">🌟 Happy Hour: 3PM - 5PM Daily</p>
                  <p>Special discounts on all coffee drinks!</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="row mt-5">
          <div className="col-12">
            <h2 className="text-center mb-4">Our Space</h2>
            <div className="row g-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="col-md-3">
                  <div className="gallery-item">
                    <img 
                      src={`/api/placeholder/${300}/${200}`} 
                      alt={`Café interior ${i}`}
                      className="img-fluid rounded"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;   