const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Configure CORS to allow requests from your front-end
const corsOptions = {
  origin: 'http://localhost:5173', // Update if your front-end runs on a different origin
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// Endpoint to search for destinations using TripAdvisor API
app.get("/api/destinations", async (req, res) => {
  const { location } = req.query;

  if (!location) {
    return res.status(400).json({ error: "Location is required" });
  }

  // Replace with the correct TripAdvisor API endpoint
  const url = `https://api.tripadvisor.com/api/v2.0/location/search`; 

  try {
    console.log(`Fetching destinations for location: ${location}`);
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.TRIPADVISOR_API_KEY}`,
      },
      params: {
        query: location,
        limit: 20,
      },
    });

    console.log(`Received data:`, response.data);
    res.json(response.data);
  } catch (error) {
    console.error(
      "Error fetching destination data:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: "Failed to fetch destination data" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
