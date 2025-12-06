import { useState } from 'react';

const SearchBar = ({ onSearch, onLocation }) => {
    const [city, setCity] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city.trim()) {
            onSearch(city);
        }
    };

    return (
        <div className="search-container animate-fade-in" style={{ marginBottom: '2rem' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city name..."
                    className="glass"
                    style={{
                        padding: '0.8rem 1.5rem',
                        color: 'white',
                        outline: 'none',
                        flex: '1',
                        maxWidth: '300px',
                        fontSize: '1rem'
                    }}
                />
                <button
                    type="submit"
                    className="glass"
                    style={{
                        padding: '0.8rem 1.5rem',
                        cursor: 'pointer',
                        fontWeight: '600',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
                    onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
                >
                    Search
                </button>
                <button
                    type="button"
                    onClick={onLocation}
                    className="glass"
                    style={{
                        padding: '0.8rem 1.5rem',
                        cursor: 'pointer',
                        fontWeight: '600'
                    }}
                    onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
                    onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
                >
                    📍 Use My Location
                </button>
            </form>
        </div>
    );
};

export default SearchBar;
