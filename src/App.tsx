import HeroSection from './components/HeroSection';
import MarqueeSection from './components/MarqueeSection';
import AboutSection from './components/AboutSection';
import SkillSphereSection from './components/SkillSphereSection';
import Carousel3DSection from './components/Carousel3DSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';

export function App() {
  return (
    <main className="w-full bg-[#0C0C0C] min-h-screen text-[#D7E2EA] overflow-x-clip selection:bg-[#7621B0] selection:text-white">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Marquee Section */}
      <MarqueeSection />

      {/* 3. About Section */}
      <AboutSection />

      {/* 4. Interactive 3D Skill Sphere */}
      <SkillSphereSection />

      {/* 5. Interactive 3D Project Cylinder Carousel */}
      <Carousel3DSection />

      {/* 6. Services Section */}
      <ServicesSection />

      {/* 7. Projects Section */}
      <ProjectsSection />

      {/* 8. Contact Section */}
      <ContactSection />
    </main>
  );
}

export default App;
