import React from 'react';
import './WeatherCards.css';

const WeatherCards = ({ data }) => {
  return (
    <div className="weather-cards" >
      {data.map((item, index) => (
        <div key={index} className="card" style={{background:'#EEE4B1'}}>
          <h3>{item.title}</h3><br></br>
          <p class="increased-font-size">{item.value}</p>

        </div>
      ))}
    </div>
  );
};

export default WeatherCards;



