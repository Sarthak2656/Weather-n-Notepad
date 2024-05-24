import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import WeatherCards from './components/WeatherCards';
import TemperatureBarChart from './components/TemperatureChart';
import NotePad from './components/Notepad';
import SearchBox from './components/CitySearch';
import './App.css';

const App = () => {
  const [LAT, setLat] = useState(51.5074);
  const [LON, setLon] = useState(-0.1278);
  const [cityName, setCityName] = useState('London');

  const handleSearch = (lat, lon, city) => {
    console.log("Received weather data:", { lat, lon, city });
    setLat(lat);
    setLon(lon);
    setCityName(city);
  };

  const [weatherData, setWeatherData] = useState([
    { title: 'Average Temp of Week-', value: 'Loading...' },
    { title: 'Average Rainfall of Week-', value: 'Loading...' },
    { title: 'Average Humidity of Week-', value: 'Loading...' },
    { title: 'Current Temperature-', value: 'Loading...' },
  ]);

  const [temperatureData, setTemperatureData] = useState([
    { day: 'Day 1', temp: 0 },
    { day: 'Day 2', temp: 0 },
    { day: 'Day 3', temp: 0 },
    { day: 'Day 4', temp: 0 },
    { day: 'Day 5', temp: 0 },
  ]);

  useEffect(() => {
    if (LAT !== null && LON !== null) {
      const fetchWeatherData = async () => {
        const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
        const URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`;

        try {
          const response = await fetch(URL);
          const data = await response.json();
          const avgTemp = (data.list.reduce((acc, item) => acc + item.main.temp, 0) / data.list.length).toFixed(1);
          const avgHumidity = (data.list.reduce((acc, item) => acc + item.main.humidity, 0) / data.list.length).toFixed(1);
          const currentTemp = data.list[0].main.temp.toFixed(1);
          const avgRainfall = (data.list.reduce((acc, item) => acc + (item.rain ? item.rain['3h'] : 0), 0) / data.list.length).toFixed(1);

          const nextFiveDays = data.list.slice(0, 40).reduce((acc, item, index) => {
            const dayIndex = Math.floor(index / 8);
            acc[dayIndex] = acc[dayIndex] || { count: 0, totalTemp: 0 };
            acc[dayIndex].count += 1;
            acc[dayIndex].totalTemp += item.main.temp;
            return acc;
          }, []).map((day, index) => ({
            day: `Day ${index + 1}`,
            temp: (day.totalTemp / day.count).toFixed(1),
          }));

          setWeatherData([
            { title: 'Average Temp of Week-', value: `${avgTemp}°C` },
            { title: 'Average Rainfall of Week-', value: `${avgRainfall}mm` },
            { title: 'Average Humidity of Week-', value: `${avgHumidity}%` },
            { title: 'Current Temperature-', value: `${currentTemp}°C` },
          ]);

          setTemperatureData(nextFiveDays);
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      };

      fetchWeatherData();
    }
  }, [LAT, LON]);

  const [weatherCardsRef, weatherCardsInView] = useInView({ threshold: 0.1 });
  const [temperatureChartRef, temperatureChartInView] = useInView({ threshold: 0.1 });
  const [notepadRef, notepadInView] = useInView({ threshold: 0.1 });

  return (
    <div className="App">
      <br />
      <h1 style={{ color: 'white' }}>Weather Dashboard</h1>
      <br />
      <SearchBox onSearch={handleSearch} />
      <br />
      <h3 style={{ color: 'white', marginLeft: '2%' }}>Weather data for: <i>{cityName.toUpperCase()}</i></h3>
      <br />

      <motion.div
        ref={weatherCardsRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: weatherCardsInView ? 1 : 0, y: weatherCardsInView ? 0 : 20 }}
        transition={{ duration: 2.0 }}
      >
        <WeatherCards data={weatherData} />
      </motion.div>

      <br />

      <motion.div
        ref={temperatureChartRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: temperatureChartInView ? 1 : 0, y: temperatureChartInView ? 0 : 20 }}
        transition={{ duration: 2.0 }}
      >
        <TemperatureBarChart data={temperatureData} />
      </motion.div>

      <br /><br />

      <motion.div
        className="notepad-container"
        ref={notepadRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: notepadInView ? 1 : 0, y: notepadInView ? 0 : 20 }}
        transition={{ duration: 2.0 }}
        style={{ background: '#E2DFD0' }}
      >
        <h1>Notepad</h1>
        <NotePad />
      </motion.div>
    </div>
  );
};

export default App;

