import { useEffect, useRef, useState, useMemo } from "react";

const SKILLS = [
  "Java", "C++", "Python",
  "HTML & CSS", "JavaScript", "React", "Tailwind",
  "Node.js", "Express", "MongoDB", "Firebase",
  "WordPress", "WooCommerce",
  "Android", "Kotlin",
  "Blazor", "C#",
  "Data Structures", "Algorithms", "OOP",
  "Git", "GitHub", "Networking",
  "SQL", "Figma"
];

export default function SkillSphere() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const requestRef = useRef<number>(0);
  
  // Mouse interaction state
  const mouse = useRef({ x: 0, y: 0 });
  const currentSpeed = useRef({ x: 0.5, y: 0.5 }); // Base auto-rotation speed

  const radius = window.innerWidth < 768 ? 160 : 250;

  // Calculate static spherical positions once
  const items = useMemo(() => {
    const N = SKILLS.length;
    return SKILLS.map((skill, i) => {
      // Fibonacci sphere algorithm
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
      const dt = (time - lastTime) / 16; // normalize to ~60fps
      lastTime = time;

      // Smoothly interpolate current speed towards target mouse speed
      // If mouse is at center (0,0), it rotates at base speed.
      // If mouse is far left/right, it rotates faster in that direction.
      const targetSpeedX = mouse.current.y * 2.5 + 0.2; // vertical mouse controls X rotation
      const targetSpeedY = mouse.current.x * 2.5 + 0.5; // horizontal mouse controls Y rotation

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
    // Normalize mouse position between -1 and 1
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mouse.current = { x, y };
  };

  const handleMouseLeave = () => {
    // Reset to base auto-rotation
    mouse.current = { x: 0, y: 0 };
  };

  return (
    <section 
      id="skills"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "4rem 0",
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
          [ Technical Arsenal ]
        </p>
      </div>

      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          width: "100%",
          height: "600px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          perspective: "1200px"
        }}
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
            // Determine opacity based on Z position to fade items in the back
            // To calculate world Z, we apply the rotation matrix.
            // But we can approximate it with CSS or just let 3D distance handle scale.
            // Actually, preserve-3d will naturally handle sizing, and we can add a slight opacity drop off.
            
            // To compute the actual Z in camera space:
            const radX = (rotation.x * Math.PI) / 180;
            const radY = (rotation.y * Math.PI) / 180;
            
            // Apply Ry then Rx to the vector (x,y,z)
            // Actually, transform order is rotateX then rotateY.
            // So vector * Rx * Ry
            const z1 = item.y * Math.sin(radX) + item.z * Math.cos(radX);
            const z2 = -item.x * Math.sin(radY) + z1 * Math.cos(radY);
            
            // z2 ranges from -radius to +radius
            // Map it to opacity: front is 1, back is 0.2
            const depth = (z2 + radius) / (2 * radius); // 0 to 1
            const opacity = Math.max(0.2, depth);
            
            return (
              <div
                key={idx}
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  transform: `translate3d(calc(-50% + ${item.x}px), calc(-50% + ${item.y}px), ${item.z}px) rotateY(${-rotation.y}deg) rotateX(${-rotation.x}deg)`,
                  color: depth > 0.8 ? "var(--accent)" : "var(--text-main)",
                  opacity: opacity,
                  fontFamily: "var(--font-heading)",
                  fontSize: depth > 0.8 ? "1.5rem" : "1rem",
                  fontWeight: 600,
                  transition: "color 0.3s ease, font-size 0.3s ease",
                  whiteSpace: "nowrap",
                  textShadow: depth > 0.8 ? "0 0 15px rgba(196,164,107,0.8)" : "none",
                  pointerEvents: "none"
                }}
              >
                {item.skill}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
