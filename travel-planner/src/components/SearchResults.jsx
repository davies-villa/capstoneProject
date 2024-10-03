import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import okavangoo from '../assets/okavangoo.png';

// Destination images mapping (as needed)
const destinationImages = {
  'Okavango Delta, Botswana': okavangoo,
  // ... add other destinations as needed
};

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

  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        // Replace with your actual TripAdvisor API endpoint and parameters
        const response = await axios.get(`https://api.tripadvisor.com/your-endpoint?location=${searchLocation}`);
        setItineraries(response.data); // Adjust based on your API response structure
      } catch (err) {
        setError('Failed to fetch itineraries.');
      } finally {
        setLoading(false);
      }
    };

    fetchItineraries();
  }, [searchLocation]);

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
  const filteredItineraries = itineraries.filter((itinerary) => {
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

      {/* Loading/Error Handling */}
      {loading && <p>Loading itineraries...</p>}
      {error && <p className="text-red-500">{error}</p>}

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
          {/* Other checkboxes and category dropdown can be added here */}
        </div>
      </div>

      {/* Itinerary Results */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        {filteredItineraries.map((itinerary) => {
          const itineraryImage = destinationImages[itinerary.destination] || okavangoo; // Fallback image

          return (
            <div
              key={itinerary.id}
              className="bg-white shadow-lg rounded-lg p-4 flex flex-col lg:flex-row gap-4 cursor-pointer"
              onClick={() => handleItineraryClick(itinerary)}
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
