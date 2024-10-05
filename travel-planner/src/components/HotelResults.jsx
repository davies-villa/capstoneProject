// src/components/HotelResults.js
import React from "react";
import { useHistory } from "react-router-dom";

const HotelResults = ({ hotels }) => {
  const history = useHistory();

  const handleHotelClick = (hotel) => {
    history.push(`/hotels/${hotel.id}`); // Adjust to your hotel detail route
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {hotels.map((hotel, index) => (
        <div
          key={index}
          className="border p-4 rounded shadow cursor-pointer"
          onClick={() => handleHotelClick(hotel)}
        >
          <h2 className="text-xl font-semibold mb-2">{hotel.name}</h2>
          <p>{hotel.address}</p>
          <p>Price: {hotel.price} per night</p>
        </div>
      ))}
    </div>
  );
};

export default HotelResults;
