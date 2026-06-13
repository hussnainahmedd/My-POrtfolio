import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Center the cursor
    gsap.set(dot, { xPercent: -50, yPercent: -50 });
    gsap.set(ring, { xPercent: -50, yPercent: -50 });

    const moveCursor = (e: MouseEvent) => {
      // Dot follows immediately
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
      });

      // Ring lags behind
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: "power2.out"
      });
    };

    // Make ring bigger when hovering over clickable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, input, textarea, select')) {
        gsap.to(ring, { scale: 1.5, duration: 0.3, backgroundColor: 'rgba(255,255,255,0.1)' });
        gsap.to(dot, { scale: 0, duration: 0.3 });
      } else {
        gsap.to(ring, { scale: 1, duration: 0.3, backgroundColor: 'rgba(255,255,255,0.02)' });
        gsap.to(dot, { scale: 1, duration: 0.3 });
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "8px",
          height: "8px",
          backgroundColor: "rgba(255,255,255,0.9)",
          borderRadius: "50%",
          pointerEvents: "none",
          mixBlendMode: "difference",
          zIndex: 9999
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "40px",
          height: "40px",
          border: "1px solid rgba(255,255,255,0.5)",
          backgroundColor: "rgba(255,255,255,0.02)",
          backdropFilter: "blur(2px)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9998
        }}
      />
    </>
  );
}
