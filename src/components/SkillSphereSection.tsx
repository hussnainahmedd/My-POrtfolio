import React, { useEffect, useRef, useState, useMemo } from "react";
import FadeIn from "./FadeIn";

const SKILLS = [
  "Java", "C++", "Python", "TypeScript",
  "HTML & CSS", "JavaScript", "React", "Tailwind CSS",
  "Node.js", "Express", "MongoDB", "Firebase",
  "Android", "Kotlin", "C#", "SQL",
  "Data Structures", "Algorithms", "OOP",
  "Git", "GitHub", "Vite", "Figma", "Three.js"
];

export const SkillSphereSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const requestRef = useRef<number>(0);
  const mouse = useRef({ x: 0, y: 0 });
  const currentSpeed = useRef({ x: 0.5, y: 0.5 });

  const radius = typeof window !== "undefined" && window.innerWidth < 768 ? 160 : 250;

  const items = useMemo(() => {
    const N = SKILLS.length;
    return SKILLS.map((skill, i) => {
      const phi = Math.acos(1 - 2 * (i + 0.5) / N);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      return { skill, x, y, z };
    });
  }, [radius]);

  useEffect(() => {
    let lastTime = performance.now();
    let rx = 0;
    let ry = 0;

    const animate = (time: number) => {
      const dt = (time - lastTime) / 16;
      lastTime = time;

      const targetSpeedX = mouse.current.y * 2.5 + 0.2;
      const targetSpeedY = mouse.current.x * 2.5 + 0.5;

      currentSpeed.current.x += (targetSpeedX - currentSpeed.current.x) * 0.05;
      currentSpeed.current.y += (targetSpeedY - currentSpeed.current.y) * 0.05;

      rx += currentSpeed.current.x * dt;
      ry += currentSpeed.current.y * dt;

      setRotation({ x: rx, y: ry });
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mouse.current = { x, y };
  };

  const handleMouseLeave = () => {
    mouse.current = { x: 0, y: 0 };
  };

  return (
    <section
      id="skills"
      className="relative min-h-screen w-full bg-[#0C0C0C] flex flex-col items-center justify-center py-20 px-5 overflow-hidden z-10"
    >
      <div className="text-center mb-12">
        <FadeIn delay={0} y={30}>
          <p className="text-[#BBCCD7] text-sm uppercase tracking-[0.3em] font-medium mb-2">
            [ Interactive Tech Arsenal ]
          </p>
          <h2
            className="hero-heading font-black uppercase text-center leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 100px)' }}
          >
            Skill Sphere
          </h2>
        </FadeIn>
      </div>

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full h-[550px] flex justify-center items-center select-none"
        style={{ perspective: "1200px" }}
      >
        <div
          style={{
            position: "relative",
            width: "0",
            height: "0",
            transformStyle: "preserve-3d",
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
          }}
        >
          {items.map((item, idx) => {
            const radX = (rotation.x * Math.PI) / 180;
            const radY = (rotation.y * Math.PI) / 180;

            const z1 = item.y * Math.sin(radX) + item.z * Math.cos(radX);
            const z2 = -item.x * Math.sin(radY) + z1 * Math.cos(radY);

            const depth = (z2 + radius) / (2 * radius);
            const opacity = Math.max(0.25, depth);

            return (
              <div
                key={idx}
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  transform: `translate3d(calc(-50% + ${item.x}px), calc(-50% + ${item.y}px), ${item.z}px) rotateY(${-rotation.y}deg) rotateX(${-rotation.x}deg)`,
                  color: depth > 0.8 ? "#BBCCD7" : "#646973",
                  opacity: opacity,
                  fontFamily: "'Kanit', sans-serif",
                  fontSize: depth > 0.8 ? "1.4rem" : "0.95rem",
                  fontWeight: depth > 0.8 ? 700 : 500,
                  transition: "color 0.3s ease, font-size 0.3s ease",
                  whiteSpace: "nowrap",
                  textShadow: depth > 0.8 ? "0 0 16px rgba(187, 204, 215, 0.6)" : "none",
                  pointerEvents: "none"
                }}
              >
                {item.skill}
              </div>
            );
          })}
        </div>
      </div>
      <p className="text-xs uppercase tracking-widest text-[#D7E2EA]/50 mt-4">
        Move mouse over globe to rotate
      </p>
    </section>
  );
};

export default SkillSphereSection;
