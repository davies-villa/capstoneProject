// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let accessToken = '';
let tokenExpiry = null;

// Function to get a new access token
const getAccessToken = async () => {
  const url = 'https://test.api.amadeus.com/v1/security/oauth2/token';
  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  params.append('client_id', process.env.AMADEUS_CLIENT_ID);
  params.append('client_secret', process.env.AMADEUS_CLIENT_SECRET);

  try {
    const response = await axios.post(url, params);
    accessToken = response.data.access_token;
    // Token expires in response.data.expires_in seconds
    tokenExpiry = Date.now() + response.data.expires_in * 1000;
    console.log('Access token obtained');
  } catch (error) {
    console.error('Error obtaining access token:', error.response ? error.response.data : error.message);
  }
};

// Middleware to ensure a valid access token
const ensureAccessToken = async (req, res, next) => {
  if (!accessToken || Date.now() >= tokenExpiry) {
    await getAccessToken();
  }
  next();
};

// Flight search endpoint
app.get('/api/flights', ensureAccessToken, async (req, res) => {
  const { origin, destination, departureDate } = req.query;

  const url = 'https://test.api.amadeus.com/v2/shopping/flight-offers';

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        originLocationCode: origin,
        destinationLocationCode: destination,
        departureDate: departureDate,
        adults: 1,
        // Add other parameters as needed
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching flight data:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to fetch flight data' });
  }
});

// **Hotel search endpoint**
app.get('/api/hotels', ensureAccessToken, async (req, res) => {
  const { cityCode, checkInDate, checkOutDate, adults } = req.query;

  const url = 'https://test.api.amadeus.com/v3/shopping/hotel-offers';

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        cityCode: cityCode,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        adults: adults || 1,
        // Add other parameters as needed
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching hotel data:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to fetch hotel data' });
  }
});

// Catch-all route for undefined endpoints
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start the server and get the initial access token
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  getAccessToken();
});
