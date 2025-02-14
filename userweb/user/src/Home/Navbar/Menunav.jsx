import { h } from 'preact';
import { Link } from 'preact-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import './menu.css'; // Ensure this file exists

function Menunav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#000' }}>
      <div className="container">
        <Link className="navbar-brand" href="/">
          <img 
            src="/logo.png" 
            alt="Coffee Shop Logo" 
            width="90" 
            height="90" 
            className="d-inline-block align-top"
          />
        </Link>
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
              <Link className="nav-link menu-item" href="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link menu-item" href="/menu">Menu</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link menu-item" href="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link menu-item" href="/booking">Booking</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Menunav;
