import React, { useState } from 'react';
const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

const SearchBox = ({ onSearch }) => {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');    

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`);
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        setError(''); 
        onSearch(lat, lon,city);
      } else {
        setError('City not found. Please try another city!!');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('An error occurred. Please try again.');
    }
  };


return (
  <div style={{ maxWidth: '400px', margin: 'auto' }}>
    <div className="input-group mb-3">
      <input 
        type="text" 
        className="form-control" 
        value={city} 
        onChange={(e) => setCity(e.target.value)} 
        placeholder="Enter your city name to get started!" 
      />
      <div className="input-group-append">
        <button className="btn btn-primary" onClick={handleSearch}>Search</button>
      </div>
    </div>
    {error && <p style={{color:'yellow'}}>{error}</p>}
  </div>
);
};

export default SearchBox;
