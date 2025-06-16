import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import "./Footer.css";

export default function Footer() {
  const imageGroupRef = useRef([]);
  const nowBtnRef = useRef(null);

  useEffect(() => {
    const button = nowBtnRef.current;
    if (!button) return;

    const rotations = [-15, 10, -5, 20, -10]; // example unique rotations

    const handleHover = () => {
      imageGroupRef.current.forEach((el, i) => {
        gsap.fromTo(
          el,
          {
            x: 0,
            y: window.innerHeight,
            opacity: 0,
            scale: 0.8,
            rotate: 0,
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            rotate: rotations[i],
            duration: 1.2,
            ease: "power3.out",
            delay: i * 0.05,
          }
        );
      });
    };

    const handleLeave = () => {
      imageGroupRef.current.forEach((el, i) => {
        gsap.to(el, {
          y: window.innerHeight,
          opacity: 0,
          scale: 0.8,
          rotate: 0,
          duration: 0.8,
          ease: "power2.in",
          delay: i * 0.03,
        });
      });
    };

    button.addEventListener("mouseenter", handleHover);
    button.addEventListener("mouseleave", handleLeave);

    return () => {
      button.removeEventListener("mouseenter", handleHover);
      button.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <footer className="footer-container text-white position-relative overflow-hidden">
      <div className="container-fluid d-flex flex-column justify-content-between min-vh-100 py-5">
        {/* Top + Center section */}
        <div className="row flex-grow-1 align-items-center">
          {/* Left empty for spacing */}
          <div className="col-lg-6 col-md-12"></div>

          {/* Right section (centered vertically) */}
          <div className="col-lg-5 col-md-12 d-flex flex-column align-items-end text-end">
            <div>
              <p className="h1 mb-3 fs-55">
                START
                <br />
                YOUR PROJECT
              </p>
              <button
                ref={nowBtnRef}
                className="btn btn-outline-light btn-lg rounded-pill px-5 fs-55"
              >
                NOW
              </button>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="row mt-5">
          <div className="col-lg-6 col-md-12">
            <p className="small mb-2">
              Like what you see?
              <br />
              Contact us for enquiries
              <br />
              or just to say hello!
            </p>
            <h1 className="display-3 fw-bold mb-0">
              HELLO<span className="arrow ms-2">→</span>
              <br />
              @REDFISH.COM
            </h1>
          </div>

          <div className="col-lg-6 col-md-12 d-flex flex-column align-items-end justify-content-end mt-4 mt-lg-0">
            <span className="small">PRIVACY AND COOKIES</span>
            <div className="d-flex gap-3 mt-2">
              {["IG", "BE", "IN", "DB"].map((label) => (
                <a
                  key={label}
                  href="#"
                  className="text-white text-decoration-none small"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Animated Image Stack */}
        <div className="image-stack position-absolute top-50 start-50 translate-middle">
          {[1, 2, 3, 4, 5].map((i) => (
            <img
              key={i}
              ref={(el) => (imageGroupRef.current[i] = el)}
              src={`/images/img${i}.jpg`}
              alt={`stack-img-${i}`}
              className="fly-img"
            />
          ))}
        </div>
      </div>
    </footer>
  );
}
