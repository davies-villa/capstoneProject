import React from "react";
import headerBackground from "../assets/traveler.png"; // Adjust the path and extension as necessary

const Offer = () => {
  return (
    <section
      className="relative bg-cover bg-center lg:px-16  h-auto bg-fixed"
      style={{
        backgroundImage: `url(${headerBackground})`,
      }}
    >
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black opacity-40 z-0"></div>

      {/* Content Section */}
      <div className="relative z-10 flex justify-end items-center h-full py-24 px-4">
        <div className="w-full max-w-screen-lg lg:w-6/12 md:w-full sm:w-full text-left">
          <div className="header-txt">
            <h1 className=" text-3xl text-white font-semibold text-left mb-2">
              Exclusive Travel Offers
            </h1>
            <p className="text-white mb-2">
              Discover exclusive travel offers across Africa’s most captivating
              destinations. Whether it's the vast Serengeti savannas or the
              idyllic Seychelles beaches, our tailored packages bring you closer
              to Africa
            </p>
            <div className="w-full lg:w-auto">
              <button
                type="submit"
                className="bg-custom-brown text-white px-6 py-2 rounded mt-4 lg:mt-2"
              >
                Explore Offers
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Offer;
