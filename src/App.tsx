import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CustomCursor from "./CustomCursor";
import Preloader from "./Preloader";
import NebulaBackground from "./NebulaBackground";
import MagneticButton from "./MagneticButton";
import About from "./About";
import ContactForm from "./ContactForm";
import Carousel3D from "./Carousel3D";
import type { Project } from "./Carousel3D";
import SkillSphere from "./SkillSphere";
import profilePic from "./assets/hussnain.jpg";
import './index.css';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  const projects: Project[] = [
    {
      id: 1,
      category: "low-level",
      title: "Assembly To-Do List",
      desc: "A pure Assembly Language (8086) To-Do List demonstrating low-level hardware control.",
      stack: ["Assembly", "8086", "DOSBox"],
      link: "https://github.com/hussnainahmedd/To-Do-List-in-Assembly-Language-"
    },
    {
      id: 2,
      category: "networking",
      title: "Enterprise Network",
      desc: "A robust enterprise network simulation built in Cisco Packet Tracer with VoIP and VLANs.",
      stack: ["Cisco", "Networking", "VoIP"],
      link: "https://github.com/hussnainahmedd/Computer-Network-Project"
    },
    {
      id: 3,
      category: "web",
      title: "Sky Wager",
      desc: "A frontend web project focused on betting and wagering interfaces.",
      stack: ["HTML", "CSS", "JS"],
      link: "https://github.com/hussnainahmedd/Sky-Wager"
    },
    {
      id: 4,
      category: "ai-assistant",
      title: "Python AI Jarvis",
      desc: "A voice-activated AI assistant built in Python inspired by JARVIS.",
      stack: ["Python", "AI", "Speech"],
      link: "https://github.com/hussnainahmedd/Pyhton-AI-Jarvis-"
    },
    {
      id: 5,
      category: "web",
      title: "Portfolio Source",
      desc: "The source code for my personal developer portfolio built with React.",
      stack: ["React", "TypeScript", "GSAP"],
      link: "https://github.com/hussnainahmedd/My-POrtfolio"
    },
    {
      id: 6,
      category: "ai-vision",
      title: "FaceVision AI",
      desc: "An AI-powered computer vision project for real-time face tracking.",
      stack: ["Python", "OpenCV", "AI"],
      link: "https://github.com/hussnainahmedd/FaceVision-AI"
    },
    {
      id: 7,
      category: "web",
      title: "Emotion-Based Journal",
      desc: "A journal system built using Blazor and SSMS Database that tracks emotions.",
      stack: ["C#", "Blazor", "SSMS"],
      link: "https://github.com/hussnainahmedd/Emotion-Based-Journal-System"
    },
    {
      id: 8,
      category: "web",
      title: "Kickmetrics",
      desc: "Visual Programming Semester project using Blazor, C# and a Database.",
      stack: ["C#", "Blazor", "SQL"],
      link: "https://github.com/hussnainahmedd/Kickmetrics-"
    },
    {
      id: 9,
      category: "frontend",
      title: "Stock Management Front-End",
      desc: "A user interface for managing stock and inventory operations.",
      stack: ["HTML", "CSS", "JS"],
      link: "https://github.com/hussnainahmedd/stock-management-system"
    },
    {
      id: 10,
      category: "backend",
      title: "Stock Management API",
      desc: "The backend services and APIs written in JavaScript.",
      stack: ["JavaScript", "Node.js"],
      link: "https://github.com/hussnainahmedd/backend"
    },
    {
      id: 11,
      category: "security",
      title: "File Monitoring System",
      desc: "An Information Security project from 3rd semester to monitor file integrity.",
      stack: ["Python", "Security"],
      link: "https://github.com/hussnainahmedd/file-monitoring-system"
    },
    {
      id: 12,
      category: "algorithms",
      title: "Crime Network Analyzer",
      desc: "A graph-based application modeling relationships within crime syndicates.",
      stack: ["Java", "Graphs", "Algos"],
      link: "https://github.com/hussnainahmedd/CrimeNetworkAnalyzer"
    },
    {
      id: 13,
      category: "mobile",
      title: "Tour Splitter",
      desc: "Firebase-backed application for dividing group expenses during trips.",
      stack: ["Java", "Android"],
      link: "https://github.com/hussnainahmedd/TourSplitter"
    },
    {
      id: 14,
      category: "algorithms",
      title: "Crime Investigation Analyzer",
      desc: "Data Structures & Algorithms project analyzing crime investigations.",
      stack: ["C++", "DSA", "Algorithms"],
      link: "https://github.com/hussnainahmedd/DSA-Project"
    },
    {
      id: 15,
      category: "desktop",
      title: "Visual Programming App",
      desc: "A desktop application project created for the Visual Programming course.",
      stack: ["C#", ".NET", "GUI"],
      link: "https://github.com/hussnainahmedd/Visual-Progamminf-project"
    },
    {
      id: 16,
      category: "desktop",
      title: "Java Application",
      desc: "A core Java project showcasing object-oriented programming principles.",
      stack: ["Java", "OOP", "Swing"],
      link: "https://github.com/hussnainahmedd/JAVA-Project"
    },
    {
      id: 17,
      category: "web",
      title: "HTML Sandbox",
      desc: "A collection of small HTML, CSS, and JS web projects.",
      stack: ["HTML", "CSS", "JS"],
      link: "https://github.com/hussnainahmedd/My-Projects"
    },
    {
      id: 18,
      category: "web",
      title: "Web Project",
      desc: "A foundational web development project for learning purposes.",
      stack: ["HTML", "CSS"],
      link: "https://github.com/hussnainahmedd/Project"
    }
  ];

  return (
    <>
      <CustomCursor />
      <Preloader />
      
      {/* Background stays fixed */}
      <NebulaBackground />

      <nav style={{
        position: "fixed",
        top: "2rem",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        alignItems: "center",
        gap: "2rem",
        background: "rgba(9,8,5,0.6)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(196,164,107,0.1)",
        padding: "1rem 2rem",
        borderRadius: "40px",
        zIndex: 50,
        boxShadow: "0 0 40px rgba(0,0,0,0.6)"
      }}>
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, letterSpacing: "0.2em" }}>HUSSNAIN.</span>
        <div style={{ width: "1px", height: "1rem", background: "rgba(196,164,107,0.2)" }} />
        <ul style={{ display: "flex", gap: "2rem", listStyle: "none", margin: 0, padding: 0 }}>
          <li><a href="#about" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem" }}>About</a></li>
          <li><a href="#work" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem" }}>Work</a></li>
          <li><a href="#contact" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem" }}>Contact</a></li>
        </ul>
      </nav>

      {/* Main Scroll Container */}
      <main>
        {/* Hero Section */}
        <section style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative" }}>
          <img 
            src={profilePic} 
            alt="Hussnain Ahmed" 
            style={{ 
              width: "180px", 
              height: "240px", 
              objectFit: "cover",
              borderRadius: "24px", 
              border: "2px solid rgba(196,164,107,0.5)", 
              marginBottom: "2rem",
              boxShadow: "0 20px 40px rgba(0,0,0,0.5), 0 0 40px rgba(196,164,107,0.2)"
            }} 
          />
          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 700, letterSpacing: "0.05em", textAlign: "center", lineHeight: 1 }}>
            HUSSNAIN<br/>
            <span style={{ color: "var(--accent)" }}>AHMED</span>
          </h1>
          
          <div style={{ position: "absolute", bottom: "10%", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", opacity: 0.5 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>Scroll to explore</span>
            <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, var(--accent), transparent)" }} />
          </div>
        </section>

        <About />
        <Carousel3D projects={projects} />
        <SkillSphere />

        {/* Contact Section */}
        <section id="contact" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "10rem 2rem 4rem 2rem", marginTop: "10vh", position: "relative", zIndex: 10 }}>
          <div style={{ textAlign: "center", maxWidth: "600px", background: "rgba(24,24,27,0.3)", padding: "4rem 2rem", borderRadius: "var(--radius-lg)", backdropFilter: "blur(20px)", border: "1px solid var(--border-color)", boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "3rem", fontWeight: 700, marginBottom: "1rem" }}>Let's Talk</h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "3rem" }}>I am currently available for freelance work and full-time opportunities. Let's build something great together.</p>
            
            <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap" }}>
              <MagneticButton href="/Hussnain_Ahmad_CV.pdf" download="Hussnain_Ahmad_CV.pdf">
                <span>📄</span> Download CV
              </MagneticButton>
              <MagneticButton href="https://github.com/hussnainahmedd">
                <span>🔗</span> GitHub
              </MagneticButton>
              <MagneticButton href="https://linkedin.com/in/hussnainn">
                <span>🔗</span> LinkedIn
              </MagneticButton>
            </div>
            
            <ContactForm />
          </div>
        </section>
      </main>
    </>
  );
}
