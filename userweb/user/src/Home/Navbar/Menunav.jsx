import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './menu.css'; // Ensure you have this file or add styles inline

function Menunav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#000' }}>
      <div className="container">
        <a className="navbar-brand" href="#">
          <img 
            src="/logo.png" 
            alt="Coffee Shop Logo" 
            width="90" 
            height="90" 
            className="d-inline-block align-top"
          />
        </a>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link menu-item" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link menu-item" href="#">Menu</a>
            </li>
            <li className="nav-item">
              <a className="nav-link menu-item" href="#">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link menu-item" href="#">Booking</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Menunav;
