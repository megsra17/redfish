import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import "./Footer.css";

export default function Footer() {
  const imageGroupRef = useRef([]);
  const nowBtnRef = useRef(null);
  const helloRef = useRef(null);
  const arrowRightRef = useRef(null);
  const arrowDownRef = useRef(null);
  const linkRefs = useRef([]);

  useEffect(() => {
    const button = nowBtnRef.current;
    if (!button) return;

    const rotations = [-15, 10, -5, 20, -10]; // example unique rotations

    const handleHover = () => {
      const rotations = [-15, 10, -5, 20, -10];
      const xStart = [-300, 250, -150, 200, 180]; // start x
      const yStart = [
        window.innerHeight + 50,
        window.innerHeight + 80,
        window.innerHeight + 30,
        window.innerHeight + 100,
        window.innerHeight + 60,
      ]; // start y
      const xEnd = [-80, -40, 0, 40, 80]; // end x
      const yEnd = [-40, 10, -30, 20, -10]; // end y

      imageGroupRef.current.forEach((el, i) => {
        gsap.set(el, {
          visibility: "visible",
        });

        gsap.fromTo(
          el,
          {
            x: xStart[i],
            y: yStart[i],
            opacity: 0,
            scale: 0.8,
            rotate: 0,
          },
          {
            x: xEnd[i],
            y: yEnd[i],
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

  useEffect(() => {
    const button = nowBtnRef.current;
    if (!button) return;

    const originalWidth = button.offsetWidth;

    const expand = () => {
      gsap.to(button, {
        width: originalWidth + 250, // how much more to expand
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const contract = () => {
      gsap.to(button, {
        width: originalWidth,
        duration: 0.4,
        ease: "power2.in",
      });
    };

    button.addEventListener("mouseenter", expand);
    button.addEventListener("mouseleave", contract);

    return () => {
      button.removeEventListener("mouseenter", expand);
      button.removeEventListener("mouseleave", contract);
    };
  }, []);

  useEffect(() => {
    gsap.set(arrowDownRef.current, { autoAlpha: 0, y: -20 });
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

  const handleEmailHoverIn = () => {
    gsap.to(arrowRightRef.current, {
      x: 30,
      autoAlpha: 0,
      duration: 0.3,
      ease: "power2.out",
    });

    gsap.to(helloRef.current, {
      x: 20,
      duration: 0.3,
      ease: "power2.out",
    });

    gsap.to(arrowDownRef.current, {
      autoAlpha: 1,
      y: 0,
      duration: 0.3,
      ease: "power2.out",
      delay: 0.1,
    });
  };

  const handleEmailHoverOut = () => {
    gsap.to(arrowRightRef.current, {
      x: 0,
      autoAlpha: 1,
      duration: 0.3,
      ease: "power2.in",
      delay: 0.1,
    });

    gsap.to(helloRef.current, {
      x: 0,
      duration: 0.3,
      ease: "power2.in",
    });

    gsap.to(arrowDownRef.current, {
      autoAlpha: 0,
      y: -20,
      duration: 0.3,
      ease: "power2.in",
    });
  };

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
                className="btn btn-outline-light btn-lg rounded-pill px-5 fs-55 btn-expand-left"
              >
                <span>NOW</span>
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
            <div
              className="footer-email-group"
              onMouseEnter={handleEmailHoverIn}
              onMouseLeave={handleEmailHoverOut}
            >
              <div className="d-flex align-items-center gap-3">
                {/* ↓ Arrow above HELLO */}
                <div
                  ref={arrowDownRef}
                  className="fs-1"
                  Add
                  commentMore
                  actions
                  style={{ position: "relative", top: "4px" }} // slight vertical alignment
                >
                  ↓
                </div>

                <div className="d-flex align-items-center">
                  <h1
                    ref={helloRef}
                    className="display-3 fw-bold mb-0"
                    style={{ marginRight: "10px" }}
                  >
                    HELLO
                  </h1>
                  <div
                    ref={arrowRightRef}
                    className="fs-1"
                    style={{ position: "relative", top: "4px" }}
                  >
                    →
                  </div>
                </div>
              </div>
              <h1 className="display-3 fw-bold">@REDFISH.COM</h1>
            </div>
          </div>

          <div className="col-lg-6 col-md-12 d-flex flex-column align-items-end justify-content-end mt-4 mt-lg-0">
            <span className="small">PRIVACY AND COOKIES</span>
            <div className="d-flex gap-3 mt-2">
              {["IG", "BE", "IN", "DB"].map((label, i) => (
                <a
                  key={label}
                  href="#"
                  className="text-white text-decoration-none small position-relative link-underline"
                  ref={(el) => (linkRefs.current[i] = el)}
                >
                  {label}
                  <span className="underline position-absolute bottom-0 start-0"></span>
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
