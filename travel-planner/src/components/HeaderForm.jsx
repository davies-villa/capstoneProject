// src/components/SearchForm.jsx

import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import 'react-date-range/dist/styles.css'; // Main style file for react-date-range
import 'react-date-range/dist/theme/default.css'; // Theme css file for react-date-range
import { useNavigate } from 'react-router-dom';

const destinations = [
  { name: 'Paris, France' },
  { name: 'Cape Town, South Africa' },
  { name: 'Cairo, Egypt' },
  { name: 'Marrakech, Morocco' },
  { name: 'Nairobi, Kenya' },
  { name: 'Johannesburg, South Africa' },
  { name: 'Lagos, Nigeria' },
  { name: 'Addis Ababa, Ethiopia' },
  { name: 'Accra, Ghana' },
  { name: 'Casablanca, Morocco' },
  { name: 'Victoria Falls, Zimbabwe' },
  { name: 'Tunis, Tunisia' },
  { name: 'Dakar, Senegal' },
  { name: 'Zanzibar, Tanzania' },
  { name: 'Windhoek, Namibia' },
  { name: 'Gaborone, Botswana' },
  { name: 'Seychelles, Seychelles' },
  { name: 'Mauritius, Mauritius' },
  { name: 'Kampala, Uganda' },
  { name: 'Lusaka, Zambia' },
];

function SearchForm() {
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

    if (value) {
      const filtered = destinations.filter((city) =>
        city.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCities(filtered.slice(0, 20)); // Limit to 20 results
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
    navigate('/results', {
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
            className="w-full border p-2 rounded " // Added padding-left to make space for the icon
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
  className="bg-custom-brown text-white px-4 py-8 sm:py-6 rounded hover:bg-brown-dark transition duration-200 w-full lg:w-auto h-[20px] sm:h-[40px] flex justify-center items-center"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-6 w-6 mr-2" // Adjust size as needed
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
    />
  </svg>
  Search
</button>
    </form>
  );
}

export default SearchForm;
