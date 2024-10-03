import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ItineraryDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { itinerary } = location.state;

  // Sample data for activities based on the city
  const activitiesByCity = {
    Nairobi: [
      'Visit the Giraffe Centre',
      'Explore the Nairobi National Park',
      'Discover the David Sheldrick Wildlife Trust',
    ],
    MaasaiMara: [
      'Go on a game drive',
      'Hot air balloon ride over the savannah',
      'Visit a Maasai village',
    ],
    // Add more cities and their activities as needed
  };

  const selectedCity = 'Nairobi'; // Replace with itinerary.city if available

  const initialDailyActivities = [
    {
      day: 1,
      activities: ['Arrive in Nairobi and visit the Giraffe Centre.'],
      isEditing: false,
      selectedActivity: '',
    },
    {
      day: 2,
      activities: ['Drive to Maasai Mara for game viewing.'],
      isEditing: false,
      selectedActivity: '',
    },
    // ... add more days as needed
  ];

  const [dailyActivities, setDailyActivities] = useState(initialDailyActivities);
  const [selectedDay, setSelectedDay] = useState(dailyActivities[0].day); // Track the selected day

  // Handle adding a new activity
  const handleAddActivity = (index) => {
    setDailyActivities((prevActivities) =>
      prevActivities.map((activity, i) =>
        i === index
          ? { ...activity, activities: [...activity.activities, ''], isEditing: true }
          : activity
      )
    );
  };

  // Handle removing an activity
  const handleRemoveActivity = (dayIndex, activityIndex) => {
    setDailyActivities((prevActivities) => {
      const updatedActivities = prevActivities.map((day, i) => {
        if (i === dayIndex) {
          return { ...day, activities: day.activities.filter((_, idx) => idx !== activityIndex) };
        }
        return day;
      });
      return updatedActivities;
    });
  };

  // Handle selecting a day
  const handleSelectDay = (day) => {
    setSelectedDay(day);
  };

  // Handle updating the selected activity for the day
  const handleSelectActivity = (dayIndex, activityIndex, selectedActivity) => {
    setDailyActivities((prevActivities) => {
      const updatedActivities = prevActivities.map((day, i) => {
        if (i === dayIndex) {
          const updatedDayActivities = day.activities.map((activity, idx) =>
            idx === activityIndex ? selectedActivity : activity
          );
          return { ...day, activities: updatedDayActivities };
        }
        return day;
      });
      return updatedActivities;
    });
  };

  // Handle saving the activity and exiting edit mode
  const handleSaveActivity = (index) => {
    setDailyActivities((prevActivities) =>
      prevActivities.map((activity, i) =>
        i === index ? { ...activity, isEditing: false } : activity
      )
    );
  };

  return (
    <div className="p-6">
      {/* Back Button */}
      <button
        className="absolute top-4 right-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mb-4"
        onClick={() => navigate(-1)}
      >
        Back
      </button>

      {/* Breadcrumb Navigation */}
      <div className="mb-4">
        <span onClick={() => navigate('/')} className="cursor-pointer text-blue-500">Home</span> &gt; 
        <span onClick={() => navigate(-1)} className="cursor-pointer text-blue-500"> Search </span> &gt; 
        <span className="font-semibold">{itinerary.name}</span>
      </div>

      {/* Itinerary Name and Date */}
      <h2 className="text-2xl font-bold">{itinerary.name}</h2>
      <p className="text-gray-600">Dates: {itinerary.startDate} - {itinerary.endDate}</p>
      <p className="mt-2 text-gray-700">{itinerary.description}</p>

      {/* Day Selection */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Select Day</h3>
        <div className="flex space-x-4 mt-2">
          {dailyActivities.map((dayActivity, index) => (
            <button 
              key={index}
              className={`px-4 py-2 rounded ${selectedDay === dayActivity.day ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} 
              onClick={() => handleSelectDay(dayActivity.day)}
            >
              Day {dayActivity.day}
            </button>
          ))}
        </div>
      </div>

      {/* Day Breakdown */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Day {selectedDay} Activities</h3>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-4">
          {dailyActivities.map((dayActivity, dayIndex) => {
            if (dayActivity.day === selectedDay) {
              return (
                <div key={dayIndex} className="bg-white p-4 shadow-lg rounded-lg">
                  <h4 className="font-semibold">Activities</h4>
                  {dayActivity.activities.map((activity, activityIndex) => (
                    <div key={activityIndex} className="flex items-center justify-between mt-2">
                      <p>{activity}</p>
                      <button 
                        className="text-red-500 hover:text-red-600" 
                        onClick={() => handleRemoveActivity(dayIndex, activityIndex)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  <button 
                    className="text-blue-500 hover:text-blue-600 mt-2" 
                    onClick={() => handleAddActivity(dayIndex)}
                  >
                    Add Activity
                  </button>

                  {/* Show dropdown for adding a new activity */}
                  {dayActivity.isEditing && (
                    <div className="mt-4">
                      <select 
                        value={dayActivity.selectedActivity} 
                        onChange={(e) => handleSelectActivity(dayIndex, dayActivity.activities.length - 1, e.target.value)} 
                        className="border rounded p-2 mr-2"
                      >
                        <option value="">Select an activity</option>
                        {activitiesByCity[selectedCity].map((act, idx) => (
                          <option key={idx} value={act}>{act}</option>
                        ))}
                      </select>
                      <button 
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" 
                        onClick={() => handleSaveActivity(dayIndex)}
                      >
                        Save Activity
                      </button>
                    </div>
                  )}
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default ItineraryDetails;
