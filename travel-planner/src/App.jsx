import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DestinationsPage from "./pages/DesinationsPage";
import ActivitiesPage from "./pages/ActivitiesPage";
import FlightSearch from "./pages/FlightSearch";
import HotelSearch from "./pages/HotelSearch";
import SignUp from "./components/Signup";
import Login from "./components/Login";
import SearchResults from "./components/SearchResults";
import ItineraryDetails from "./components/ItineraryDetails";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinationspage" element={<DestinationsPage />} />
          <Route path="/activitiespage" element={<ActivitiesPage />} />
          <Route path="/flightsearch" element={<FlightSearch />} />
          <Route path="/hotelsearch" element={<HotelSearch />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/results" element={<SearchResults />} />
          <Route path="/itinerarydetails" element={<ItineraryDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
