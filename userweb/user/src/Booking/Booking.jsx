import React, { useState } from 'react';
import { Calendar, Clock, Users, Coffee, ChevronRight, Droplets } from 'lucide-react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Booking.css';

function Booking() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '1',
    specialRequests: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
    '21:00', '21:30', '22:00', 

  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTimeSelect = (time) => {
    setFormData({ ...formData, time });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await axios.post('http://localhost:5000/api/bookings', formData);
      setMessage({ type: 'success', text: 'Booking confirmed successfully!' });
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: '1',
        specialRequests: '',
      });
    } catch (error) {
      setMessage({ type: 'error', text: 'Error submitting booking. Try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-page">
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
          <div className="col-lg-8">
            <div className="booking-form-container">
              <h2>Make a Reservation</h2>

              {message && (
                <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'}`}>
                  {message.text}
                </div>
              )}

              <form onSubmit={handleSubmit} className="booking-form">
                <div className="personal-details mb-4">
                  <h3>Personal Details</h3>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="tel"
                        className="form-control"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

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
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
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
                          name="guests"
                          min="1"
                          value={formData.guests}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="time-slots mb-4">
                  <h3>Preferred Arrival Time</h3>
                  <div className="time-grid">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        className={`time-slot ${formData.time === time ? 'selected' : ''}`}
                        onClick={() => handleTimeSelect(time)}
                      >
                        <Clock className="icon" />
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="special-requests mb-4">
                  <h3>Special Requests</h3>
                  <textarea
                    className="form-control"
                    name="specialRequests"
                    rows="3"
                    placeholder="Any special requests or preferences?"
                    value={formData.specialRequests}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="water-requirement alert alert-info">
                  <Droplets className="icon" />
                  <span>Please note: Each booking requires the purchase of a 1L bottle of water.</span>
                </div>

                <button type="submit" className="btn btn-primary booking-submit" disabled={loading}>
                  {loading ? 'Submitting...' : 'Confirm Booking'}
                  <ChevronRight className="icon" />
                </button>
              </form>
            </div>
          </div>

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
