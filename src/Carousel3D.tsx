import { useState, useRef, useEffect } from "react";
import type { MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent } from "react";

export interface Project {
  id: number;
  category: string;
  title: string;
  desc: string;
  stack: string[];
  link: string;
}

interface Props {
  projects: Project[];
}

// Sub-component for individual tilted cards
function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: ReactMouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate tilt (max 15 degrees)
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    // Add a glowing border effect
    cardRef.current.style.borderColor = "var(--accent)";
    cardRef.current.style.boxShadow = `0 20px 40px rgba(0,0,0,0.4), ${rotateY * 2}px ${rotateX * -2}px 30px rgba(196,164,107,0.15)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    cardRef.current.style.borderColor = "var(--border-color)";
    cardRef.current.style.boxShadow = "var(--shadow-md)";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        background: "rgba(24, 24, 27, 0.4)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid var(--border-color)",
        borderRadius: "var(--radius-lg)",
        padding: "2rem",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxShadow: "var(--shadow-md)",
        transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.4s ease, box-shadow 0.4s ease",
        transformStyle: "preserve-3d",
      }}
    >
      <div style={{ transform: "translateZ(30px)" }}>
        <p style={{ color: "var(--accent)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1rem" }}>{project.category}</p>
        <h3 style={{ fontSize: "1.5rem", fontWeight: 600, color: "var(--text-main)", marginBottom: "1rem" }}>{project.title}</h3>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", flexGrow: 1 }}>{project.desc}</p>
      </div>
      
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "1rem", marginBottom: "1.5rem", transform: "translateZ(20px)" }}>
        {project.stack.slice(0, 3).map(tech => (
          <span key={tech} style={{ fontSize: "0.75rem", padding: "0.25rem 0.75rem", background: "rgba(196,164,107,0.1)", color: "var(--accent)", borderRadius: "20px", border: "1px solid rgba(196,164,107,0.2)" }}>
            {tech}
          </span>
        ))}
      </div>

    </div>
  );
}

export default function Carousel3D({ projects }: Props) {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(0);
  const requestRef = useRef<number | undefined>(undefined);

  // Auto-rotation logic
  useEffect(() => {
    const animate = () => {
      if (!isDragging && !isHovered) {
        setRotation(prev => {
          const next = prev - 0.1; // Auto-rotate speed
          rotationRef.current = next;
          return next;
        });
      }
      requestRef.current = requestAnimationFrame(animate);
    };
    
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isDragging, isHovered]);

  const handleDragStart = (x: number) => {
    setIsDragging(true);
    setStartX(x);
  };

  const handleDragMove = (x: number) => {
    if (!isDragging) return;
    const diff = x - startX;
    setCurrentX(diff * 0.2); // Sensitivity
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    setRotation((prev) => prev + currentX);
    rotationRef.current = rotation + currentX;
    setCurrentX(0);
  };

  // Mouse Events
  const onMouseDown = (e: ReactMouseEvent) => handleDragStart(e.clientX);
  const onMouseMove = (e: ReactMouseEvent) => handleDragMove(e.clientX);
  const onMouseUp = () => handleDragEnd();
  const onMouseLeave = () => {
    handleDragEnd();
    setIsHovered(false);
  };
  const onMouseEnter = () => setIsHovered(true);

  // Touch Events
  const onTouchStart = (e: ReactTouchEvent) => handleDragStart(e.touches[0].clientX);
  const onTouchMove = (e: ReactTouchEvent) => handleDragMove(e.touches[0].clientX);
  const onTouchEnd = () => handleDragEnd();

  const activeRotation = rotation + currentX;
  const baseRadius = window.innerWidth < 768 ? 250 : 380;
  // Calculate dynamic radius to prevent overlap based on the number of items
  // R = (Card Width / 2) / Math.tan( PI / number_of_items )
  const calculatedRadius = Math.round((300 / 2) / Math.tan((180 / projects.length) * (Math.PI / 180))) + 40;
  const radius = Math.max(baseRadius, calculatedRadius);
  const anglePerItem = 360 / projects.length;

  return (
    <section 
      id="work"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        paddingTop: "4rem",
        zIndex: 10
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
        <p style={{
          fontFamily: "var(--font-mono)",
          color: "var(--accent)",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          textShadow: "0 0 10px rgba(196,164,107,0.5)"
        }}>
          [ Selected Works ]
        </p>
      </div>

      <div
        ref={containerRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onMouseEnter={onMouseEnter}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{
          width: "100%",
          height: "500px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          perspective: "1400px",
          cursor: isDragging ? "grabbing" : "grab"
        }}
      >
        <div
          style={{
            position: "relative",
            width: "300px",
            height: "400px",
            transformStyle: "preserve-3d",
            transform: `translateZ(${-radius}px) rotateY(${activeRotation}deg)`,
            transition: isDragging ? "none" : "transform 0.1s linear",
          }}
        >
          {projects.map((project, idx) => {
            const itemAngle = idx * anglePerItem;
            return (
              <div
                key={project.id}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  transform: `rotateY(${-itemAngle}deg) translateZ(${radius}px)`,
                  backfaceVisibility: "hidden",
                  transformStyle: "preserve-3d",
                  padding: "1rem"
                }}
              >
                <ProjectCard project={project} />
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ marginTop: "2rem", color: "var(--text-light)", fontSize: "0.8rem", display: "flex", alignItems: "center", gap: "0.5rem", opacity: 0.6 }}>
        <span>←</span> Drag to spin (Auto-rotates) <span>→</span>
      </div>
    </section>
  );
}
