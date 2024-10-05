import React, { useState } from "react";
import Navbar from "../components/Navbar";
import headerBackground from "../assets/header_background.png";

const HotelsSearch = () => {
  const [cityCode, setCityCode] = useState("");
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!cityCode.trim()) {
      setError("Please enter a valid city code.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:5000/api/hotels?cityCode=${cityCode}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch hotels");
      }
      const data = await response.json();

      if (data && Array.isArray(data)) {
        setHotels(data);
      } else if (data && data.data && Array.isArray(data.data)) {
        setHotels(data.data);
      } else {
        setError("Unexpected response format.");
        setHotels([]);
      }
    } catch (err) {
      setError(err.message);
      setHotels([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full ">
      <div
        className="h-[60vh]"
      
      >
        <Navbar />
        <h2 className="text-3xl font-bold text-main mb-4 mt-5 text-center">
          Search for Hotels
        </h2>
        <p className="text-lg mb-6 text-sub text-center">
            Engage in thrilling activities tailored just for you!
          </p>
        {/* Input field and Search button */}
        <div className="flex items-centerp-6 justify-center space-x-4 mb-6">
          <input
            type="text"
            placeholder="Enter city code (e.g., VFA)"
            value={cityCode}
            onChange={(e) => setCityCode(e.target.value.toUpperCase())}
            className="w-48 px-6 py-3 border rounded-md focus:outline-none shadow-custom-black focus:ring-2 focus:ring-white"
          />
          <button
            onClick={handleSearch}
            className="px-6 py-3 bg-custom-brown shadow-custom-black text-white rounded-md"
          >
            Search
          </button>
        </div>
      </div>
      {/* Skeleton Loader while loading */}
      {loading && <SkeletonLoader />}

      {/* Error State */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Hotels List */}
      {!loading && hotels.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Available Hotels</h3>
          <ul className="space-y-4">
            {hotels.map((hotel) => (
              <li
                key={hotel.hotelId}
                className="border rounded-md p-4 shadow-sm hover:shadow-lg transition"
              >
                {/* Display hotel logo if available */}
                {hotel.logoUrl && (
                  <img
                    src={hotel.logoUrl}
                    alt={`${hotel.name} logo`}
                    className="w-24 h-24 object-cover mb-2"
                  />
                )}
                <h4 className="text-lg font-bold">{hotel.name}</h4>
                <p>Hotel ID: {hotel.hotelId}</p>
                <p>Country: {hotel.address.countryCode}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* No Results State */}
      {!loading && !error && hotels.length === 0 && cityCode && (
        <p className="text-center text-gray-500 mt-4">
          No hotels found for the city code "{cityCode}".
        </p>
      )}
    </div>
  );
};

// Skeleton Loader Component
const SkeletonLoader = () => {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="border rounded-md p-4 shadow-sm animate-pulse">
          <div className="h-6 bg-gray-300 rounded mb-4 w-1/2"></div>{" "}
          {/* Simulates hotel name */}
          <div className="h-4 bg-gray-200 rounded mb-2 w-1/3"></div>{" "}
          {/* Simulates hotel details */}
          <div className="h-4 bg-gray-200 rounded mb-2 w-1/4"></div>{" "}
          {/* Simulates more details */}
          <div className="h-4 bg-gray-200 rounded w-1/6"></div>{" "}
          {/* Simulates small detail */}
        </div>
      ))}
    </div>
  );
};

export default HotelsSearch;
