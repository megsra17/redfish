import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Navbar.css";

gsap.registerPlugin(ScrollTrigger);

const OPENWEATHER_KEY = process.env.REACT_APP_OWM_KEY;

export default function NavBar() {
  const [weather, setWeather] = useState(null);
  const fRef = useRef();
  const linkRefs = useRef([]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${OPENWEATHER_KEY}`
        )
          .then((res) => res.json())
          .then((data) => {
            setWeather({
              temp: Math.round(data.main.temp),
              desc: data.weather[0].main,
              icon: data.weather[0].icon,
              city: data.name,
            });
          })
          .catch(console.error);
      });
    }
  }, []);

  useEffect(() => {
    gsap.set(fRef.current, { autoAlpha: 0, x: -5 });
  }, []);

  useEffect(() => {
    linkRefs.current.forEach((el) => {
      const underline = el.querySelector(".underline");

      el.addEventListener("mouseenter", () => {
        gsap.to(underline, {
          scaleX: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      el.addEventListener("mouseleave", () => {
        gsap.to(underline, {
          scaleX: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      });
    });
  }, []);

  return (
    <nav className="navbar navbar-expand-lg fixed-top bg-transparent px-4">
      <div className="container-fluid">
        {/* Logo */}
        <a
          href="/"
          className="nav-logo text-white text-decoration-none d-flex align-items-center"
        >
          <img src="/images/redfish-logo.png" alt="RedFish Logo" height="40" />
        </a>

        {/* Toggler for mobile */}
        <button
          className="navbar-toggler text-white border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Collapsible content */}
        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarNav"
        >
          <ul className="navbar-nav d-flex flex-lg-row flex-column gap-lg-5 gap-3 mb-0 align-items-center">
            {["Work", "Method", "About", "Contact"].map((label, i) => (
              <li key={label} className="nav-item position-relative">
                <a
                  className="nav-link text-white d-inline-block nav-animated-link"
                  href={`#${label.toLowerCase()}`}
                  ref={(el) => (linkRefs.current[i] = el)}
                >
                  {label}
                  <span className="underline" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Weather */}
        {!weather ? (
          <div className="weather-info text-white">Loading weather...</div>
        ) : (
          <div className="weather-info text-white d-none d-lg-flex align-items-center gap-2">
            <img
              src={`http://openweathermap.org/img/wn/${weather.icon}.png`}
              alt={weather.desc}
            />
            <span>{weather.temp}°F</span>
          </div>
        )}
      </div>
    </nav>
  );
}
