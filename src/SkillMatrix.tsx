import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SkillMatrix() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const skills = [
    { title: "FRONTEND", desc: "React, Next.js, Vue, GSAP, WebGL, Tailwind, TypeScript", color: "#4ecdc4" },
    { title: "BACKEND", desc: "Node.js, Express, Python, FastAPI, Django", color: "#ff6b6b" },
    { title: "AI & AUTOMATION", desc: "n8n, Make, OpenAI, Groq, LangChain, WhatsApp API", color: "#ffd166" },
    { title: "MOBILE & CLOUD", desc: "Flutter, React Native, Firebase, Supabase, AWS", color: "#118ab2" }
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = cardsRef.current.filter(Boolean);
    
    // Stack animation
    cards.forEach((card, i) => {
      if (!card) return;
      
      gsap.to(card, {
        scale: 1 - (cards.length - i) * 0.05,
        opacity: 0.5,
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top 20%",
          endTrigger: sectionRef.current,
          end: "bottom bottom",
          scrub: true,
          pin: true,
          pinSpacing: false,
        }
      });
    });

  }, []);

  return (
    <section 
      ref={sectionRef}
      style={{
        position: "relative",
        paddingTop: "10vh",
        paddingBottom: "20vh",
        background: "#050505"
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
        <h2 style={{
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: 700,
          color: "var(--text-main)",
          lineHeight: 1.2
        }}>
          SKILL<br />
          <span style={{ color: "var(--accent)" }}>MATRIX</span>
        </h2>
      </div>

      <div style={{ position: "relative", maxWidth: "800px", margin: "0 auto", padding: "0 2rem" }}>
        {skills.map((skill, idx) => (
          <div
            key={idx}
            ref={(el) => { cardsRef.current[idx] = el; }}
            style={{
              position: "relative",
              width: "100%",
              marginBottom: "2rem",
              background: "rgba(24,24,27,0.7)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: `1px solid ${skill.color}40`,
              borderTop: `4px solid ${skill.color}`,
              borderRadius: "var(--radius-lg)",
              padding: "3rem",
              boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
              zIndex: idx + 1
            }}
          >
            <div style={{ color: skill.color, fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.2em", marginBottom: "1rem" }}>
              0{idx + 1} // MODULE
            </div>
            <h3 style={{ color: "var(--text-main)", fontSize: "2rem", fontWeight: 700, marginBottom: "1rem" }}>
              {skill.title}
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", lineHeight: 1.6 }}>
              {skill.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
