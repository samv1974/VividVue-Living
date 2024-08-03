import React from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12 px-6 flex flex-col lg:flex-row justify-between lg:justify-between items-center lg:items-start">
      {/* Contact Us Section */}
      <div className="flex-1 min-w-[250px] mb-8 lg:mb-0">
        <h3 className="text-2xl font-semibold mb-4">Contact Us</h3>
        <p className="mb-2">Email: info@example.com</p>
        <p className="mb-2">Phone: 123-456-7890</p>
        <p className="mb-2">Address: 123 Street, City, Country</p>
        {/* Uncomment to add a contact form
        <form className="flex mt-4">
          <input 
            type="email" 
            placeholder="Subscribe for updates" 
            className="p-2 rounded-l-md border-none"
          />
          <button 
            type="submit" 
            className="bg-white text-gray-800 px-4 py-2 rounded-r-md border-none cursor-pointer hover:bg-gray-200"
          >
            Subscribe
          </button>
        </form>
        */}
      </div>

      {/* Follow Us Section */}
      <div className="flex-1 min-w-[250px] mb-8 lg:mb-0 lg:flex-1 text-center">
        <h3 className="text-2xl font-semibold mb-4">Follow Us</h3>
        <div className="flex justify-center space-x-4">
          <a href="https://www.facebook.com/profile.php?id=61563794820107" className="text-white text-2xl hover:text-gray-400">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://x.com/vasishat_s53525" className="text-white text-2xl hover:text-gray-400">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://www.instagram.com/sam_vasishat21/" className="text-white text-2xl hover:text-gray-400">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.linkedin.com/in/sam-vasishat-b16854314/" className="text-white text-2xl hover:text-gray-400">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="flex-1 min-w-[250px] mb-8 lg:mb-0 text-right">
        <h3 className="text-2xl font-semibold mb-4">Quick Links</h3>
        <ul className="space-y-2">
          <li><Link to="/" className="hover:text-blue-300">Home</Link></li>
          <li><Link to="/about" className="hover:text-blue-300">About Us</Link></li>
          <li><Link to="/services" className="hover:text-blue-300">Services</Link></li>
          <li><Link to="/contactus" className="hover:text-blue-300 hover:underline">Contact Us</Link></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
