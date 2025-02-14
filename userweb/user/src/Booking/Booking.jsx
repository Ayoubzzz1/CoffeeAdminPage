import React, { useState } from 'react';
import { Calendar, Clock, Users, Coffee, ChevronRight, Droplets } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Booking.css';

function Booking() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [guests, setGuests] = useState('1');

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ selectedDate, selectedTime, guests });
  };

  return (
    <div className="booking-page">
      {/* Hero Section */}
      <div className="booking-hero">
        <div className="hero-overlay">
          <div className="container">
            <div className="hero-content text-center">
              <h1>Book Your Table</h1>
              <p>Your cozy corner in Café Camorra</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="row">
          {/* Booking Form */}
          <div className="col-lg-8">
            <div className="booking-form-container">
              <h2>Make a Reservation</h2>
              
              <form onSubmit={handleSubmit} className="booking-form">
                {/* Personal Details */}
                <div className="personal-details mb-4">
                  <h3>Personal Details</h3>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="First Name"
                        required 
                      />
                    </div>
                    <div className="col-md-6">
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Last Name"
                        required 
                      />
                    </div>
                    <div className="col-md-6">
                      <input 
                        type="email" 
                        className="form-control" 
                        placeholder="Email"
                        required 
                      />
                    </div>
                    <div className="col-md-6">
                      <input 
                        type="tel" 
                        className="form-control" 
                        placeholder="Phone Number"
                        required 
                      />
                    </div>
                  </div>
                </div>

                {/* Booking Details */}
                <div className="booking-details mb-4">
                  <h3>Booking Details</h3>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="input-group">
                        <span className="input-group-text">
                          <Calendar className="icon" />
                        </span>
                        <input 
                          type="date" 
                          className="form-control" 
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-group">
                        <span className="input-group-text">
                          <Users className="icon" />
                        </span>
                        <input 
                          type="number" 
                          className="form-control" 
                          placeholder="Number of Guests"
                          min="1"
                          value={guests}
                          onChange={(e) => setGuests(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Time Slots */}
                <div className="time-slots mb-4">
                  <h3>Preferred Arrival Time</h3>
                  <div className="time-grid">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                        onClick={() => setSelectedTime(time)}
                      >
                        <Clock className="icon" />
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Special Requests */}
                <div className="special-requests mb-4">
                  <h3>Special Requests</h3>
                  <textarea 
                    className="form-control" 
                    rows="3" 
                    placeholder="Any special requests or preferences?"
                  ></textarea>
                </div>

                <div className="water-requirement alert alert-info">
                  <Droplets className="icon" />
                  <span>Please note: Each booking requires the purchase of a 1L bottle of water.</span>
                </div>

                <button type="submit" className="btn btn-primary booking-submit">
                  Confirm Booking
                  <ChevronRight className="icon" />
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            <div className="booking-sidebar">
              <div className="info-card">
                <h3>Booking Information</h3>
                <div className="info-content">
                  <p><Coffee className="icon" /> Café Camorra Coffee</p>
                  <p><Users className="icon" /> No group size restrictions</p>
                  <p><Droplets className="icon" /> 1L water bottle required per booking</p>
                </div>

                <div className="policy-info mt-4">
                  <h4>Booking Policy</h4>
                  <ul>
                    <li>No time limit on seating - stay as long as you like!</li>
                    <li>Each booking requires purchase of 1L water bottle</li>
                    <li>Please arrive at your selected time</li>
                    <li>Cancellation required 2 hours in advance</li>
                    <li>Large groups welcome - no size restrictions</li>
                    <li>Special events and gatherings available on request</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;