import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";

const OPENWEATHER_KEY = process.env.REACT_APP_OWM_KEY;

export default function NavBar() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${OPENWEATHER_KEY}`
        )
          .then((res) => res.json())
          .then((data) => {
            const w = {
              temp: Math.round(data.main.temp),
              desc: data.weather[0].main,
              icon: data.weather[0].icon,
              city: data.name,
            };
            setWeather(w);
          })
          .catch(console.error);
      });
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg fixed-top bg-transparent">
      <div className="container-fluid">
        <a className="navbar-brand text-white fw-bold" href="#">
          RedFish
        </a>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {["Work", "Method", "About", "Contact"].map((label) => (
              <li key={label} className="nav-item">
                <a
                  className="nav-link text-white"
                  href={`#${label.toLowerCase()}`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {weather && (
            <div className="d-flex align-items-center text-white">
              <img
                src={`http://openweathermap.org/img/wn/${weather.icon}.png`}
                alt={weather.desc}
                style={{ width: "32px", height: "32px", marginRight: "0.5rem" }}
              />
              <span>{weather.temp}°F</span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
