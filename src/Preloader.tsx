import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const chars = textRef.current?.children;
    if (!chars || !containerRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setCompleted(true);
      }
    });

    // Animate characters in
    tl.fromTo(
      chars,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: "power4.out" }
    );

    // Hold for a moment
    tl.to({}, { duration: 0.5 });

    // Animate characters out
    tl.to(chars, {
      y: -100,
      opacity: 0,
      duration: 0.5,
      stagger: 0.03,
      ease: "power4.in"
    });

    // Shrink and fade the container
    tl.to(containerRef.current, {
      height: 0,
      opacity: 0,
      duration: 0.8,
      ease: "expo.inOut"
    }, "-=0.2");

  }, []);

  if (completed) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        backgroundColor: "#050505",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden"
      }}
    >
      <div
        style={{
          width: "clamp(3rem, 8vw, 7rem)",
          height: "1px",
          backgroundColor: "var(--accent)",
          marginBottom: "2rem",
          opacity: 0.7
        }}
      />
      <div
        ref={textRef}
        style={{
          display: "flex",
          alignItems: "baseline",
          overflow: "hidden",
          paddingBottom: "0.1em"
        }}
      >
        {"HUSSNAIN".split("").map((char, i) => (
          <span
            key={i}
            style={{
              display: "inline-block",
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2.5rem, 6vw, 8.5rem)",
              fontWeight: 300,
              letterSpacing: "0.06em",
              color: "var(--text-main)",
              lineHeight: 1,
              userSelect: "none"
            }}
          >
            {char}
          </span>
        ))}
      </div>
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "clamp(0.6rem, 1.1vw, 0.8rem)",
          color: "var(--accent)",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          marginTop: "1.75rem",
          userSelect: "none"
        }}
      >
        Creative Developer
      </p>
    </div>
  );
}
