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
  const [menuOpen, setMenuOpen] = useState(false);
  const arrowRefs = useRef([]);
  const mobileMenuRef = useRef(null);

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

  useEffect(() => {
    if (menuOpen && mobileMenuRef.current) {
      // Animate the mobile menu container
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      );

      // Animate each arrow
      arrowRefs.current.forEach((arrow, i) => {
        gsap.fromTo(
          arrow,
          { x: "-100%", opacity: 0 },
          {
            x: "0%",
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.2 + i * 0.1, // stagger effect
          }
        );
      });
    }
  }, [menuOpen]);

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
          className="btn btn-link text-white d-lg-none"
          onClick={() => setMenuOpen(true)}
        >
          Menu
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

        {menuOpen && (
          <div
            ref={mobileMenuRef}
            className="mobile-menu d-flex flex-column text-white"
          >
            <div className="d-flex justify-content-between align-items-center px-4 pt-3">
              <div className="weather-info text-white align-items-center gap-2">
                <img
                  src={`http://openweathermap.org/img/wn/${weather.icon}.png`}
                  alt={weather.desc}
                />
                <span>{weather.temp}°F</span>
              </div>
              <button
                className="btn text-white fs-5"
                onClick={() => setMenuOpen(false)}
              >
                CLOSE
              </button>
            </div>

            <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-start px-4">
              <div className="display-1 fw-bold mb-5">
                <a
                  href="/"
                  className="nav-logo text-white text-decoration-none d-flex align-items-center"
                >
                  <img
                    src="/images/redfish-logo.png"
                    alt="RedFish Logo"
                    height="80"
                  />
                </a>
              </div>
              {["Work", "Method", "About", "Contact"].map((label, i) => (
                <a
                  key={label}
                  href={`#${label.toLowerCase()}`}
                  className="fs-1 mb-4 d-flex justify-content-between w-100 border-bottom"
                  onClick={() => setMenuOpen(false)}
                >
                  <span>{label}</span>
                  <span
                    ref={(el) => (arrowRefs.current[i] = el)}
                    className="arrow-slide"
                  >
                    →
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
