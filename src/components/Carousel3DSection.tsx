import React, { useState, useRef, useEffect } from "react";
import type { MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent } from "react";
import FadeIn from "./FadeIn";

export interface ProjectRepo {
  id: number;
  category: string;
  title: string;
  desc: string;
  stack: string[];
  link: string;
}

const HUSSNAIN_REPOS: ProjectRepo[] = [
  {
    id: 1,
    category: "Academic & University Project",
    title: "Air University Course Portal",
    desc: "Interactive academic portal for course registration, grade calculations, and student performance tracking.",
    stack: ["React", "Java", "Spring Boot", "SQL"],
    link: "https://github.com/hussnainahmedd/My-POrtfolio"
  },
  {
    id: 2,
    category: "Personal & Web3D",
    title: "3D Developer Portfolio",
    desc: "Interactive 3D web experience with 3D model viewports, particle physics, and fluid scroll animations.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    link: "https://hussnainportfolio.vercel.app/"
  },
  {
    id: 3,
    category: "Mobile Application",
    title: "Android Attendance & Student App",
    desc: "Native Android application for student portals, automated attendance logging, and timetable notifications.",
    stack: ["Android", "Kotlin", "Firebase", "REST API"],
    link: "https://github.com/hussnainahmedd"
  },
  {
    id: 4,
    category: "Data Science & AI",
    title: "AI Computer Vision & Data Pipeline",
    desc: "Automated image classification system and predictive data analysis engine built with Python.",
    stack: ["Python", "OpenCV", "TensorFlow", "NumPy"],
    link: "https://github.com/hussnainahmedd"
  },
  {
    id: 5,
    category: "Full Stack Software",
    title: "Realtime WebSocket Chat System",
    desc: "Multi-user instant messaging platform featuring end-to-end WebSockets, room management, and dark UI.",
    stack: ["Node.js", "Express", "MongoDB", "WebSockets"],
    link: "https://github.com/hussnainahmedd"
  },
  {
    id: 6,
    category: "Web Application",
    title: "Fullstack E-Commerce Platform",
    desc: "Conversion-focused online storefront with interactive shopping cart, checkout logic, and admin panel.",
    stack: ["React", "Tailwind CSS", "Node.js", "SQL"],
    link: "https://github.com/hussnainahmedd"
  }
];

function ProjectCard({ project }: { project: ProjectRepo }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: ReactMouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    cardRef.current.style.borderColor = "#BBCCD7";
    cardRef.current.style.boxShadow = `0 20px 40px rgba(0,0,0,0.6), ${rotateY * 2}px ${rotateX * -2}px 30px rgba(187,204,215,0.25)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    cardRef.current.style.borderColor = "rgba(215, 226, 234, 0.2)";
    cardRef.current.style.boxShadow = "none";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => window.open(project.link, "_blank", "noopener,noreferrer")}
      className="bg-neutral-900/60 backdrop-blur-xl border border-[#D7E2EA]/20 rounded-3xl p-6 h-full flex flex-col justify-between transition-all duration-300 cursor-pointer select-none"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div style={{ transform: "translateZ(30px)" }}>
        <p className="text-[#BBCCD7] text-xs uppercase tracking-widest mb-2 font-medium">
          {project.category}
        </p>
        <h3 className="text-xl font-medium text-[#D7E2EA] mb-3">
          {project.title}
        </h3>
        <p className="text-[#D7E2EA]/70 text-sm leading-relaxed">
          {project.desc}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mt-4" style={{ transform: "translateZ(20px)" }}>
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="text-xs px-3 py-1 bg-[#BBCCD7]/10 text-[#BBCCD7] rounded-full border border-[#BBCCD7]/20 font-medium"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

export const Carousel3DSection: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const animate = () => {
      if (!isDragging && !isHovered) {
        setRotation((prev) => prev - 0.15);
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
    setCurrentX(diff * 0.25);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    setRotation((prev) => prev + currentX);
    setCurrentX(0);
  };

  const onMouseDown = (e: ReactMouseEvent) => handleDragStart(e.clientX);
  const onMouseMove = (e: ReactMouseEvent) => handleDragMove(e.clientX);
  const onMouseUp = () => handleDragEnd();
  const onMouseLeave = () => {
    handleDragEnd();
    setIsHovered(false);
  };
  const onMouseEnter = () => setIsHovered(true);

  const onTouchStart = (e: ReactTouchEvent) => handleDragStart(e.touches[0].clientX);
  const onTouchMove = (e: ReactTouchEvent) => handleDragMove(e.touches[0].clientX);
  const onTouchEnd = () => handleDragEnd();

  const activeRotation = rotation + currentX;
  const baseRadius = typeof window !== "undefined" && window.innerWidth < 768 ? 260 : 400;
  const anglePerItem = 360 / HUSSNAIN_REPOS.length;

  return (
    <section
      id="works"
      className="relative min-h-screen w-full bg-[#0C0C0C] flex flex-col items-center justify-center py-20 px-5 overflow-hidden z-10"
    >
      <div className="text-center mb-12">
        <FadeIn delay={0} y={30}>
          <p className="text-[#BBCCD7] text-sm uppercase tracking-[0.3em] font-medium mb-2">
            [ 3D Showcase Carousel ]
          </p>
          <h2
            className="hero-heading font-black uppercase text-center leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 100px)' }}
          >
            Featured BSCS Projects
          </h2>
        </FadeIn>
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
        className="w-full h-[520px] flex justify-center items-center select-none"
        style={{
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
            transform: `translateZ(${-baseRadius}px) rotateY(${activeRotation}deg)`,
            transition: isDragging ? "none" : "transform 0.1s linear"
          }}
        >
          {HUSSNAIN_REPOS.map((project, idx) => {
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
                  transform: `rotateY(${-itemAngle}deg) translateZ(${baseRadius}px)`,
                  backfaceVisibility: "hidden",
                  transformStyle: "preserve-3d",
                  padding: "0.5rem"
                }}
              >
                <ProjectCard project={project} />
              </div>
            );
          })}
        </div>
      </div>
      <p className="text-xs uppercase tracking-widest text-[#D7E2EA]/50 mt-4 flex items-center gap-2">
        <span>←</span> Drag or swipe to spin cylinder (Hover to pause) <span>→</span>
      </p>
    </section>
  );
};

export default Carousel3DSection;
