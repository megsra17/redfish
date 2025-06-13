import React, { useLayoutEffect, useRef, useEffect, useState } from "react";
import gsap from "gsap";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    bg: "url('https://picsum.photos/id/1015/1200/800')",
    title: "Mountain Escape",
    heading: "Adventure Awaits",
    subheading: "Explore nature’s beauty",
    buttonRotate: -20,
  },
  {
    bg: "url('https://picsum.photos/id/1016/1200/800')",
    title: "Seaside Serenity",
    heading: "Calm the Soul",
    subheading: "Feel the ocean breeze",
    buttonRotate: 50,
  },
  {
    bg: "url('https://picsum.photos/id/1018/1200/800')",
    title: "Urban Journey",
    heading: "City Lights",
    subheading: "Find inspiration in the skyline",
    buttonRotate: -40,
  },
  {
    bg: "url('https://picsum.photos/id/1020/1200/800')",
    title: "Forest Retreat",
    heading: "Back to Nature",
    subheading: "Rejuvenate among the trees",
    buttonRotate: 20,
  },
];

export default function AnimatedPanels() {
  const wrapperRef = useRef(null);
  const panelRef = useRef(null);
  const imageRefs = useRef([]);
  const [currentSlide, setCurrentSlide] = useState(1);
  const lastScrollY = useRef(0);

  useLayoutEffect(() => {
    const lenis = new Lenis();
    let firstScroll = true;

    const handleDirection = (e) => {
      if (e.deltaY > 0) {
        gsap.to(".arrow", { rotate: 0, duration: 0 }); // Down
      } else if (e.deltaY < 0) {
        gsap.to(".arrow", { rotate: 180, duration: 0 }); // Up
      }
    };

    const handleTouch = (e) => {
      const touchY = e.touches[0].clientY;
      if (touchY < lastScrollY.current) {
        gsap.to(".arrow", { rotate: 0, duration: 0 });
      } else if (touchY > lastScrollY.current) {
        gsap.to(".arrow", { rotate: 180, duration: 0 });
      }
      lastScrollY.current = touchY;
    };

    window.addEventListener("wheel", handleDirection);
    window.addEventListener("touchmove", handleTouch);

    function raf(time) {
      const currentY = lenis.scroll;

      if (firstScroll) {
        gsap.set(".arrow", { rotate: 180 }); // Default: up
        firstScroll = false;
      }

      lastScrollY.current = currentY;
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
        );

        tl.to({}, { duration: 1 }); // Gap between slides
      }
    });

    return () => {
      window.removeEventListener("wheel", handleDirection);
      window.removeEventListener("touchmove", handleTouch);
      ScrollTrigger.getAll().forEach((st) => st.kill());
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    // Bouncing arrow animation
    gsap.to(".arrow", {
      y: -10,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      duration: 0.8,
    });
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
            <div className="overlay w-100 px-4 h-100 d-flex align-items-center justify-content-between">
              <div className="text-left col-6 text-white">
                <h1 className="fs-2 fs-md-1">{slide.heading}</h1>
                <p className="fs-6 fs-md-5">{slide.subheading}</p>
              </div>
              <div className="button-right col-auto">
                <button
                  className="btn btn-light tilt-button"
                  style={{ transform: `rotate(${slide.buttonRotate}deg)` }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "rotate(0deg)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = `rotate(${slide.buttonRotate}deg)`)
                  }
                >
                  View Project
                </button>
              </div>
            </div>
            <div className="bottom-left-title">{slide.title}</div>
          </div>
        ))}
      </div>

      <div className="slide-counter">
        {currentSlide} / {slides.length}
        <svg
          className="arrow"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 5V19M12 19L6 13M12 19L18 13"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
