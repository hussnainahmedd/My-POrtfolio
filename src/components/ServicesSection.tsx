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
    name: 'Full Stack & Node.js Web Apps',
    description: 'Building secure web applications with Node.js, Express, MongoDB, JWT authentication, and responsive frontend interfaces.'
  },
  {
    number: '02',
    name: 'Android Mobile Development',
    description: 'Developing native Android apps with Java/Kotlin, Firebase Realtime Database, user authentication, and MVP clean architecture.'
  },
  {
    number: '03',
    name: 'E-Commerce & WooCommerce',
    description: 'Crafting custom eCommerce stores using WordPress, WooCommerce, custom payment gateways (Stripe), product catalog, and checkout systems.'
  },
  {
    number: '04',
    name: 'Data Structures & Algorithms',
    description: 'Implementing graph traversal algorithms, node-edge data structures, and efficient object-oriented software engineering solutions in Java & C++.'
  },
  {
    number: '05',
    name: 'Agile & Software Engineering',
    description: 'Applying Scrum, Kanban, MVP development methodologies, and data science analytics for end-to-end software product delivery.'
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
