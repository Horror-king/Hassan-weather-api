const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

const openWeatherApiKey = "ce5048473491559fe3db75ee1432b127"; // Replace with your OpenWeatherMap API key

app.use(cors()); // Enable CORS

app.get('/weather', async (req, res) => {
  const cityName = req.query.city;

  if (!cityName) {
    return res.status(400).json({ error: 'City parameter is required' });
  }

  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${openWeatherApiKey}&units=metric`);
    if (response.data.cod !== 200) {
      return res.status(404).json({ error: response.data.message });
    }

    return res.json(response.data);
  } catch (err) {
    const errorMessage = err.response?.data?.message || err.message || 'Unknown error';
    return res.status(500).json({ error: `An error occurred: ${errorMessage}` });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});