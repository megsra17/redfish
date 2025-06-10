import React from "react";
import { ReactLenis } from "lenis/react";
import AnimatedPanels from "./AnimatedPanels";

export default function App() {
  return (
    <ReactLenis root options={{ duration: 1.2, smooth: true }}>
      <AnimatedPanels />
    </ReactLenis>
  );
}
