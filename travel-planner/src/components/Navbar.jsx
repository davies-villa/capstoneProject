import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; // Adjust the path as necessary

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-black bg-opacity-40 max-w-6x text-white p-4 lg:px-16 flex justify-between items-center relative z-20">
      <div className="flex items-center">
        <Link to="/">
          <img src={logo} alt="Logo" className="h-12 w-auto mr-4" />{" "}
          {/* Logo Image */}
        </Link>
      </div>

      <div className="hidden lg:flex flex-grow justify-center">
        <ul className="nav-links flex space-x-4">
          <li>
            <Link to="/" className="py-2 px-4 transition duration-300">
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/destinationspage"
              className="py-2 px-4 transition duration-300"
            >
              Destinations
            </Link>
          </li>
          <li>
            <Link
              to="/activitiespage"
              className="py-2 px-4 transition duration-300"
            >
              Activities
            </Link>
          </li>
          <li>
            <Link
              to="/hotelsearch"
              className="py-2 px-4 transition duration-300"
            >
              Accomodation
            </Link>
          </li>
          <li>
            <Link
              to="/flightsearch"
              className="py-2 px-4 transition duration-300"
            >
              Flights
            </Link>
          </li>
        </ul>
      </div>

      <div className="hidden lg:flex items-center space-x-4">
        <Link
          to="/signup"
          className="py-2 px-4 bg-[#D9B189] text-white text-center rounded hover:bg-gray-200 transition duration-300"
        >
          Signup
        </Link>
        <Link
          to="/login"
          className="py-2 px-4 bg-[#C38144] rounded hover:bg-blue-800 transition duration-300"
        >
          Login
        </Link>
      </div>

      {/* Hamburger Icon */}
      <div className="lg:hidden flex items-center relative z-30">
        <button onClick={toggleMenu} className="focus:outline-none">
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-0 right-0 w-2/3 h-full bg-custom-brown text-white p-4 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-40`}
      >
        <button
          onClick={toggleMenu}
          className="absolute top-4 right-4 text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <ul className="flex flex-col mt-8 space-y-4">
          <li>
            <Link to="/" className="py-2 px-4 ">
              Home
            </Link>
          </li>
          <li>
            <Link to="/destinationspage" className="py-2 px-4 ">
              Destinations
            </Link>
          </li>
          <li>
            <Link to="/activitiespage" className="py-2 px-4 ">
              Activities
            </Link>
          </li>
          <li>
            <Link to="/hotelsearch" className="py-2 px-4 ">
              Accomodation
            </Link>
          </li>
          <li>
            <Link to="/flightsearch" className="py-2 px-4 ">
              Flights
            </Link>
          </li>
        </ul>
        <div className="mt-4">
          <Link
            to="/signup"
            className="block py-2 px-4 bg-white text-gray-600 rounded mb-2 hover:bg-gray-200 transition duration-300"
          >
            Signup
          </Link>
          <Link
            to="/login"
            className="block py-2 px-4 bg-white text-gray-600 rounded hover:bg-gray-200 transition duration-300"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
