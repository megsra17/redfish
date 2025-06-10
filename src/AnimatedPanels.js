import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

const images = [
  "url('https://picsum.photos/id/1015/1200/800')",
  "url('https://picsum.photos/id/1016/1200/800')",
  "url('https://picsum.photos/id/1018/1200/800')",
  "url('https://picsum.photos/id/1020/1200/800')",
];

export default function App() {
  const wrapperRef = useRef(null);
  const panelRef = useRef(null);

  useLayoutEffect(() => {
    const totalImages = images.length;
    const scrollLength = totalImages * window.innerHeight;

    // build a timeline that flips out/in each image in sequence
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

    images.forEach((bg, i) => {
      tl.to(panelRef.current, {
        rotationY: -90,
        opacity: 0,
        duration: 0.3,
        ease: "power1.in",
      })
        .set(panelRef.current, {
          backgroundImage: bg,
          rotationY: 90,
          opacity: 0,
        })
        .to(panelRef.current, {
          rotationY: 0,
          opacity: 1,
          duration: 0.3,
          ease: "power1.out",
        });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      tl.kill();
    };
  }, []);

  return (
    <div ref={wrapperRef}>
      {/* This is the single “panel” that stays pinned */}
      <div className="panel" ref={panelRef}>
        <div className="panel-content">Your Content Here</div>
      </div>
      {/* spacer to allow enough scroll room */}
      <div style={{ height: `${images.length * 100}vh` }} />
    </div>
  );
}
