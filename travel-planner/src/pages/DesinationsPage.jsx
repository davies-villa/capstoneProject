// src/pages/ActivitiesPage.jsx
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import activities from "../data/destinations"; // Adjust the path to your data file

const ActivitiesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(20); // Initially show 20 destinations
  const [filteredActivities, setFilteredActivities] = useState([]);
  
  useEffect(() => {
    const africanCountries = [
      "Algeria", "Angola", "Benin", "Botswana", "Burkina Faso", "Burundi",
      "Cabo Verde", "Cameroon", "Central African Republic", "Chad", "Comoros",
      "Democratic Republic of the Congo", "Republic of the Congo", "Djibouti",
      "Egypt", "Equatorial Guinea", "Eritrea", "Eswatini", "Ethiopia",
      "Gabon", "Gambia", "Ghana", "Guinea", "Guinea-Bissau", "Ivory Coast",
      "Kenya", "Lesotho", "Liberia", "Libya", "Madagascar", "Malawi",
      "Mali", "Mauritania", "Mauritius", "Morocco", "Mozambique", "Namibia",
      "Niger", "Nigeria", "Rwanda", "Sao Tome and Principe", "Senegal",
      "Seychelles", "Sierra Leone", "Somalia", "South Africa", "South Sudan",
      "Sudan", "Tanzania", "Togo", "Tunisia", "Uganda", "Zambia", "Zimbabwe"
    ];

    const africanActivities = activities
      .filter(dest => africanCountries.includes(dest.country))
      .sort((a, b) => b.visits - a.visits); // Sort by visits descending

    setFilteredActivities(africanActivities);
  }, []);

  // Update filteredActivities based on searchTerm
  useEffect(() => {
    const africanCountries = [
      "Algeria", "Angola", "Benin", "Botswana", "Burkina Faso", "Burundi",
      "Cabo Verde", "Cameroon", "Central African Republic", "Chad", "Comoros",
      "Democratic Republic of the Congo", "Republic of the Congo", "Djibouti",
      "Egypt", "Equatorial Guinea", "Eritrea", "Eswatini", "Ethiopia",
      "Gabon", "Gambia", "Ghana", "Guinea", "Guinea-Bissau", "Ivory Coast",
      "Kenya", "Lesotho", "Liberia", "Libya", "Madagascar", "Malawi",
      "Mali", "Mauritania", "Mauritius", "Morocco", "Mozambique", "Namibia",
      "Niger", "Nigeria", "Rwanda", "Sao Tome and Principe", "Senegal",
      "Seychelles", "Sierra Leone", "Somalia", "South Africa", "South Sudan",
      "Sudan", "Tanzania", "Togo", "Tunisia", "Uganda", "Zambia", "Zimbabwe"
    ];

    const africanCountriesSet = new Set(africanCountries.map(country => country.toLowerCase()));

    const searchFiltered = activities
      .filter(dest => africanCountriesSet.has(dest.country.toLowerCase()))
      .filter(dest =>
        dest.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.country.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => b.visits - a.visits); // Sort by visits descending

    setFilteredActivities(searchTerm ? searchFiltered : activities
      .filter(dest => africanCountriesSet.has(dest.country.toLowerCase()))
      .sort((a, b) => b.visits - a.visits));
  }, [searchTerm, activities]);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 20); // Load 20 more destinations
  };

  const handleSearch = () => {
    // Optional: Add any additional search logic here
    console.log(`Searching for: ${searchTerm}`);
  };

  return (
    <section className="w-full bg-gray-100">
      <div className="relative">
        <div className="h-[60vh]">
          <Navbar />
          <h2 className="text-3xl text-main font-bold mt-5 mb-4 text-center">All Destinations</h2>
          <p className="text-lg mb-8 text-sub text-center">
            Explore some of the most beautiful places around the world!
          </p>

          {/* Search Bar with Button */}
          <div className="mb-6 flex items-center justify-center">
            <input
              type="text"
              placeholder="Search for destinations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-3 shadow-custom-black rounded-sm lg:w-[80%]"
            />
            <button
              onClick={handleSearch}
              className="bg-custom-brown text-white px-6 py-3 shadow-custom-black rounded-sm hover:bg-custom-brown ml-2"
            >
              Search
            </button>
          </div>
        </div>

        {/* Main Destination Cards */}
        <div className="mt-12 px-4 lg:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredActivities.slice(0, visibleCount).map((dest) => (
              <div
                key={dest.id}
                className="relative overflow-hidden rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={dest.image}
                  alt={dest.city}
                  className="w-full h-64 sm:h-48 object-cover"
                />
                <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black via-transparent to-transparent w-full text-white">
                  <h3 className="text-xl font-semibold">{dest.city}</h3>
                  <p className="text-sm">{dest.country}</p>
                  {dest.trending && (
                    <span className="text-xs font-bold bg-white text-black py-1 px-2 rounded-full absolute top-2 right-2">
                      Trending
                    </span>
                  )}
                </div>
              </div>
            ))}
            {/* Show "Destination not found" if no matches */}
            {filteredActivities.length === 0 && (
              <div className="col-span-full text-center text-red-500">
                Destination not found
              </div>
            )}
          </div>
        </div>

        {/* Destination Count */}
        <div className="mt-6 text-center">
          <span className="text-lg text-gray-700">
            {`${Math.min(visibleCount, filteredActivities.length)} of ${filteredActivities.length} destinations`}
          </span>
        </div>

        {/* Load More Button */}
        {visibleCount < filteredActivities.length && (
          <div className="mt-4 text-center">
            <button
              onClick={handleLoadMore}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ActivitiesPage;
