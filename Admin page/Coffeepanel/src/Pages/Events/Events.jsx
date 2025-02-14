import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Events() {
  const [event, setEvent] = useState({
    title: '',
    description: '',
    image: null,
    date: '',
    fromTime: '',
    toTime: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setEvent((prevEvent) => ({
      ...prevEvent,
      image: e.target.files[0],
    }));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Create Event</h2>
      <form className="row g-3">
        <div className="col-md-6">
          <input type="text" className="form-control" name="title" placeholder="Event Title" value={event.title} onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <input type="file" className="form-control" name="image" onChange={handleImageChange} />
        </div>
        <div className="col-12">
          <textarea className="form-control" name="description" placeholder="Description" value={event.description} onChange={handleChange}></textarea>
        </div>
        <div className="col-md-6">
          <label className="form-label">Event Date</label>
          <input type="date" className="form-control" name="date" value={event.date} onChange={handleChange} />
        </div>
        <div className="col-md-6 d-flex align-items-end">
          <div className="me-2">
            <label className="form-label">From Time</label>
            <input type="time" className="form-control" name="fromTime" value={event.fromTime} onChange={handleChange} />
          </div>
          <div>
            <label className="form-label">To Time</label>
            <input type="time" className="form-control" name="toTime" value={event.toTime} onChange={handleChange} />
          </div>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Save Event</button>
        </div>
      </form>
    </div>
  );
}

export default Events;
