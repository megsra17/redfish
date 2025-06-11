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
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: `+=${(images.length - 1) * 100}vh`,
        scrub: true,
        pin: panelRef.current,
        anticipatePin: 1,
        markers: true,
      },
    });

    images.forEach((_, i) => {
      if (i === 0) {
        gsap.set(imageRefs.current[i], {
          zIndex: i,
          opacity: 1,
          scale: 1,
          rotate: 0,
        });
      } else {
        gsap.set(imageRefs.current[i], {
          zIndex: i,
          opacity: 0,
          scale: 0.8,
          rotate: -45,
        });

        tl.fromTo(
          imageRefs.current[i],
          {
            opacity: 0,
            scale: 0.4,
            rotateZ: -25,
            zIndex: i,
          },
          {
            opacity: 1,
            scale: 1,
            rotateZ: 0,
            duration: 1,
            ease: "power3.out",
            zIndex: i,
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      lenis.destroy();
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
