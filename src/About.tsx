import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current) return;

    gsap.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      }
    );
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        minHeight: "100vh",
        background: "linear-gradient(180deg, transparent 0%, #0d0a07 20%, #151009 50%, #050505 100%)",
        zIndex: 10,
        paddingTop: "20vh",
        paddingBottom: "10vh"
      }}
    >
      <div style={{ textAlign: "center", position: "relative", zIndex: 20, maxWidth: "800px", padding: "0 2rem" }}>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.35em",
            color: "rgba(196,164,107,0.45)",
            textTransform: "uppercase",
            marginBottom: "2rem"
          }}
        >
          [ About ]
        </p>
        <h2
          ref={titleRef}
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(2rem, 5vw, 4.5rem)",
            fontWeight: 700,
            lineHeight: 1.15,
            color: "rgba(226,213,190,0.92)",
            marginBottom: "2rem"
          }}
        >
          I Build Applications <br />
          <span
            style={{
              background: "var(--gradient-gold)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            That Scale
          </span>
        </h2>
        <p
          style={{
            fontSize: "1.25rem",
            color: "rgba(226,213,190,0.45)",
            lineHeight: 1.6,
            marginBottom: "1.5rem"
          }}
        >
          Full-Stack developer crafting interactive web experiences, AI automations, and robust backend systems.
        </p>
        <p
          style={{
            fontSize: "1rem",
            color: "rgba(226,213,190,0.25)",
            lineHeight: 1.6
          }}
        >
          From seamless frontend interfaces to intelligent pipelines — every component is engineered with intent.
        </p>
      </div>
    </section>
  );
}
