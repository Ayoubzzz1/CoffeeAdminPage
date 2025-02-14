import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Bookingadmin() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/bookings');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  return (
    <div className="container">
      <h2>Admin Bookings</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Booking Date</th>
            <th>Booking Time</th>
            <th>Guests</th>
            <th>Special Requests</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.first_name}</td>
                <td>{booking.last_name}</td>
                <td>{booking.email}</td>
                <td>{booking.phone}</td>
                <td>{booking.booking_date}</td>
                <td>{booking.booking_time}</td>
                <td>{booking.guests}</td>
                <td>{booking.special_requests || 'None'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No bookings available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Bookingadmin;
