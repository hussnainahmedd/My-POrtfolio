import React from 'react';
import FadeIn from './FadeIn';

interface ServiceItem {
  number: string;
  name: string;
  description: string;
}

const servicesData: ServiceItem[] = [
  {
    number: '01',
    name: '3D Web Development',
    description: 'Building interactive 3D web applications, WebGL visualizers, and dynamic canvas experiences using React, Three.js, and GSAP.'
  },
  {
    number: '02',
    name: 'Full Stack Engineering',
    description: 'End-to-end web applications built with modern frontend frameworks, scalable API architectures, and robust backend systems.'
  },
  {
    number: '03',
    name: 'UI/UX & Motion Design',
    description: 'Crafting polished, accessible interfaces with fluid micro-interactions and animations that elevate digital brand storytelling.'
  },
  {
    number: '04',
    name: 'Frontend Architecture',
    description: 'Designing high-performance, maintainable frontend codebases leveraging React 19, TypeScript, Tailwind CSS, and Framer Motion.'
  },
  {
    number: '05',
    name: 'Branding & Visual Identity',
    description: 'Developing cohesive visual presence -- from design tokens and assets to high-converting interactive landing pages.'
  }
];

export const ServicesSection: React.FC = () => {
  return (
    <section
      id="services"
      className="bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 w-full relative z-0"
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        {/* Section Heading */}
        <FadeIn delay={0} y={40}>
          <h2
            className="font-black uppercase text-[#0C0C0C] text-center mb-16 sm:mb-20 md:mb-28 leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Services
          </h2>
        </FadeIn>

        {/* Vertical List of Services */}
        <div className="w-full flex flex-col divide-y divide-[#0C0C0C]/15 border-t border-b border-[#0C0C0C]/15">
          {servicesData.map((item, idx) => (
            <FadeIn key={item.number} delay={idx * 0.1} y={30} className="w-full">
              <div className="py-8 sm:py-10 md:py-12 flex flex-col sm:flex-row items-start sm:items-baseline justify-between gap-4 sm:gap-10 w-full group transition-colors duration-300">
                {/* Left Number */}
                <div
                  className="font-black text-[#0C0C0C] leading-none flex-shrink-0 select-none"
                  style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
                >
                  {item.number}
                </div>

                {/* Right Stacked Name & Description */}
                <div className="flex flex-col gap-2 sm:gap-3 flex-grow max-w-2xl">
                  <h3
                    className="font-medium uppercase text-[#0C0C0C] tracking-wide"
                    style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                  >
                    {item.name}
                  </h3>
                  <p
                    className="font-light text-[#0C0C0C] opacity-60 leading-relaxed max-w-2xl"
                    style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
