import { h } from 'preact';
import { Router } from 'preact-router';
import Home from './Pages/Home';
import About from './About/About';
import Booking from './Booking/Booking';
import Menunav from './Home/Navbar/Menunav';
import Footer from './Home/Footer/Footer';

export function App() {
  return (
    <>
      <Menunav />
      <Router>
        <Home path="/" />
        <About path="/about" />
        <Booking path="/booking" />
      </Router>
      <Footer />
    </>
  );
}
