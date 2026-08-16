import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from './FadeIn';
import LiveProjectButton from './LiveProjectButton';

// Import generated project images
import tourMain from '../assets/projects/tour_splitter_main.jpg';
import tourCol1 from '../assets/projects/tour_splitter_col1.jpg';
import tourCol2 from '../assets/projects/tour_splitter_col2.jpg';

import stockMain from '../assets/projects/stock_mgmt_main.jpg';
import stockCol1 from '../assets/projects/stock_mgmt_col1.jpg';
import stockCol2 from '../assets/projects/stock_mgmt_col2.jpg';

import hastoreMain from '../assets/projects/hastore_main.jpg';
import hastoreCol1 from '../assets/projects/hastore_col1.jpg';
import hastoreCol2 from '../assets/projects/hastore_col2.jpg';

import crimeMain from '../assets/projects/crime_analyzer_main.jpg';
import crimeCol1 from '../assets/projects/crime_analyzer_col1.jpg';
import crimeCol2 from '../assets/projects/crime_analyzer_col2.jpg';

import agileMain from '../assets/projects/agile_suite_main.jpg';

interface ProjectCardData {
  number: string;
  name: string;
  category: string;
  url: string;
  col1Img1: string;
  col1Img2: string;
  col2Img: string;
}

const projectsData: ProjectCardData[] = [
  {
    number: '01',
    name: 'Tour Splitter -- Expense App',
    category: 'Android & Firebase',
    url: 'https://github.com/hussnainahmedd',
    col1Img1: tourCol1,
    col1Img2: tourCol2,
    col2Img: tourMain
  },
  {
    number: '02',
    name: 'Stock Management System',
    category: 'Node.js & MongoDB',
    url: 'https://github.com/hussnainahmedd/My-POrtfolio',
    col1Img1: stockCol1,
    col1Img2: stockCol2,
    col2Img: stockMain
  },
  {
    number: '03',
    name: 'HAstore E-Commerce Platform',
    category: 'WordPress & Stripe',
    url: 'https://hussnainportfolio.vercel.app/',
    col1Img1: hastoreCol1,
    col1Img2: hastoreCol2,
    col2Img: hastoreMain
  },
  {
    number: '04',
    name: 'Crime Network Analyzer',
    category: 'Java & Graph Algorithms',
    url: 'https://github.com/hussnainahmedd',
    col1Img1: crimeCol1,
    col1Img2: crimeCol2,
    col2Img: crimeMain
  },
  {
    number: '05',
    name: 'Agile Analytics & AUCIS Suite',
    category: 'Scrum & Data Science',
    url: 'https://github.com/hussnainahmedd/My-POrtfolio',
    col1Img1: stockCol1,
    col1Img2: crimeCol1,
    col2Img: agileMain
  }
];

const ProjectCard: React.FC<{
  project: ProjectCardData;
  index: number;
  totalCards: number;
}> = ({ project, index, totalCards }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start']
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.025;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="h-[88vh] flex items-center justify-center sticky top-20 md:top-28 w-full"
      style={{ top: `calc(80px + ${index * 24}px)` }}
    >
      <motion.div
        style={{ scale }}
        className="w-full max-w-6xl rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col gap-5 shadow-2xl overflow-hidden"
      >
        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D7E2EA]/20 pb-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <span
              className="font-black text-[#D7E2EA] leading-none select-none"
              style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)' }}
            >
              {project.number}
            </span>
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 font-light">
                {project.category}
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-medium uppercase text-[#D7E2EA]">
                {project.name}
              </h3>
            </div>
          </div>

          <LiveProjectButton url={project.url} />
        </div>

        {/* Bottom Image Grid Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-full flex-grow items-center">
          {/* Left Column (40% width / 5 cols) - 2 stacked images */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <img
              src={project.col1Img1}
              alt={`${project.name} screenshot 1`}
              className="w-full rounded-[30px] sm:rounded-[40px] md:rounded-[50px] object-cover border border-[#D7E2EA]/20"
              style={{ height: 'clamp(120px, 15vw, 210px)' }}
            />
            <img
              src={project.col1Img2}
              alt={`${project.name} screenshot 2`}
              className="w-full rounded-[30px] sm:rounded-[40px] md:rounded-[50px] object-cover border border-[#D7E2EA]/20"
              style={{ height: 'clamp(140px, 19vw, 300px)' }}
            />
          </div>

          {/* Right Column (60% width / 7 cols) - 1 tall image */}
          <div className="md:col-span-7 h-full flex">
            <img
              src={project.col2Img}
              alt={`${project.name} main mockup`}
              className="w-full h-full min-h-[280px] md:min-h-[400px] rounded-[30px] sm:rounded-[40px] md:rounded-[50px] object-cover border border-[#D7E2EA]/20"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const ProjectsSection: React.FC = () => {
  return (
    <section
      id="projects"
      className="bg-[#0C0C0C] text-[#D7E2EA] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-10 px-5 sm:px-8 md:px-10 pt-20 pb-32 w-full"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Section Heading */}
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase text-center mb-16 sm:mb-20 leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Project
          </h2>
        </FadeIn>

        {/* Sticky Stacking Cards Container */}
        <div className="w-full flex flex-col gap-12 relative">
          {projectsData.map((project, idx) => (
            <ProjectCard
              key={project.number}
              project={project}
              index={idx}
              totalCards={projectsData.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
