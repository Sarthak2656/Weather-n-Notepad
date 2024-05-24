import React from 'react';

const WeatherCards = ({ data }) => {
  return (
    <div className="weather-cards" >
      {data.map((item, index) => (
        <div key={index} className="card" style={{background:'#EEE4B1'}}>
          <h4>{item.title}</h4><br></br>
          <p>{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default WeatherCards;



