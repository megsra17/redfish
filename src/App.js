import React, { useEffect, useState } from "react";
import { ReactLenis } from "lenis/react";
import AnimatedPanels from "./AnimatedPanels";
import "./App.css"; // Make sure this includes your loader styles

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const loader = document.querySelector(".loading-screen");
      if (loader) loader.classList.add("fade-out");

      setTimeout(() => {
        setLoading(false);
      }, 800); // Match fade-out duration
    }, 1500); // Wait before fading out

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
        <ReactLenis root options={{ duration: 1.2, smooth: true }}>
          <AnimatedPanels />
        </ReactLenis>
      )}
    </>
  );
}
