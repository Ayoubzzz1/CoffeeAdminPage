import React from 'react'
import Menunav from '../Home/Navbar/Menunav'
import Hero from '../Home/Hero/Hero'
import Menusection from '../Home/Menu/Menusection'
import Boosection from '../Home/Sectionevent/Boosection'
import Footer from '../Home/Footer/Footer'
import AboutSection from '../Home/About/AboutSection'
function Home() {
  return (
    <div>
      <Hero/>
      <AboutSection/>
      <Menusection/>
      <Boosection/>
    </div>
  )
}

export default Home
