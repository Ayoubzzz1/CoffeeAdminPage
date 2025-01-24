import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function PersonnelCard() {
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Personnel Card</h2>
      <div className="card" style={{ width: '18rem' }}>
        <img src="https://via.placeholder.com/150" className="card-img-top" alt="Profile" />
        <div className="card-body">
          <h5 className="card-title">John Doe</h5>
          <p className="card-text">Software Engineer</p>
          <a href="#" className="btn btn-primary">Show More</a>
        </div>
      </div>
    </div>
  );
}

export default PersonnelCard;
