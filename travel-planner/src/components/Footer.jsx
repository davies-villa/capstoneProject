import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-custom-brown text-white py-10 lg:px-16">
      <div className="max-w-7xl mx-auto  grid grid-cols-1 md:grid-cols-2 lg:grid-cols- gap-8">
        {/* Subscribe Section */}
        <div>
          <h3 className="text-lg font-bold mb-4">Subscribe to our Newsletter</h3>
          
          {/* Email Input and Subscribe Button */}
          <form className="relative flex justify-center  items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 p-6 rounded-sm w-full text-black"
            />
            <button
              type="submit"
              className="absolute right-4  bg-custom-brown hover:bg-custom-brown text-white py-2 px-2 rounded-sm"
            >
              Subscribe
            </button>
          </form>
          
          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-[#C38144] bg-white p-2 rounded-full hover:bg-custom-brown hover:text-white transition">
              <FaFacebookF />
            </a>
            <a href="#" className="text-[#C38144] bg-white p-2 rounded-full hover:bg-custom-brown hover:text-white transition">
              <FaTwitter />
            </a>
            <a href="#" className="text-[#C38144] bg-white p-2 rounded-full hover:bg-custom-brown hover:text-white transition">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Destinations Section */}
        <div>
          <h3 className="text-lg font-bold mb-4">Destinations</h3>
          <ul>
            <li className="mb-2">
              <a href="#" className="hover:underline">Paris</a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline">New York</a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline">Tokyo</a>
            </li>
            {/* Add more destinations as needed */}
          </ul>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
