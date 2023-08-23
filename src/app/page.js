"use client";
import { useState } from "react";
import axios from "axios";
import "./globals.css";

const Home = () => {
  const [temp, setTemp] = useState("°C");
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const getWeatherData = (unit) => {
    setLoading(true);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=16c0818a13305cfeafe1a8736c436201&units=${unit}`;

    axios
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      getWeatherData(temp === "°C" ? "metric" : "imperial");
    }
  };

  const handleTempUnitToggle = () => {
    const unit = temp === "°C" ? "imperial" : "metric";
    setTemp(temp === "°C" ? "°F" : "°C");
    getWeatherData(unit);
  };

  return (
    <div className="relative w-[100%] h-[100%] sm:h-screen text-zinc-950  bg-cover bg-[url('/picture.jpg')]  bg-bottom ">
      <div className="text-center py-4 flex flex-row justify-evenly">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder="Enter Location"
          className="p-2 bg-white/50 rounded-3xl w-2/3 text-zinc-950 placeholder-zinc-950"
          type="text"
        />{" "}
        <div className="">
          <button
            className="bg-white/50 hover:bg-white/80  text-zinc-950 font-bold py-2 px-4 rounded-md"
            onClick={handleTempUnitToggle}
          >
            {temp}
          </button>
        </div>
      </div>

      <div className="max-w-[700px] h-[700px] mx-auto px-1 justify-between flex flex-col relative">
        <div className="w-[100%] m-auto">
          <div>
            <p className="font-semibold sm:text-4xl">{data.name}</p>
          </div>
          <div>
            {loading ? (
              <div className="loader "></div>
            ) : data.main ? (
              <h1 className="font-bold text-8xl md:text-12xl">
                {data.main?.temp.toFixed()}
                {temp === "°C" ? "°C" : "°F"}
              </h1>
            ) : null}
          </div>
          <div className="relative right-[-90%] rotate-[269deg] transform origin-top-left">
            {data.weather ? (
              <p className="font-semibold">{data.weather[0]?.main}</p>
            ) : null}
          </div>
        </div>
        {data.name != undefined && !loading && (
          <div className="flex justify-evenly text-center w-[100%] m-auto p-4 bg-white/30 rounded-xl">
            <div>
              {data.main ? (
                <p className="font-bold ">
                  {data.main.feels_like.toFixed()}
                  {temp === "°C" ? "°C" : "°F"}
                </p>
              ) : null}
              <p>Feel like</p>
            </div>
            <div>
              {data.main ? (
                <p className="font-bold">{data.main.humidity}%</p>
              ) : null}
              <p>Humidity</p>
            </div>
            <div>
              {data.wind ? (
                <p className="font-bold">
                  {data.wind.speed.toFixed()}
                  {temp === "°C" ? "kph" : "mph"}
                </p>
              ) : null}
              <p>Winds</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
