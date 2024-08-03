import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-gray-800 to-blue-400 text-white">
      <header className="bg-white bg-opacity-90 py-10 shadow-md">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-extrabold text-gray-900">About Us</h1>
        </div>
      </header>

      <main className="flex-grow py-12">
        <section className="container mx-auto px-6">
          <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg mb-10">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">Our Story</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Welcome to our platform! We are dedicated to providing top-notch services and resources to our users. Our team of experts is committed to excellence, and we continuously strive to exceed expectations. Explore our offerings and discover how we can assist you in achieving your goals.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex-1 bg-white bg-opacity-90 p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">Our Team</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Meet our dedicated team of professionals who work tirelessly to deliver exceptional results. Each member brings a wealth of experience and passion to the table, ensuring we provide the best possible service to our clients.
              </p>
            </div>

            <div className="flex-1 bg-white bg-opacity-90 p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">Our Values</h2>
              <ul className="list-disc list-inside text-lg text-gray-700">
                <li className="mb-2">Integrity: We uphold the highest standards of integrity in all our actions.</li>
                <li className="mb-2">Excellence: We strive for excellence in every project we undertake.</li>
                <li className="mb-2">Innovation: We embrace innovation and continuous improvement.</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-center py-6">
        <div className="container mx-auto px-6">
          <p className="text-lg text-white">Want to know more about us? <a href="/contact" className="underline font-semibold">Contact Us</a></p>
        </div>
      </footer>
    </div>
  );
}
