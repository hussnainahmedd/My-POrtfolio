import React from 'react';
import FadeIn from './FadeIn';
import AnimatedText from './AnimatedText';
import ContactButton from './ContactButton';

export const AboutSection: React.FC = () => {
  const aboutParagraphText = "I am a Computer Science (BSCS) undergraduate student at Air University with a passion for software engineering, 3D web interfaces, and full-stack development. I truly enjoy working with founders, builders, and teams aiming to build stand-out digital products. Let's build something incredible together!";

  return (
    <section id="about" className="relative min-h-screen w-full bg-[#0C0C0C] flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 overflow-hidden">
      {/* Decorative 3D images in corners */}
      {/* Top-left: Moon Icon */}
      <div className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] pointer-events-none z-10">
        <FadeIn delay={0.1} x={-80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
            alt="Moon Icon"
            className="w-[120px] sm:w-[160px] md:w-[210px] object-contain drop-shadow-xl opacity-90"
          />
        </FadeIn>
      </div>

      {/* Bottom-left: 3D Object */}
      <div className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] pointer-events-none z-10">
        <FadeIn delay={0.25} x={-80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
            alt="3D Object"
            className="w-[100px] sm:w-[140px] md:w-[180px] object-contain drop-shadow-xl opacity-90"
          />
        </FadeIn>
      </div>

      {/* Top-right: Lego Icon */}
      <div className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] pointer-events-none z-10">
        <FadeIn delay={0.15} x={80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
            alt="Lego Icon"
            className="w-[120px] sm:w-[160px] md:w-[210px] object-contain drop-shadow-xl opacity-90"
          />
        </FadeIn>
      </div>

      {/* Bottom-right: 3D Group */}
      <div className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] pointer-events-none z-10">
        <FadeIn delay={0.3} x={80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
            alt="3D Group"
            className="w-[130px] sm:w-[170px] md:w-[220px] object-contain drop-shadow-xl opacity-90"
          />
        </FadeIn>
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 flex flex-col items-center max-w-4xl text-center">
        {/* Heading */}
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </h2>
        </FadeIn>

        {/* Gap between heading and text */}
        <div className="h-10 sm:h-14 md:h-16" />

        {/* Animated Paragraph */}
        <div className="max-w-[620px] text-center">
          <AnimatedText
            text={aboutParagraphText}
            className="font-medium leading-relaxed text-center"
          />
        </div>

        {/* Gap between text block and button */}
        <div className="h-12 sm:h-16 md:h-20" />

        {/* Badges & Social Links */}
        <FadeIn delay={0.2} y={20} className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-3 flex-wrap justify-center max-w-2xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#BBCCD7]/40 bg-[#BBCCD7]/10 text-[#BBCCD7] text-xs uppercase tracking-wider font-semibold">
              🎓 Air University -- BS Computer Science
            </span>
            <a
              href="https://github.com/hussnainahmedd"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D7E2EA]/30 text-[#D7E2EA] hover:bg-[#D7E2EA]/10 transition-colors text-xs uppercase tracking-wider font-medium"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub: hussnainahmedd
            </a>
            <a
              href="https://www.linkedin.com/in/hussnainn"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D7E2EA]/30 text-[#D7E2EA] hover:bg-[#D7E2EA]/10 transition-colors text-xs uppercase tracking-wider font-medium"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.66a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26z"/>
              </svg>
              LinkedIn: hussnainn
            </a>
            <a
              href="mailto:ha7886899@gmail.com"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D7E2EA]/30 text-[#D7E2EA] hover:bg-[#D7E2EA]/10 transition-colors text-xs uppercase tracking-wider font-medium"
            >
              <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/>
              </svg>
              ha7886899@gmail.com
            </a>
          </div>

          <ContactButton
            onClick={() => {
              window.location.href = 'mailto:ha7886899@gmail.com';
            }}
          />
        </FadeIn>
      </div>
    </section>
  );
};

export default AboutSection;
