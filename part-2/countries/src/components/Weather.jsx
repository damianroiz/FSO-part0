import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const apiKey = import.meta.env.VITE_REACT_APP_WEATHERSTACK_API_KEY;

const Weather = ({ country }) => {
  const [capitalWeather, setCapitalWeather] = useState({});

  useEffect(
    (country) => {
      // let params = new URLSearchParams({
      //   access_key: apiKey,
      //   query: "New York",
      //   units: "c",
      // });
      axios
        .get(
          `http://api.weatherstack.com/current?access_key=${apiKey}&query=${country}`
        )
        // .then((response) => console.log(response.json()))
        // .then((res) => `this is the response: ${console.log(res.data)}`)
        .then((response) => setCapitalWeather(response.data))
        .catch((error) => {
          console.log("Error fetching weather data:", error);
        });
    },
    [country]
  );

  return (
    <div>
      <h2>Weather in {capitalWeather.current?.capital}</h2>
      <p>Temperature: {capitalWeather.current?.temperature} celcius</p>
      <img
        src={capitalWeather.current?.weather_icons[0]}
        alt={capitalWeather.current?.weather_descriptions[0]}
      />
      <span>
        <b>wind:</b> {capitalWeather.current?.wind_speed} mph direction{" "}
        {capitalWeather.current?.wind_dir}
      </span>
    </div>
  );
};

export default Weather;

// const http = 'http://api.weatherstack.com/current?access_key=9895885556ef0f1e8c4265594838d631&query=canada'
