"use client";
import React, { useState } from "react";
import axios from "axios";
const Home = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=16c0818a13305cfeafe1a8736c436201&units=metric`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };
  return (
    <div className=" relative w-[100%] h-[100vh] text-zinc-950  bg-cover bg-[url('../public/picture.jpg')]  bg-bottom ">
      <div className=" text-center py-4">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder="Enter Location"
          className="p-2 bg-white/50 rounded-3xl w-2/3 text-zinc-950 placeholder-zinc-950"
          type="text"
        />
      </div>
      <div className="max-w-[700px] h-[600px] mx-auto px-1 justify-between  flex flex-col relative ">
        <div className=" w-[100%] m-auto ">
          <div>
            <p className=" font-semibold ">{data.name}</p>
          </div>
          <div>
            {data.main ? (
              <h1 className=" font-bold ">{data.main?.temp.toFixed()} °C</h1>
            ) : null}
          </div>
          <div className="relative  right-[-90%] rotate-[269deg]  transform origin-top-left ">
            {data.weather ? (
              <p className=" font-semibold">{data.weather[0]?.main}</p>
            ) : null}
          </div>
        </div>
        {data.name != undefined && (
          <div className=" flex justify-evenly text-center w-[100%]  m-auto p-4 bg-white/30 rounded-xl  ">
            <div>
              {data.main ? (
                <p className=" font-bold">
                  {data.main.feels_like.toFixed()} °C
                </p>
              ) : null}
              <p>Feel like</p>
            </div>
            <div>
              {data.main ? (
                <p className=" font-bold">{data.main.humidity} %</p>
              ) : null}
              <p>Humidity</p>
            </div>
            <div>
              {data.wind ? (
                <p className=" font-bold">{data.wind.speed.toFixed()} kph</p>
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
