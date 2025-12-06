import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Proxy route to fetch weather data from OpenMeteo
app.get('/api/weather', async (req, res) => {
    try {
        const { lat, lon } = req.query;

        if (!lat || !lon) {
            return res.status(400).json({ error: 'Latitude and Longitude are required' });
        }

        // Fetch current weather and basic daily forecast
        const response = await axios.get(`https://api.open-meteo.com/v1/forecast`, {
            params: {
                latitude: lat,
                longitude: lon,
                current_weather: true,
                hourly: 'temperature_2m,relativehumidity_2m,windspeed_10m',
                daily: 'weathercode,temperature_2m_max,temperature_2m_min',
                timezone: 'auto'
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

app.get('/api/geocode', async (req, res) => {
    try {
        const { city } = req.query;
        if (!city) {
            return res.status(400).json({ error: 'City name is required' });
        }
        const response = await axios.get(`https://geocoding-api.open-meteo.com/v1/search`, {
            params: { name: city, count: 1, language: 'en', format: 'json' }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching geocoding data:', error.message);
        res.status(500).json({ error: 'Failed to fetch location data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
