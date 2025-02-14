import React from 'react';
import './AboutSection.css';

const AboutSection = () => {
  const milestones = [
    { year: 2018, title: "Grand Opening", description: "Started our journey in the heart of the city" },
    { year: 2020, title: "Expansion", description: "Opened our second location" },
    { year: 2022, title: "Award Winning", description: "Recognized as Best Coffee House" },
    { year: 2024, title: "Innovation", description: "Launched our specialty coffee line" }
  ];

  return (
    <section className="about-section">
      <div className="about-background"></div>
      
      <div className="about-content">
        <div className="about-header">
          <span className="since-tag">Since 2018</span>
          <h1>CAMORRA</h1>
          <h2>Where Coffee Meets Culture</h2>
        </div>

        <div className="about-grid">
          <div className="about-image">
           
            
            <div className="experience-badge">
              <span className="years">6</span>
              <span className="text">Years of<br/>Excellence</span>
            </div>
          </div>

          <div className="about-text">
            <h3>Our Story</h3>
            <p className="main-text">
              Since 2018, Camorra has been more than just a coffee shop – it's been a cornerstone of community and culture. 
              Born from a passion for exceptional coffee and authentic experiences, we've grown from a single location 
              to become a beloved destination for coffee enthusiasts and casual visitors alike.
            </p>

            <div className="stats-container">
              <div className="stat-item">
                <span className="stat-number">15k+</span>
                <span className="stat-label">Happy Customers</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Coffee Varieties</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">3</span>
                <span className="stat-label">Prime Locations</span>
              </div>
            </div>

            <div className="values-grid">
              <div className="value-item">
                <div className="value-icon">☕</div>
                <h4>Quality First</h4>
                <p>Premium beans, expert roasting</p>
              </div>
              <div className="value-item">
                <div className="value-icon">🌱</div>
                <h4>Sustainability</h4>
                <p>Eco-friendly practices</p>
              </div>
              <div className="value-item">
                <div className="value-icon">❤️</div>
                <h4>Community</h4>
                <p>Building connections</p>
              </div>
            </div>
          </div>
        </div>

        <div className="timeline">
          <h3>Our Journey</h3>
          <div className="timeline-grid">
            {milestones.map((milestone, index) => (
              <div className="timeline-item" key={index}>
                <div className="year">{milestone.year}</div>
                <div className="milestone-content">
                  <h4>{milestone.title}</h4>
                  <p>{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;