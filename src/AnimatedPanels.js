import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

// Updated with dynamic content
const slides = [
  {
    bg: "url('https://picsum.photos/id/1015/1200/800')",
    title: "Mountain Escape",
    heading: "Adventure Awaits",
    subheading: "Explore nature’s beauty",
  },
  {
    bg: "url('https://picsum.photos/id/1016/1200/800')",
    title: "Seaside Serenity",
    heading: "Calm the Soul",
    subheading: "Feel the ocean breeze",
  },
  {
    bg: "url('https://picsum.photos/id/1018/1200/800')",
    title: "Urban Journey",
    heading: "City Lights",
    subheading: "Find inspiration in the skyline",
  },
  {
    bg: "url('https://picsum.photos/id/1020/1200/800')",
    title: "Forest Retreat",
    heading: "Back to Nature",
    subheading: "Rejuvenate among the trees",
  },
];

export default function AnimatedPanels() {
  const wrapperRef = useRef(null);
  const panelRef = useRef(null);
  const imageRefs = useRef([]);
  const [currentSlide, setCurrentSlide] = useState(1);

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
        end: `+=${(slides.length - 1) * 500}vh`,
        scrub: true,
        pin: panelRef.current,
        anticipatePin: 1,
        onUpdate: (self) => {
          const index = Math.floor(self.progress * (slides.length - 1));
          setCurrentSlide(index + 1);
        },
      },
    });

    slides.forEach((_, i) => {
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
          rotateZ: -25,
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
        ).add(() => {
          setCurrentSlide(i + 2);
        });

        tl.to({}, { duration: 1 }); // Small gap between animations
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
        {slides.map((slide, i) => (
          <div
            key={i}
            ref={(el) => (imageRefs.current[i] = el)}
            className="image"
            style={{ backgroundImage: slide.bg }}
          >
            <div className="overlay">
              <div className="text-left">
                <h1>{slide.heading}</h1>
                <p>{slide.subheading}</p>
              </div>
              <div className="button-right">
                <button>View Project</button>
              </div>
            </div>
            <div className="bottom-left-title">{slide.title}</div>
          </div>
        ))}
      </div>
      <div className="slide-counter">
        {currentSlide} / {slides.length}
      </div>
      <div style={{ height: `${(slides.length - 1) * 100}vh` }} />
    </div>
  );
}
