import React, { useState } from 'react';
import FadeIn from './FadeIn';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    
    // Open email client with form data
    const mailtoUrl = `mailto:ha7886899@gmail.com?subject=${encodeURIComponent(
      formData.subject || 'Portfolio Inquiry from ' + formData.name
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    
    window.location.href = mailtoUrl;
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="bg-[#0C0C0C] text-[#D7E2EA] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-20 px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-16 w-full border-t border-[#D7E2EA]/10"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Section Heading */}
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase text-center mb-6 leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 11vw, 150px)' }}
          >
            Contact me
          </h2>
        </FadeIn>

        {/* Subtitle */}
        <FadeIn delay={0.1} y={20}>
          <p className="text-[#D7E2EA]/70 font-light text-center text-base sm:text-lg md:text-xl max-w-2xl mb-16 sm:mb-20">
            Let&apos;s collaborate on your next web application, mobile app, or software project. Feel free to reach out anytime!
          </p>
        </FadeIn>

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 w-full mb-20 items-start">
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <FadeIn delay={0.15} x={-30}>
              <div className="p-6 sm:p-8 rounded-[30px] sm:rounded-[40px] bg-[#141414] border border-[#D7E2EA]/15 flex flex-col gap-3">
                <span className="text-xs uppercase tracking-widest text-[#BBCCD7] font-semibold">Email</span>
                <a
                  href="mailto:ha7886899@gmail.com"
                  className="text-lg sm:text-xl md:text-2xl font-medium text-[#D7E2EA] hover:text-[#BBCCD7] transition-colors break-all"
                >
                  ha7886899@gmail.com
                </a>
                <p className="text-xs text-[#D7E2EA]/50">Primary inbox for project inquiries & collaborations</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.25} x={-30}>
              <div className="p-6 sm:p-8 rounded-[30px] sm:rounded-[40px] bg-[#141414] border border-[#D7E2EA]/15 flex flex-col gap-3">
                <span className="text-xs uppercase tracking-widest text-[#BBCCD7] font-semibold">Phone / WhatsApp</span>
                <a
                  href="tel:03283637461"
                  className="text-lg sm:text-xl md:text-2xl font-medium text-[#D7E2EA] hover:text-[#BBCCD7] transition-colors"
                >
                  +92 328 3637461
                </a>
                <p className="text-xs text-[#D7E2EA]/50">Available for calls and instant messages</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.35} x={-30}>
              <div className="p-6 sm:p-8 rounded-[30px] sm:rounded-[40px] bg-[#141414] border border-[#D7E2EA]/15 flex flex-col gap-3">
                <span className="text-xs uppercase tracking-widest text-[#BBCCD7] font-semibold">Location & Education</span>
                <div className="text-base sm:text-lg font-medium text-[#D7E2EA]">F8, Islamabad, Pakistan</div>
                <div className="text-xs text-[#D7E2EA]/60">Air University Islamabad -- BSCS Student</div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <FadeIn delay={0.2} x={30}>
              <form
                onSubmit={handleSubmit}
                className="p-6 sm:p-8 md:p-10 rounded-[30px] sm:rounded-[40px] bg-[#141414] border border-[#D7E2EA]/15 flex flex-col gap-6 shadow-2xl"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-wider text-[#D7E2EA]/70 font-medium">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-2xl bg-[#0C0C0C] border border-[#D7E2EA]/20 text-[#D7E2EA] placeholder-[#D7E2EA]/30 focus:outline-none focus:border-[#BBCCD7] transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-wider text-[#D7E2EA]/70 font-medium">Your Email</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-2xl bg-[#0C0C0C] border border-[#D7E2EA]/20 text-[#D7E2EA] placeholder-[#D7E2EA]/30 focus:outline-none focus:border-[#BBCCD7] transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wider text-[#D7E2EA]/70 font-medium">Subject</label>
                  <input
                    type="text"
                    placeholder="Project Inquiry / Hiring"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-2xl bg-[#0C0C0C] border border-[#D7E2EA]/20 text-[#D7E2EA] placeholder-[#D7E2EA]/30 focus:outline-none focus:border-[#BBCCD7] transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wider text-[#D7E2EA]/70 font-medium">Your Message</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell me about your project requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-2xl bg-[#0C0C0C] border border-[#D7E2EA]/20 text-[#D7E2EA] placeholder-[#D7E2EA]/30 focus:outline-none focus:border-[#BBCCD7] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#646973] to-[#BBCCD7] text-[#0C0C0C] font-semibold uppercase tracking-wider text-sm hover:opacity-90 transition-opacity shadow-lg"
                >
                  Send Message
                </button>

                {submitted && (
                  <p className="text-center text-sm text-green-400 font-medium">
                    Opening your email client to send message to ha7886899@gmail.com!
                  </p>
                )}
              </form>
            </FadeIn>
          </div>
        </div>

        {/* Bottom Socials & Copyright */}
        <div className="w-full pt-10 border-t border-[#D7E2EA]/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-[#D7E2EA]/50">
          <div>© {new Date().getFullYear()} Hussnain Ahmad. All rights reserved.</div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/hussnainahmedd"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D7E2EA] transition-colors uppercase tracking-wider text-xs"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/hussnainn"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D7E2EA] transition-colors uppercase tracking-wider text-xs"
            >
              LinkedIn
            </a>
            <a
              href="https://hussnainportfolio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D7E2EA] transition-colors uppercase tracking-wider text-xs"
            >
              Live Portfolio
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
