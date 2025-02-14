import React, { useEffect, useState } from 'react';
import './event.css'; // Import the CSS for styling

function EventPopup() {
  const [visible, setVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClosing(true); // Trigger crumpling animation
      setTimeout(() => setVisible(false), 1000); // Hide after animation completes
    }, 15000); // Popup stays for 30 seconds

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  const handleClose = () => {
    setIsClosing(true); // Trigger crumpling animation
    setTimeout(() => setVisible(false), 1000); // Hide after animation completes
  };

  if (!visible) return null;

  return (
    <div className={`event-popup-container ${isClosing ? 'crumple' : ''}`}>
      <div className="rope"></div>
      <div className="event-popup">
        <div className="event-image">
          <img
            src="/kar.jpg" // Replace with your image URL
            alt="Event"
          />
        </div>
        <h2>🎉 Upcoming Event! 🎉</h2>
        <div className="event-details">
          <p><strong>Event Name:</strong> Summer Music Festival</p>
          <p><strong>Date:</strong> Saturday, August 26, 2023</p>
          <p><strong>Time:</strong> 6:00 PM - 11:00 PM</p>
          <p><strong>Location:</strong> Central Park, New York</p>
          <p>
            <strong>Details:</strong> Join us for an unforgettable night of live music, food, and fun! Featuring top artists and bands.
          </p>
        </div>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
}

export default EventPopup;