import { h } from 'preact';
import { Router } from 'preact-router';
import Home from './Pages/Home';
import About from './About/About';
import Booking from './Booking/Booking';
import Menunav from './Home/Navbar/Menunav';
import Footer from './Home/Footer/Footer';
import Menu from './Menu/Menu';
import EventPopup from './Events/EventPopup';
export function App() {
  return (
    <>
      <Menunav />
      <EventPopup />

      <Router>
        <Home path="/" />
        <About path="/about" />
        <Booking path="/booking" />
        <Menu path="/menu"/>
      </Router>
      <Footer />
    </>
  );
}
