import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import image1 from '../assets/image1.png';
import image2 from '../assets/image2.png';
import image3 from '../assets/image3.png';
import '../styles/Home.css';

const Home = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
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
            <img src={image1} alt="Section 1" />
          </div>
          <div className="section-right">
            <h2>Section 1</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
        <div className={`section ${scrollPosition >= 500 && scrollPosition < 1000 ? 'visible' : ''}`}>
          <div className="section-left">
            <h2>Section 2</h2>
            <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
          <div className="section-right">
            <img src={image2} alt="Section 2" />
          </div>
        </div>
        <div className={`section ${scrollPosition >= 1000 && scrollPosition < 1500 ? 'visible' : ''}`}>
          <div className="section-left">
            <img src={image3} alt="Section 3" />
          </div>
          <div className="section-right">
            <h2>Section 3</h2>
            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          </div>
        </div>
      </div>
      <div className="footer">
        <Link to="/contact">Contact Us</Link>
      </div>
    </div>
  );
};

export default Home;
