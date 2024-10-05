// src/components/FlightSearch.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Change this line
import Navbar from "../components/Navbar";

const FlightSearch = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [adults, setAdults] = useState(1); // New state for adults
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Change this line

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/flights?origin=${origin}&destination=${destination}&departureDate=${departureDate}&adults=${adults}` // Updated fetch URL
      );

      if (!response.ok) {
        throw new Error("Failed to fetch flights");
      }

      const data = await response.json();
      setFlights(data.data); // Assuming the Amadeus API returns data in 'data' field
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFlightClick = (flight) => {
    // Change this line to use navigate instead of history
    navigate(`/flights/${flight.itineraries[0].segments[0].carrierCode}`); // Adjust to your route
  };

  return (
    <div className="w-full mx-auto">
      <Navbar />
      <h1 className="text-3xl font-bold text-center mb-4 mt-5">Flight Search</h1>
      <form onSubmit={handleSearch} className="mb-6 p-6">
        <div className="flex flex-col items-center w-full justify-center md:flex-row md:space-x-4">
          <input
            type="text"
            placeholder="Origin (e.g., LON)"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="p-2 rounded shadow mb-4 md:mb-0"
            required
          />
          <input
            type="text"
            placeholder="Destination (e.g., NYC)"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="p-2 rounded shadow mb-4 md:mb-0"
            required
          />
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            className="p-2 rounded shadow mb-4 md:mb-0"
            required
          />
          {/* New input for number of adults */}
          <input
            type="number"
            min="1"
            value={adults}
            onChange={(e) => setAdults(e.target.value)}
            placeholder="Adults"
            className="p-2 rounded shadow mb-4 md:mb-0"
            required
          />
          <button
            type="submit"
            className="bg-custom-brown text-white px-6 py-3 rounded"
          >
            Search
          </button>
        </div>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {flights.map((flight, index) => (
          <div
            key={index}
            className="border p-4 rounded shadow cursor-pointer"
            onClick={() => handleFlightClick(flight)}
          >
            <h2 className="text-xl font-semibold mb-2">
              {flight.itineraries[0].segments[0].departure.iataCode} ➔{" "}
              {flight.itineraries[0].segments[0].arrival.iataCode}
            </h2>
            <p>Departure: {flight.itineraries[0].segments[0].departure.at}</p>
            <p>Arrival: {flight.itineraries[0].segments[0].arrival.at}</p>
            <p>
              Price: {flight.price.total} {flight.price.currency}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightSearch;
