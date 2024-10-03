// src/components/SearchForm.jsx

import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import 'react-date-range/dist/styles.css'; // Main style file for react-date-range
import 'react-date-range/dist/theme/default.css'; // Theme css file for react-date-range
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchForm = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });
  const [showCalendar, setShowCalendar] = useState(false);
  const [guests, setGuests] = useState(1);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setDestination(value);

    // Make API call to Trip Advisor for location search
    if (value) {
      axios.get(`/api/locations?query=${value}`) // Adjust this to your endpoint
        .then(response => {
          const filtered = response.data.results.map(city => ({ name: city.name })); // Adapt according to API response structure
          setFilteredCities(filtered.slice(0, 20)); // Limit to 20 results
        })
        .catch(err => {
          console.error("Error fetching locations:", err);
        });
    } else {
      setFilteredCities([]);
    }
  };

  const handleSelectCity = (city) => {
    setDestination(city.name);
    setFilteredCities([]); // Clear the dropdown after selection
  };

  const handleSelect = (ranges) => {
    setSelectionRange(ranges.selection);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleGuestsChange = (e) => {
    setGuests(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to ResultsPage and pass the selected destination, guests, and dates as state
    navigate('/search-results', {
      state: {
        location: destination,
        guests: guests,
        startDate: format(selectionRange.startDate, 'MM/dd/yyyy'),
        endDate: format(selectionRange.endDate, 'MM/dd/yyyy'),
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#D9B189] p-6 rounded flex justify-center items-center flex-wrap lg:flex-nowrap gap-4 mt-4">
      {/* Destination Input */}
      <div className="relative w-full lg:w-1/3">
        <h3 className="text-white text-sm mb-2">Where to?</h3>
        <div className="relative">
          <input
            type="text"
            value={destination}
            onChange={handleSearchChange}
            className="w-full border p-2 rounded"
            placeholder="Search for destinations..."
          />
        </div>
        {filteredCities.length > 0 && (
          <ul className="absolute bg-white border w-full rounded shadow-lg z-10 mt-1 max-h-40 overflow-y-auto">
            {filteredCities.map((city, index) => (
              <li
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelectCity(city)}
              >
                {city.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Date Range Input */}
      <div className="relative w-full lg:w-1/3">
        <h3 className="text-white text-sm mb-2">Date Range</h3>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={`${format(selectionRange.startDate, 'MM/dd/yyyy')} - ${format(selectionRange.endDate, 'MM/dd/yyyy')}`}
          readOnly
          onClick={toggleCalendar}
        />
        {showCalendar && (
          <div className="absolute z-10 bg-white border p-2 rounded shadow-lg mt-2 w-full max-w-[90vw] max-h-[80vh] overflow-auto">
            <DateRange
              ranges={[selectionRange]}
              onChange={handleSelect}
              className="w-full"
            />
          </div>
        )}
      </div>

      {/* Guests Input */}
      <div className="relative w-full sm:mb-2 lg:w-1/3">
        <h3 className="text-white text-sm mb-2">Guests</h3>
        <select
          value={guests}
          onChange={handleGuestsChange}
          className="w-full border p-2 rounded"
        >
          {[1, 2, 3, 4, 5, 6].map(num => (
            <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
          ))}
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-custom-brown text-white px-4 py-2 rounded hover:bg-brown-dark transition duration-200 w-full lg:w-auto"
      >
        Search
      </button>
    </form>
  );
}

export default SearchForm;
