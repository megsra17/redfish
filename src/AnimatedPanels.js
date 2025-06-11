import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

const images = [
  "url('https://picsum.photos/id/1015/1200/800')",
  "url('https://picsum.photos/id/1016/1200/800')",
  "url('https://picsum.photos/id/1018/1200/800')",
  "url('https://picsum.photos/id/1020/1200/800')",
];

export default function AnimatedPanels() {
  const wrapperRef = useRef(null);
  const panelRef = useRef(null);
  const imageRefs = useRef([]);

  useLayoutEffect(() => {
    // 🌀 Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));

    // Build your image transition timeline
    const scrollLength = (images.length - 1) * window.innerHeight;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: `+=${scrollLength}`,
        scrub: true,
        pin: panelRef.current,
        invalidateOnRefresh: true,
      },
    });

    images.forEach((_, i) => {
      if (i === 0) {
        gsap.set(imageRefs.current[i], {
          zIndex: 0,
          opacity: 1,
          scale: 1,
          rotate: 0,
        });
      } else {
        gsap.set(imageRefs.current[i], {
          zIndex: i,
          opacity: 0,
          scale: 1,
          rotate: -45,
        });
        tl.to(imageRefs.current[i - 1], { scale: 1.1, duration: 0.5 });
        tl.to(
          imageRefs.current[i],
          { opacity: 1, rotate: 0, duration: 0.5 },
          "<"
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.ticker.remove(() => lenis.raf);
      lenis.destroy();
      tl.kill();
    };
  }, []);

  return (
    <div ref={wrapperRef}>
      <div className="panel" ref={panelRef}>
        {images.map((bg, i) => (
          <div
            key={i}
            ref={(el) => (imageRefs.current[i] = el)}
            className="image"
            style={{ backgroundImage: bg }}
          />
        ))}
      </div>
      <div style={{ height: `${(images.length - 1) * 100}vh` }} />
    </div>
  );
}
