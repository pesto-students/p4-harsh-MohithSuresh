const express = require("express");
const axios = require("axios");
const { apiKey } = require("./config");

const app = express();

// ...Previous code...

// Define routes
app.get("/weather", async (req, res) => {
  try {
    const { cities, cityName, cityCode, page, pageSize } = req.query;

    if (!cities && !cityName && !cityCode) {
      return res
        .status(400)
        .json({ error: "Please provide cities, cityName, or cityCode" });
    }

    // Construct the API URL based on the query parameters
    let apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}`;
    if (cities) {
      apiUrl += `&q=${cities}`;
    } else if (cityName) {
      apiUrl += `&q=${cityName}`;
    } else if (cityCode) {
      apiUrl += `&q=${cityCode}`;
    }

    // Make the API request
    const response = await axios.get(apiUrl);

    // Apply pagination if provided
    let responseData = response.data;
    if (page && pageSize) {
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      responseData = responseData.slice(startIndex, endIndex);
    }

    res.json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/forecast", async (req, res) => {
  try {
    const { city, days } = req.query;

    if (!city || !days) {
      return res.status(400).json({ error: "Please provide city and days" });
    }

    // Make the API request to get detailed forecast
    const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=${days}`;
    const response = await axios.get(apiUrl);

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/filter", async (req, res) => {
  try {
    const { city, date, moment } = req.query;

    if (!city || !date || !moment) {
      return res
        .status(400)
        .json({ error: "Please provide city, date, and moment" });
    }

    // Make the API request to filter weather data
    const apiUrl = `https://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${city}&dt=${date}`;
    const response = await axios.get(apiUrl);

    // Check if response.data.hour is defined before filtering
    if (
      !response.data ||
      !response.data.hour ||
      !Array.isArray(response.data.hour)
    ) {
      return res
        .status(500)
        .json({
          error: "No weather data available for the specified parameters",
        });
    }

    // Filter the response based on the specific moment (time of day)
    const filteredData = response.data.hour.filter((hourData) => {
      const momentOfDay = new Date(hourData.time).getHours();

      if (moment === "morning") {
        return momentOfDay >= 6 && momentOfDay < 12;
      } else if (moment === "afternoon") {
        return momentOfDay >= 12 && momentOfDay < 18;
      } else if (moment === "evening") {
        return momentOfDay >= 18 && momentOfDay < 24;
      } else {
        return momentOfDay >= 0 && momentOfDay < 6; // Night time
      }
    });

    res.json(filteredData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/weather/:city", async (req, res) => {
  try {
    const { city } = req.params;

    if (!city) {
      return res.status(400).json({ error: "Please provide a city" });
    }

    // Make the API request to get current weather conditions
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    const response = await axios.get(apiUrl);

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
