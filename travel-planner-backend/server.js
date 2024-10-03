const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let accessToken = "";
let tokenExpiry = null;

// Function to get a new access token
const getAccessToken = async () => {
  const url = "https://test.api.amadeus.com/v1/security/oauth2/token";
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");
  params.append("client_id", process.env.AMADEUS_CLIENT_ID);
  params.append("client_secret", process.env.AMADEUS_CLIENT_SECRET);

  try {
    const response = await axios.post(url, params);
    accessToken = response.data.access_token;
    tokenExpiry = Date.now() + response.data.expires_in * 1000;
    console.log("Access token obtained");
  } catch (error) {
    console.error(
      "Error obtaining access token:",
      error.response ? error.response.data : error.message
    );
  }
};

// Middleware to ensure a valid access token
const ensureAccessToken = async (req, res, next) => {
  if (!accessToken || Date.now() >= tokenExpiry) {
    try {
      await getAccessToken();
    } catch (err) {
      return res.status(500).json({ error: "Failed to obtain access token" });
    }
  }
  next();
};

// Endpoint to search for flights
app.get("/api/flights", ensureAccessToken, async (req, res) => {
  const { origin, destination, departureDate } = req.query;

  if (!origin || !destination || !departureDate) {
    return res
      .status(400)
      .json({ error: "Origin, destination, and departureDate are required" });
  }

  const url = "https://test.api.amadeus.com/v2/shopping/flight-offers";

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        originLocationCode: origin,
        destinationLocationCode: destination,
        departureDate: departureDate,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error(
      "Error fetching flight data:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: "Failed to fetch flight data" });
  }
});

// Endpoint to search for hotels
app.get("/api/hotels", ensureAccessToken, async (req, res) => {
  const { cityCode } = req.query;

  if (!cityCode) {
    return res.status(400).json({ error: "City code is required" });
  }

  const url =
    "https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city";

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        cityCode: cityCode,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error(
      "Error fetching hotel data:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: "Failed to fetch hotel data" });
  }
});

// Endpoint to search for destinations using TripAdvisor API
app.get("/api/destinations", ensureAccessToken, async (req, res) => {
  const { location } = req.query;

  if (!location) {
    return res.status(400).json({ error: "Location is required" });
  }

  const url = `https://api.tripadvisor.com/api/v2.0/location/search`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${TRIPADVISOR_API_KEY}`,
      },
      params: {
        query: location,
        limit: 20,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error(
      "Error fetching destination data:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: "Failed to fetch destination data" });
  }
});

// Start the server and get the initial access token
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  getAccessToken();
});
