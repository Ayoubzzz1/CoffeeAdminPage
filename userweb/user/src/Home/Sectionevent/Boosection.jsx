import React, { useState } from 'react';
import './sectionb.css';
import { Link } from 'preact-router';

function BookingSection() {
  const [activeCard, setActiveCard] = useState(null);

  const bookingOptions = [
    {
      title: "Celebrate Your Anniversary",
      description: "Make your anniversary unforgettable with our cozy atmosphere and special arrangements.",
      image: "/anniv.jpg",
      features: ["Romantic Setting", "Special Menu", "Complimentary Cake", "Dedicated Service"],
      price: "From $99"
    },
    {
      title: "Watch the Champions League",
      description: "Catch all the action of the Champions League on our big screens with great coffee and snacks.",
      image: "/champ.jpg",
      features: ["HD Screens", "Premium Sound", "Game Day Menu", "Group Packages"],
      price: "From $49"
    },
    {
      title: "Hang Out with Friends",
      description: "Looking for the perfect spot to chill? We've got the vibe, coffee, and comfort you need.",
      image: "/han.jpg",
      features: ["Cozy Seating", "Board Games", "Group Menu", "Free WiFi"],
      price: "From $29"
    }
  ];

  return (
    <section className="booking-section">
      <div className="booking-background"></div>
      
      <div className="booking-content">
        <div className="section-header">
          <span className="subtitle">Book Your Place</span>
          <h2 className="title">Make Memories at Our Coffee Shop</h2>
          <div className="title-decoration">
            <span className="line"></span>
            <span className="dot"></span>
            <span className="line"></span>
          </div>
        </div>

        <div className="booking-cards">
          {bookingOptions.map((option, index) => (
            <div 
              className={`booking-card ${activeCard === index ? 'active' : ''}`}
              key={index}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <div className="card-image-container">
                <img src={option.image} alt={option.title} />
                <div className="image-overlay"></div>
                <span className="price-tag">{option.price}</span>
              </div>
              
              <div className="card-content">
                <h3>{option.title}</h3>
                <p>{option.description}</p>
                
                <div className="features-list">
                  {option.features.map((feature, idx) => (
                    <div className="feature-item" key={idx}>
                      <span className="feature-icon">✓</span>
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="card-actions">
                  <Link href="booking"  className="book-now-btn">
                    Book Now
                    <span className="btn-arrow">→</span>
                  </Link>
                  <button className="details-btn">View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="booking-info">
          <div className="info-item">
            <div className="info-icon">🎉</div>
            <h4>Special Events</h4>
            <p>Custom packages for birthdays and celebrations</p>
          </div>
          <div className="info-item">
            <div className="info-icon">⭐</div>
            <h4>VIP Treatment</h4>
            <p>Personalized service for every booking</p>
          </div>
          <div className="info-item">
            <div className="info-icon">💫</div>
            <h4>Easy Booking</h4>
            <p>Simple online reservation system</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookingSection;