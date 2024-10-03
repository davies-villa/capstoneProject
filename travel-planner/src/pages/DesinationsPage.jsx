import React, { useState } from "react";
import Navbar from "../components/Navbar";
import destination1 from "../assets/folosi.png";
import destination2 from "../assets/namibia.png";
import destination3 from "../assets/zanzibar.png";
import destination4 from "../assets/okavangoo.png";
// Import additional destinations as needed

const destinations = [
  {
    id: 1,
    city: "New York",
    country: "USA",
    image: destination1,
    trending: true,
    nickname: "The Big Apple",
    activities: [
      "Sightseeing at Times Square",
      "Central Park Walk",
      "Broadway Shows",
    ],
  },
  {
    id: 2,
    city: "Tokyo",
    country: "Japan",
    image: destination2,
    trending: false,
    nickname: "The Capital of Japan",
    activities: [
      "Visit Senso-ji Temple",
      "Explore Shibuya Crossing",
      "Try Authentic Sushi",
    ],
  },
  {
    id: 3,
    city: "Paris",
    country: "France",
    image: destination3,
    trending: true,
    nickname: "City of Light",
    activities: [
      "Eiffel Tower Visit",
      "Louvre Museum Tour",
      "Seine River Cruise",
    ],
  },
  {
    id: 4,
    city: "Sydney",
    country: "Australia",
    image: destination4,
    trending: false,
    nickname: "Harbour City",
    activities: ["Visit Sydney Opera House", "Bondi Beach", "Taronga Zoo"],
  },
  // Add more destination objects as needed
];

const featuredDestinations = [
  {
    id: 1,
    city: "New York",
    country: "USA",
    image: destination1,
    nickname: "The Big Apple",
  },
  {
    id: 2,
    city: "Tokyo",
    country: "Japan",
    image: destination2,
    nickname: "The Capital of Japan",
  },
  {
    id: 3,
    city: "Paris",
    country: "France",
    image: destination3,
    nickname: "City of Light",
  },
  {
    id: 4,
    city: "Sydney",
    country: "Australia",
    image: destination4,
    nickname: "Harbour City",
  },
];

const DestinationsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(20); // Initially show 20 destinations

  // Filter destinations based on search term
  const filteredDestinations = destinations.filter(
    (dest) =>
      dest.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dest.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 20); // Load 20 more destinations
  };

  const handleSearch = () => {
    // Implement any additional logic you want on search button click
    console.log(`Searching for: ${searchTerm}`);
  };

  return (
    <section className="w-full relative">
      <div className="w-full mx-auto ">
        <Navbar />

        {/* Top Section: Header, Paragraph, Search, and Featured Images */}
        <div className="lg:flex lg:space-x-8 lg:px-16 mt-8">
          {/* Left Side: Text, Paragraph, and Search Bar */}
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold mb-4">All Destinations</h2>
            <p className="text-lg mb-8 text-gray-700">
              Explore some of the most beautiful places around the world!
            </p>

            {/* Search Bar with Button */}
            <div className="mb-6 flex items-center">
              <input
                type="text"
                placeholder="Search for destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border rounded-sm lg:w-[80%]"
              />
              <button
                onClick={handleSearch}
                className="bg-custom-brown text-white px-4 py-2 rounded-sm hover:bg-custom-brown ml-2"
              >
                Search
              </button>
            </div>
          </div>

          {/* Right Side: 2x2 Featured Image Grid */}
          <div className="lg:w-1/2 grid grid-cols-2 gap-4 mt-8 lg:mt-0">
            {featuredDestinations.map((dest) => (
              <div
                key={dest.id}
                className="relative overflow-hidden rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={dest.image}
                  alt={dest.city}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black via-transparent to-transparent w-full text-white">
                  <h3 className="text-lg font-semibold">{dest.city}</h3>
                  <p className="text-sm">{dest.nickname}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Destination Cards */}
        <div className="mt-12 px-4 lg:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDestinations.slice(0, visibleCount).map((dest) => (
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
          </div>
        </div>

        {/* Destination Count */}
        <div className="mt-6 text-center">
          <span className="text-lg">
            {`${filteredDestinations.length} of ${destinations.length}`}
          </span>
        </div>

        {/* Load More Button */}
        {visibleCount < filteredDestinations.length && (
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

export default DestinationsPage;
