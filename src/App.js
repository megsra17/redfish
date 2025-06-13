import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ReactLenis } from "lenis/react";
import "bootstrap/dist/css/bootstrap.min.css";
import AnimatedPanels from "./AnimatedPanels";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WorkPage from "./pages/WorkPage"; // Add your new pages here
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import "./App.css";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const loader = document.querySelector(".loading-screen");
      if (loader) loader.classList.add("fade-out");

      setTimeout(() => {
        setLoading(false);
      }, 800);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && (
        <div className="loading-screen">
          <img
            src="/images/redfish-logo.png"
            alt="Redfish Logo"
            className="loading-logo"
          />
        </div>
      )}

      {!loading && (
        <Router>
          <ReactLenis root options={{ duration: 1.2, smooth: true }}>
            <Navbar />
            <Routes>
              <Route path="/" element={<AnimatedPanels />} />
              <Route path="/work" element={<WorkPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              {/* Add more routes as needed */}
            </Routes>
            <Footer />
          </ReactLenis>
        </Router>
      )}
    </>
  );
}
