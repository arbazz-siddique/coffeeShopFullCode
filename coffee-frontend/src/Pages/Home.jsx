import React from 'react'
import AboutSection from './sub-component/AboutSection';
import ContactSection from './sub-component/ContactSection';
import GallerySection from './sub-component/GallerySection';
import Header from './sub-component/Header';
import HeroSection from './sub-component/HeroSection';
import MenuSection from './sub-component/MenuSection';
import Navbar from './sub-component/Navbar';
import TestimonialsSection from './sub-component/TestimonialsSection';
import '../style/style.css'
import { CartProvider } from './sub-component/CartContext';
import Reservation from './sub-component/Reservation';

// import Cart from './sub-component/Cart';

const Home = () => {
  return (
    <div className="w-full bg-red-500">
      <CartProvider>
      <Navbar/>
    </CartProvider>
     <HeroSection/>
     <AboutSection/>
      <MenuSection />
      {/* <Header/> */}
     {/* <GallerySection/> */}
     <TestimonialsSection/>
     <ContactSection/>
    </div>
  );
}

export default Home