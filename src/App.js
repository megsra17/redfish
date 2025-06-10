// src/App.js
import React, { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";
import "./App.css";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function App() {
  // 1) get the Lenis instance
  const lenis = useLenis();

  // 2) drive GSAP’s ScrollTrigger off of Lenis’s RAF
  useEffect(() => {
    if (!lenis) return;
    const tick = (time) => {
      lenis.raf(time);
      ScrollTrigger.update();
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, [lenis]);

  // 3) set up your ScrollSmoother/ScrollTrigger panels
  useEffect(() => {
    const smoother = ScrollSmoother.create({
      wrapper: ".smooth-wrapper",
      content: ".smooth-content",
      smooth: 1.2,
      effects: true,
    });

    document.querySelectorAll(".panel").forEach((panel) => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: panel,
            start: "top top",
            end: "bottom top",
            scrub: true,
            pin: true,
          },
        })
        .to(panel, { "--zoom": 1.1, duration: 1 })
        .from(
          panel.querySelector(".panel-content"),
          {
            y: 50,
            opacity: 0,
            duration: 0.6,
          },
          0
        );
    });

    return () => {
      smoother.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <ReactLenis root options={{ duration: 1.2, smooth: true }}>
      <div className="smooth-wrapper">
        <div className="smooth-content">
          {["1015", "1016", "1018", "1020"].map((id, i) => (
            <section
              key={i}
              className="panel"
              style={{
                "--bg": `url('https://picsum.photos/id/${id}/1200/800')`,
              }}
              data-speed={1 - i * 0.2}
            >
              <div className="panel-content">
                <h2>Slide {i + 1}</h2>
                <p>Some text for panel {i + 1}.</p>
              </div>
            </section>
          ))}
        </div>
      </div>
    </ReactLenis>
  );
}
