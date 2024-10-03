import React from "react";
import Navbar from "./Navbar.jsx";
import HeaderForm from "./HeaderForm.jsx"
import headerBackground from "../assets/header_background.png";

const Header = () => {
  return (
    <header
      className="relative bg-cover bg-center h-fu bg-fixed" 
      style={{
        backgroundImage: `url(${headerBackground})`,
      }} >
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black opacity-40 z-0"></div>

      {/* Navbar */}
      <Navbar />

      {/* Content Section */}
      <div className="relative z-10 flex justify-start items-center h-full py-20 px-4 lg:px-16">
        <div className="w-full max-w-6x lg:w-7/12 md:w-full sm:w-full text-left">
          <div className="header-txt py-2">
            <h1 className="text-5xl py-2 text-white font-semibold">
              Explore Africa's Beauty
            </h1>
            <p className="text-white  font-semi-bold">
              Africa is a continent of breathtaking landscapes, rich cultures,
              and diverse wildlife. From the vast savannas of the Serengeti to
              the stunning beaches of the Seychelles, each destination offers a
              unique experience waiting to be discovered
            </p>
          </div>
          <HeaderForm />
        </div>
      </div>
    </header>
  );
};

export default Header;
