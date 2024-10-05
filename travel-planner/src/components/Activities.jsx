// src/components/Activities.js

import React from "react";
import Slider from "react-slick";
import activities from '../data/activities'; // Import activities from the data file
import './Activities.css'; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom Previous Arrow with Inline SVG
const PrevArrow = ({ onClick }) => (
  <button 
    className="slick-prev custom-arrow d-none right-[-25px] lg:right-[20px] absolute z-10 top-[40%]" 
    onClick={onClick}
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-10 w-10 text-[#C38144] bg-white p-2 rounded-full">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
    </svg>
  </button>
);

// Custom Next Arrow with Inline SVG
const NextArrow = ({ onClick }) => (
  <button 
    className="slick-next custom-arrow none  right-[15px] lg:right-[-10px] absolute z-10 top-[40%]" 
    onClick={onClick}
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-10 w-10 text-[#C38144] bg-white p-2 rounded-full">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
  </button>
);

const Activities = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Limit activities to first five
  const displayedActivities = activities.slice(0, 5);

  return (
    <section className="py-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl text-[#333333] font-bold mb-2">Exciting Activities</h2>
        <p className="text-md font-semi-bold text-gray-600 mb-2">
          Engage in thrilling activities tailored just for you!
        </p>
        <Slider {...settings}>
          {displayedActivities.map((activity) => (
            <div key={activity.id} className="p-4">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-60 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{activity.title}</h3>
                  <p className="text-gray-600 text-md">{activity.description}</p>
                  <div className="flex flex-wrap mt-2">
                    {activity.categories.map((category, index) => {
                      let bgColor = '';
                      let textColor = '';

                      // Differentiate colors for each category
                      switch (category) {
                        case "Adventure":
                          bgColor = "bg-green-200";
                          textColor = "text-green-800";
                          break;
                        case "Wildlife":
                          bgColor = "bg-yellow-200";
                          textColor = "text-yellow-800";
                          break;
                        case "Sports":
                          bgColor = "bg-red-200";
                          textColor = "text-red-800";
                          break;
                        case "Beach":
                          bgColor = "bg-blue-200";
                          textColor = "text-blue-800";
                          break;
                        case "Hiking":
                          bgColor = "bg-purple-200";
                          textColor = "text-purple-800";
                          break;
                        case "Nature":
                          bgColor = "bg-teal-200";
                          textColor = "text-teal-800";
                          break;
                        case "Culture":
                          bgColor = "bg-pink-200";
                          textColor = "text-pink-800";
                          break;
                        case "History":
                          bgColor = "bg-indigo-200";
                          textColor = "text-indigo-800";
                          break;
                        case "Tourism":
                          bgColor = "bg-orange-200";
                          textColor = "text-orange-800";
                          break;
                        case "Leisure":
                          bgColor = "bg-gray-200";
                          textColor = "text-gray-800";
                          break;
                        default:
                          bgColor = "bg-gray-200";
                          textColor = "text-gray-500";
                      }

                      return (
                        <span
                          key={index}
                          className={`inline-block mt-1 py-1 px-3 ${bgColor} ${textColor} rounded-full text-sm font-medium mr-2`}
                        >
                          {category}
                        </span>
                      );
                    })}
                  </div>
                  <p className="mt-2 font-bold text-right">{`$${activity.price}`}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Activities;
