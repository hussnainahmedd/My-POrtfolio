import React, { useState } from "react";
import FadeIn from "./FadeIn";
import ContactButton from "./ContactButton";

export const ContactSection: React.FC = () => {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="bg-[#0C0C0C] text-[#D7E2EA] px-5 sm:px-8 md:px-10 py-24 sm:py-32 w-full relative z-20"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <FadeIn delay={0} y={40}>
          <p className="text-[#BBCCD7] text-sm uppercase tracking-[0.3em] font-medium mb-2">
            [ Let's Connect ]
          </p>
          <h2
            className="hero-heading font-black uppercase text-center mb-6 leading-none tracking-tight"
            style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}
          >
            Get In Touch
          </h2>
          <p className="text-[#D7E2EA]/70 text-base sm:text-lg max-w-xl mx-auto mb-12">
            Always open to discussing new projects, creative ideas, or opportunities to build outstanding web experiences together.
          </p>
        </FadeIn>

        <FadeIn delay={0.2} y={30} className="w-full max-w-xl">
          <div className="bg-neutral-900/50 backdrop-blur-2xl border border-[#D7E2EA]/20 rounded-3xl p-6 sm:p-10 shadow-2xl text-left">
            {status === "success" ? (
              <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 text-center font-medium">
                Thank you! Your message has been sent successfully. I will get back to you shortly!
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <input type="hidden" name="access_key" value="03b6e6ea-3c37-4da4-a109-0a896ea93c86" />

                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 font-medium">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    placeholder="Enter your name"
                    className="w-full px-4 py-3.5 bg-neutral-950/60 border border-[#D7E2EA]/20 rounded-xl text-[#D7E2EA] placeholder-[#D7E2EA]/30 outline-none focus:border-[#BBCCD7] transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    placeholder="name@domain.com"
                    className="w-full px-4 py-3.5 bg-neutral-950/60 border border-[#D7E2EA]/20 rounded-xl text-[#D7E2EA] placeholder-[#D7E2EA]/30 outline-none focus:border-[#BBCCD7] transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 font-medium">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    required
                    rows={4}
                    placeholder="How can I help you?"
                    className="w-full px-4 py-3.5 bg-neutral-950/60 border border-[#D7E2EA]/20 rounded-xl text-[#D7E2EA] placeholder-[#D7E2EA]/30 outline-none focus:border-[#BBCCD7] transition-colors resize-y"
                  />
                </div>

                {status === "error" && (
                  <p className="text-rose-400 text-xs">
                    Oops! Something went wrong sending the message. Please try emailing directly to ha7886899@gmail.com.
                  </p>
                )}

                <div className="flex justify-center mt-2">
                  <ContactButton
                    label={status === "submitting" ? "Sending..." : "Send Message"}
                  />
                </div>
              </form>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default ContactSection;
