import React from "react";
import headerBackground from "../assets/chobe.png";

const Testimonial = () => {
  return (
    <section
      className="relative bg-cover bg-center lg:px-16   h-auto bg-fixed" // Set height to 100vh
      style={{
        backgroundImage: `url(${headerBackground})`,
      }}
    >
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black opacity-40 z-0"></div>

      {/* Content Section */}
      <div className="relative z-10 flex justify-start items-center h-full py-24 px-4">
        <div className="w-full max-w-screen-lg lg:w-6/12 md:w-full sm:w-full text-left">
          <div className="header-txt">
            <h1 className=" text-3xl text-white font-semibold mb-2 text-left">
              What Our Travelers Are Saying
            </h1>
            <p className="text-white mb-2">
              "We had the best guides who made every moment unforgettable! From
              their deep knowledge of the wildlife to their warm hospitality,
              our trip exceeded all expectations. A truly remarkable experience
              in Africa."
            </p>
            <div className="w-full lg:w-auto pt-8 text">
                <h4 className="text-white text-lg font-semibold">Tadiwa Choga</h4>
                <p className="text-white text-md font-light">United Kingdom</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
