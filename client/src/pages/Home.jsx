import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import image1 from '../assets/image1.png';
import image2 from '../assets/image2.png';
import image3 from '../assets/image3.png';
import carImage from '../assets/image4.png'; // Import the car image
import '../styles/Home.css';

const Home = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="home-container">
      <div className="header">
        <h1>Welcome to Our Real Estate Website</h1>
      </div>
      <div className="content">
        <div className={`section ${scrollPosition < 500 ? 'visible' : ''}`}>
          <div className="section-left">
            <img src={image1} alt="Interior Design" />
          </div>
          <div className="section-right">
            <h2>Find Your Dream Home</h2>
            <p>Explore our wide range of properties and find the perfect fit for you and your family.</p>
          </div>
        </div>
        <div className={`section ${scrollPosition >= 500 && scrollPosition < 1000 ? 'visible' : ''}`}>
          <div className="section-left">
            <h2>Expert Advice</h2>
            <p>Get expert advice from our real estate professionals to make informed decisions.</p>
          </div>
          <div className="section-right">
            <img src={image2} alt="Expert Advice" />
          </div>
        </div>
        <div className={`section ${scrollPosition >= 1000 && scrollPosition < 1500 ? 'visible' : ''}`}>
          <div className="section-left">
            <img src={image3} alt="Reliable Service" />
          </div>
          <div className="section-right">
            <h2>Reliable Service</h2>
            <p>Experience top-notch customer service and support throughout your real estate journey.</p>
          </div>
        </div>
      </div>
      <div className="footer">
        <Link to="/contact">Contact Us</Link>
      </div>
      {/* Car animation */}
      <img className="car" src={carImage} alt="Car" style={{ transform: `translateY(${scrollPosition}px)` }} />
    </div>
  );
};

export default Home;
