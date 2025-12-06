import React from 'react';

const weatherCodeMap = {
    0: '☀️ Clear sky',
    1: '🌤️ Mainly clear',
    2: 'mw Part cloudy',
    3: '☁️ Overcast',
    45: '🌫️ Fog',
    48: '🌫️ Depositing rime fog',
    51: 'fz Drizzle: Light',
    53: 'fz Drizzle: Moderate',
    55: 'fz Drizzle: Dense',
    61: '🌧️ Rain: Slight',
    63: '🌧️ Rain: Moderate',
    65: '🌧️ Rain: Heavy',
    71: '❄️ Snow: Slight',
    73: '❄️ Snow: Moderate',
    75: '❄️ Snow: Heavy',
    95: '⛈️ Thunderstorm: Slight or moderate',
    96: '⛈️ Thunderstorm with slight hail',
    99: '⛈️ Thunderstorm with heavy hail'
};

const WeatherCard = ({ data, locationName }) => {
    if (!data) return null;

    const { current_weather, daily } = data;
    const weatherDescription = weatherCodeMap[current_weather.weathercode] || 'Unknown';

    return (
        <div className="glass animate-fade-in" style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto', textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div>
                    <h2 style={{ fontSize: '2rem', margin: 0 }}>{locationName || 'Unknown Location'}</h2>
                    <p style={{ margin: '0.5rem 0', opacity: 0.8 }}>{new Date().toLocaleDateString()}</p>
                </div>
                <div style={{ fontSize: '3rem' }}>
                    {weatherDescription.split(' ')[0]}
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '4rem', margin: 0, fontWeight: '700' }}>
                    {Math.round(current_weather.temperature)}°
                </h1>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.2rem' }}>{weatherDescription.substring(2)}</span>
                    <span style={{ opacity: 0.8 }}>Wind: {current_weather.windspeed} km/h</span>
                </div>
            </div>

            <div className="glass" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-around', background: 'rgba(0,0,0,0.1)' }}>
                <div style={{ textAlign: 'center' }}>
                    <p style={{ margin: 0, opacity: 0.7, fontSize: '0.9rem' }}>High</p>
                    <p style={{ margin: '0.5rem 0 0', fontWeight: 'bold' }}>{daily.temperature_2m_max[0]}°</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <p style={{ margin: 0, opacity: 0.7, fontSize: '0.9rem' }}>Low</p>
                    <p style={{ margin: '0.5rem 0 0', fontWeight: 'bold' }}>{daily.temperature_2m_min[0]}°</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <p style={{ margin: 0, opacity: 0.7, fontSize: '0.9rem' }}>Code</p>
                    <p style={{ margin: '0.5rem 0 0', fontWeight: 'bold' }}>{current_weather.weathercode}</p>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;
