import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Navbar.css";

gsap.registerPlugin(ScrollTrigger);

const OPENWEATHER_KEY = process.env.REACT_APP_OWM_KEY;

export default function NavBar() {
  const [weather, setWeather] = useState(null);
  const redRef = useRef();
  const fishRef = useRef();
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

  const handleLogoHover = () => {
    if (!redRef.current || !fishRef.current || !fRef.current) return;
    gsap.to([redRef.current, fishRef.current], {
      width: 0,
      autoAlpha: 0,
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(fRef.current, {
      autoAlpha: 1,
      x: 0,
      duration: 0.4,
      ease: "power2.out",
      delay: 0.2,
    });
  };

  const handleLogoLeave = () => {
    if (!redRef.current || !fishRef.current || !fRef.current) return;
    gsap.to(fRef.current, {
      autoAlpha: 0,
      x: -5,
      duration: 0.3,
      ease: "power2.in",
    });
    gsap.to([redRef.current, fishRef.current], {
      width: "auto",
      autoAlpha: 1,
      duration: 0.4,
      ease: "power2.in",
      delay: 0.1,
    });
  };

  return (
    <nav className="navbar fixed-top bg-transparent px-4">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Logo */}
        <a
          href="/"
          className="nav-logo text-white text-decoration-none d-flex align-items-center"
          onMouseEnter={handleLogoHover}
          onMouseLeave={handleLogoLeave}
        >
          <span className="letter-r">R</span>
          <span ref={redRef} className="rest-red">
            ed
          </span>
          <span className="letter-f">F</span>
          <span ref={fishRef} className="rest-fish">
            ish
          </span>
          <span ref={fRef} className="rf-f">
            F
          </span>
        </a>

        {/* Nav links */}
        <div className="flex-grow-1 d-flex justify-content-center">
          <ul className="d-flex flex-row gap-5 mb-0 list-unstyled">
            {["Work", "Method", "About", "Contact"].map((label, i) => (
              <li key={label} className="position-relative">
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
          <div className="weather-info text-white d-flex align-items-center gap-2">
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
