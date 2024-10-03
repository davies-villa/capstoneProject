import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import okavangoo from '../assets/okavangoo.png';

const destinationImages = {
  'Okavango Delta, Botswana': okavangoo,
  'Paris, France': okavangoo,
  'Cape Town, South Africa': okavangoo,
  'Cairo, Egypt': okavangoo,
  'Marrakech, Morocco': okavangoo,
  'Nairobi, Kenya': okavangoo,
  'Johannesburg, South Africa': okavangoo,
  'Lagos, Nigeria': okavangoo,
  'Addis Ababa, Ethiopia': okavangoo,
  'Accra, Ghana': okavangoo,
  'Casablanca, Morocco': okavangoo,
  'Victoria Falls, Zimbabwe': okavangoo,
  'Tunis, Tunisia': okavangoo,
  'Dakar, Senegal': okavangoo,
  'Zanzibar, Tanzania': okavangoo,
  'Windhoek, Namibia': okavangoo,
  'Gaborone, Botswana': okavangoo,
  'Seychelles, Seychelles': okavangoo,
  'Mauritius, Mauritius': okavangoo,
  'Kampala, Uganda': okavangoo,
  'Lusaka, Zambia': okavangoo,
  // ... (other destinations)
};

// Sample Itineraries Data
const sampleItineraries = [
    {
      id: 1,
      name: 'Romantic Paris Getaway',
      destination: 'Paris, France',
      description: 'Enjoy a romantic trip in Paris with visits to the Eiffel Tower and Seine River Cruise.',
      category: 'Romance',
      price: 1200,
      imageUrl: 'paris.jpg',
    },
    {
      id: 2,
      name: 'Safari Adventure in Nairobi',
      destination: 'Nairobi, Kenya',
      description: 'Explore the savannahs with a luxury safari experience and wildlife tours.',
      category: 'Adventure',
      price: 1500,
      imageUrl: 'nairobi.jpg',
    },
    {
      id: 3,
      name: 'Historical Cairo Exploration',
      destination: 'Cairo, Egypt',
      description: 'Visit the pyramids, the Sphinx, and the Cairo Museum in a 5-day historical adventure.',
      category: 'History',
      price: 900,
      imageUrl: 'cairo.jpg',
    },
    {
      id: 4,
      name: 'Cultural Marrakech Experience',
      destination: 'Marrakech, Morocco',
      description: 'Dive into the vibrant markets, historic palaces, and stunning gardens of Marrakech.',
      category: 'Culture',
      price: 1100,
      imageUrl: 'marrakech.jpg',
    },
    {
      id: 5,
      name: 'Beach Relaxation in Seychelles',
      destination: 'Seychelles, Seychelles',
      description: 'Relax on pristine beaches and enjoy water activities in the beautiful Seychelles.',
      category: 'Relaxation',
      price: 1800,
      imageUrl: 'seychelles.jpg',
    },
    {
      id: 6,
      name: 'Okavango Delta Adventure',
      destination: 'Okavango Delta, Botswana',
      description: 'Experience the unique ecosystem of the Okavango Delta with guided safaris and boat tours.',
      category: 'Adventure',
      price: 1600,
      imageUrl: 'okavangoo.png',
    },
  ];

function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  // Handle missing state
  if (!state || !state.location) {
    return (
      <div className="p-6">
        <p>No results to display. Please perform a search first.</p>
      </div>
    );
  }

  const { location: searchLocation } = state;

  const [filters, setFilters] = useState({
    flights: false,
    activities: false,
    accommodations: false,
    category: 'All',
    minPrice: 0,
    maxPrice: 2000,
  });

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Apply Filters
  const filteredItineraries = sampleItineraries.filter((itinerary) => {
    const matchesDestination = itinerary.destination.toLowerCase().includes(searchLocation.toLowerCase());
    const matchesCategory = filters.category === 'All' || itinerary.category === filters.category;
    const matchesPrice = itinerary.price >= filters.minPrice && itinerary.price <= filters.maxPrice;

    return matchesDestination && matchesCategory && matchesPrice;
  });

  const handleItineraryClick = (itinerary) => {
    navigate('/itinerarydetails', { state: { itinerary } });
  };

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Search results for "{searchLocation}"</h2>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          onClick={handleBack}
        >
          Back
        </button>
      </div>

      {/* Available Options */}
      <p className="mb-4">Available options: {filteredItineraries.length}</p>

      {/* Filters Section */}
      <div className="mb-6 p-4 bg-white rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Filter Your Search</h3>
        <div className="flex flex-wrap gap-4">
          {/* Flights Checkbox */}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="flights"
              checked={filters.flights}
              onChange={handleFilterChange}
            />
            Flights
          </label>
          {/* Other checkboxes and category dropdown */}
          {/* ... */}
        </div>
      </div>

      {/* Itinerary Results */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        {filteredItineraries.map((itinerary) => {
          const itineraryImage = destinationImages[itinerary.destination] || null;

          return (
            <div
              key={itinerary.id}
              className="bg-white shadow-lg rounded-lg p-4 flex flex-col lg:flex-row gap-4 cursor-pointer"
              onClick={() => handleItineraryClick(itinerary)} // Add onClick event
            >
              {/* Itinerary Image */}
              {itineraryImage && (
                <div className="w-full lg:w-1/3">
                  <img
                    src={itineraryImage}
                    alt={itinerary.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}

              {/* Itinerary Details */}
              <div className="w-full lg:w-2/3 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{itinerary.name}</h3>
                  <p className="mt-2 text-gray-700">{itinerary.description}</p>
                  <span className="inline-block mt-4 py-1 px-3 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                    {itinerary.category}
                  </span>
                </div>
                {/* Price */}
                <div className="mt-4 lg:mt-0 self-end">
                  <span className="text-lg font-bold">${itinerary.price}</span>
                  <button className="ml-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SearchResults;
