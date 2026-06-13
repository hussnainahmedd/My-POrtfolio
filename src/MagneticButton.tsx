import { useRef, useEffect } from "react";
import type { ReactNode } from "react";
import gsap from "gsap";

interface Props {
  children: ReactNode;
  href?: string;
  className?: string;
  download?: boolean | string;
}

export default function MagneticButton({ children, href, className = "", download }: Props) {
  const buttonRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const text = textRef.current;
    if (!button || !text) return;

    const handleMouseMove = (e: Event) => {
      const mouseEvent = e as globalThis.MouseEvent;
      const { left, top, width, height } = button.getBoundingClientRect();
      const x = mouseEvent.clientX - (left + width / 2);
      const y = mouseEvent.clientY - (top + height / 2);

      // Move the button itself slightly
      gsap.to(button, {
        x: x * 0.4,
        y: y * 0.4,
        duration: 1,
        ease: "power3.out",
      });

      // Move the text inside even more for parallax
      gsap.to(text, {
        x: x * 0.2,
        y: y * 0.2,
        duration: 1,
        ease: "power3.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 1,
        ease: "elastic.out(1, 0.3)",
      });
      gsap.to(text, {
        x: 0,
        y: 0,
        duration: 1,
        ease: "elastic.out(1, 0.3)",
      });
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const commonProps = {
    className: `magnetic-btn ${className}`,
    style: {
      position: "relative" as const,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      padding: "0.8rem 1.5rem",
      background: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "30px",
      color: "var(--text-main)",
      textDecoration: "none",
      backdropFilter: "blur(10px)",
      transition: "background 0.3s ease, border-color 0.3s ease",
    }
  };

  const content = (
    <div ref={textRef} style={{ display: "flex", alignItems: "center", gap: "0.5rem", pointerEvents: "none" }}>
      {children}
    </div>
  );

  if (href) {
    return (
      <a ref={buttonRef as any} href={href} {...commonProps} download={download} target={href.startsWith("http") ? "_blank" : "_self"} rel="noreferrer">
        {content}
      </a>
    );
  }

  return (
    <button ref={buttonRef as any} {...commonProps}>
      {content}
    </button>
  );
}
