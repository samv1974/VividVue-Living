import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import image1 from '../assets/image1.png';
import image2 from '../assets/image2.png';
import image3 from '../assets/image3.png';
// import carImage from '../assets/image4.png'; // Import the car image
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
    <div className="home-container bg-gradient-to-r from-gray-400 to-gray-900 text-white w-full">

      <div className="content flex flex-col items-center">
        <div className={`section grid grid-cols-1 md:grid-cols-2 gap-10 opacity-0 transition-opacity duration-800 ease-in-out my-10 ${scrollPosition < 500 ? 'visible opacity-100' : ''}`}>
          <div className="section-left flex justify-end items-center">
            <div className="image-overlay pl-5">
              <img src={image1} alt="Luxury Apartments" className="border rounded-lg shadow-lg transform transition-transform hover:scale-110 hover:rotate-2" />
            </div>
          </div>
          <div className="section-right flex flex-col justify-center text-yellow-300">
            <h2 className="text-4xl font-semibold">Luxury Apartments</h2>
            <p className="text-xl text-white">Explore our exclusive collection of luxury apartments with breathtaking views and state-of-the-art amenities. Perfect for those who seek comfort and elegance in the heart of the city.</p>
          </div>
        </div>
        <div className={`section grid grid-cols-1 md:grid-cols-2 gap-10 opacity-0 transition-opacity duration-800 ease-in-out my-10 ${scrollPosition >= 500 && scrollPosition < 1000 ? 'visible opacity-100' : ''}`}>
          <div className="section-left flex flex-col justify-center text-yellow-300 order-last md:order-first">
            <h2 className="text-4xl font-semibold">Family Homes</h2>
            <p className="text-xl">Discover spacious family homes located in serene neighborhoods. These properties offer ample space, modern designs, and close proximity to schools, parks, and shopping centers.</p>
          </div>
          <div className="section-right flex justify-end items-center">
            <div className="image-overlay pr-10">
              <img src={image2} alt="Family Homes" className=" border rounded-lg shadow-lg transform transition-transform hover:scale-110 hover:rotate-2" />
            </div>
          </div>
        </div>
        <div className={`section grid grid-cols-1 md:grid-cols-2 gap-10 opacity-0 transition-opacity duration-800 ease-in-out my-10 ${scrollPosition >= 1000 ? 'visible opacity-100' : ''}`}>
          <div className="section-left flex justify-end items-center">
            <div className="pl-5 image-overlay">
              <img src={image3} alt="Commercial Spaces" className=" border pr-5 rounded-lg shadow-lg transform transition-transform hover:scale-110 hover:rotate-2" />
            </div>
          </div>
          <div className="section-right flex flex-col justify-center text-yellow-300">
            <h2 className="">Commercial Spaces</h2>
            <p className="text-xl">Find the perfect commercial space for your business. We offer a variety of office spaces, retail locations, and industrial properties to meet your commercial needs.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
