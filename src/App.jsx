import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [locationName, setLocationName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (lat, lon, name) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
      if (!response.ok) throw new Error('Failed to fetch weather');
      const data = await response.json();
      setWeatherData(data);
      setLocationName(name);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const geoRes = await fetch(`/api/geocode?city=${encodeURIComponent(city)}`);
      if (!geoRes.ok) throw new Error('Failed to find location');
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error('City not found');
      }

      const { latitude, longitude, name, country } = geoData.results[0];
      await fetchWeather(latitude, longitude, `${name}, ${country}`);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleLocationClick = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        // Ideally we would reverse geocode here to get the city name
        // For now we'll just say "Your Location" or try to fetch it if we had an API
        // OpenMeteo doesn't provide reverse geocoding in the same way easily without key sometimes?
        // Actually bigdatacloud or others are free. But let's just stick to "Your Location" or approx.
        // We can use the timezone from weather data as a hint maybe? 
        // Let's just pass "Your Location" for now.
        await fetchWeather(latitude, longitude, "Your Location");
      },
      (err) => {
        setError('Unable to retrieve your location');
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    // Initial load - try to get location or default to something?
    // Let's default to New York if no location
    // handleSearch('New York');
    // Or just wait for user interaction?
    // Let's load a default city.
    handleSearch('London');
  }, []);

  return (
    <div className="app-container">
      <h1 style={{ marginBottom: '2rem', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
        ☁️ Atmosphere
      </h1>

      <SearchBar onSearch={handleSearch} onLocation={handleLocationClick} />

      {error && (
        <div className="glass" style={{ padding: '1rem', color: '#ff6b6b', maxWidth: '400px', margin: '1rem auto' }}>
          {error}
        </div>
      )}

      {loading && (
        <div className="spinner" style={{ margin: '2rem' }}>
          <div style={{ fontSize: '2rem' }} className="animate-spin">🌀 Loading...</div>
        </div>
      )}

      {!loading && !error && weatherData && (
        <WeatherCard data={weatherData} locationName={locationName} />
      )}
    </div>
  );
}

export default App;
