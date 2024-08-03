import React from 'react';

const Services = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 to-blue-400 py-10 px-6">
      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Our Services</h1>
        <p className="text-lg text-gray-100">
          Explore the wide range of services we offer to meet your real estate needs.
        </p>
      </header>

      {/* Services List */}
      <section className="flex flex-col lg:flex-row lg:justify-between gap-8">
        {/* Service 1 */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
          <i className="fas fa-home text-4xl text-yellow-500 mb-4"></i>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Luxury Homes</h2>
          <p className="text-gray-600">
            Discover premium homes in the most sought-after locations, featuring exquisite designs and top-notch amenities.
          </p>
        </div>

        {/* Service 2 */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
          <i className="fas fa-building text-4xl text-yellow-500 mb-4"></i>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Commercial Spaces</h2>
          <p className="text-gray-600">
            Find the ideal commercial space for your business with our diverse range of options in prime locations.
          </p>
        </div>

        {/* Service 3 */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
          <i className="fas fa-map-marker-alt text-4xl text-yellow-500 mb-4"></i>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Property Management</h2>
          <p className="text-gray-600">
            Experience hassle-free property management services that ensure your investments are well taken care of.
          </p>
        </div>

        {/* Service 4 */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
          <i className="fas fa-handshake text-4xl text-yellow-500 mb-4"></i>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Consulting Services</h2>
          <p className="text-gray-600">
            Get expert advice and consultation on real estate investments, market trends, and property valuation.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center mt-12">
        <h2 className="text-3xl font-semibold text-gray-300 mb-4">Ready to Get Started?</h2>
        <p className="text-lg text-gray-200 mb-6">
          Contact us today to learn more about our services and how we can assist with your real estate needs.
        </p>
        <a href="/contact" className="bg-gray-800 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition-colors">
          Contact Us
        </a>
      </section>
    </div>
  );
};

export default Services;
