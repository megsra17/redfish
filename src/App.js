import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

const bgImages = [
  "url('https://picsum.photos/id/1015/1200/800')",
  "url('https://picsum.photos/id/1016/1200/800')",
  "url('https://picsum.photos/id/1018/1200/800')",
  "url('https://picsum.photos/id/1020/1200/800')",
];

export default function App() {
  const containerRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    // Preload images
    bgImages.forEach((img) => {
      const preloadImg = new Image();
      preloadImg.src = img.replace(/url\(['"]?/, "").replace(/['"]?\)/, "");
    });

    const panels = gsap.utils.toArray(".panel");

    const setBackgroundImage = (index) => {
      gsap.to(bgRef.current, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          bgRef.current.style.backgroundImage = bgImages[index];
          gsap.to(bgRef.current, {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          });
        },
      });
    };

    panels.forEach((panel, i) => {
      // Background zoom
      gsap.to(bgRef.current, {
        scale: 1.1,
        scrollTrigger: {
          trigger: panel,
          start: "top center",
          end: "bottom center",
          scrub: 0.3,
        },
      });

      // Background switch
      ScrollTrigger.create({
        trigger: panel,
        start: "top center",
        onEnter: () => setBackgroundImage(i),
        onEnterBack: () => setBackgroundImage(i),
      });

      // Rotate panel content in
      const content = panel.querySelector(".panel-content");
      gsap.fromTo(
        content,
        { rotateY: 90, opacity: 0 },
        {
          rotateY: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: panel,
            start: "top 75%",
            toggleActions: "play none none reverse",
            onEnter: () => console.log("rotate triggered for panel", i),
          },
        }
      );
    });
  }, []);

  return (
    <div className="scroll-container" ref={containerRef}>
      <div className="background" ref={bgRef}></div>

      <section className="panel">
        <div className="panel-content">Panel 1</div>
      </section>
      <section className="panel">
        <div className="panel-content">Panel 2</div>
      </section>
      <section className="panel">
        <div className="panel-content">Panel 3</div>
      </section>
      <section className="panel">
        <div className="panel-content">Panel 4</div>
      </section>
    </div>
  );
}
