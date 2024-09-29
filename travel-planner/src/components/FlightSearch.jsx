// src/components/FlightSearch.js
import React, { useState } from 'react';

const FlightSearch = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/flights?origin=${origin}&destination=${destination}&departureDate=${departureDate}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch flights');
      }

      const data = await response.json();
      setFlights(data.data); // Assuming the Amadeus API returns data in 'data' field
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Flight Search</h1>
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex flex-col md:flex-row md:space-x-4">
          <input
            type="text"
            placeholder="Origin (e.g., LON)"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="border p-2 rounded mb-4 md:mb-0"
            required
          />
          <input
            type="text"
            placeholder="Destination (e.g., NYC)"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="border p-2 rounded mb-4 md:mb-0"
            required
          />
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            className="border p-2 rounded mb-4 md:mb-0"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {flights.map((flight, index) => (
          <div key={index} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">
              {flight.itineraries[0].segments[0].departure.iataCode} ➔{' '}
              {flight.itineraries[0].segments[0].arrival.iataCode}
            </h2>
            <p>
              Departure: {flight.itineraries[0].segments[0].departure.at}
            </p>
            <p>
              Arrival: {flight.itineraries[0].segments[0].arrival.at}
            </p>
            <p>
              Price: {flight.price.total} {flight.price.currency}
            </p>
            <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-green-600">
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightSearch;
