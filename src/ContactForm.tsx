import { useState } from "react";

export default function ContactForm() {
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
    <div style={{ marginTop: "3rem", width: "100%", maxWidth: "500px", margin: "3rem auto 0 auto" }}>
      {status === "success" ? (
        <div style={{
          padding: "2rem",
          background: "rgba(74, 222, 128, 0.1)",
          border: "1px solid rgba(74, 222, 128, 0.2)",
          borderRadius: "var(--radius-md)",
          color: "rgb(74, 222, 128)",
          fontFamily: "var(--font-mono)"
        }}>
          Thank you! Your message has been sent successfully.
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Web3Forms Access Key - Replace this with your actual key */}
          <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" />
          
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", textAlign: "left" }}>
            <label htmlFor="name" style={{ color: "var(--text-muted)", fontSize: "0.9rem", fontFamily: "var(--font-mono)" }}>Name</label>
            <input 
              type="text" 
              name="name" 
              id="name" 
              required
              style={{
                width: "100%",
                padding: "1rem",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "var(--radius-sm)",
                color: "var(--text-main)",
                fontFamily: "var(--font-body)",
                outline: "none",
                transition: "border-color 0.3s ease"
              }}
              onFocus={(e) => e.target.style.borderColor = "var(--accent)"}
              onBlur={(e) => e.target.style.borderColor = "rgba(255, 255, 255, 0.1)"}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", textAlign: "left" }}>
            <label htmlFor="email" style={{ color: "var(--text-muted)", fontSize: "0.9rem", fontFamily: "var(--font-mono)" }}>Email Address</label>
            <input 
              type="email" 
              name="email" 
              id="email" 
              required
              style={{
                width: "100%",
                padding: "1rem",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "var(--radius-sm)",
                color: "var(--text-main)",
                fontFamily: "var(--font-body)",
                outline: "none",
                transition: "border-color 0.3s ease"
              }}
              onFocus={(e) => e.target.style.borderColor = "var(--accent)"}
              onBlur={(e) => e.target.style.borderColor = "rgba(255, 255, 255, 0.1)"}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", textAlign: "left" }}>
            <label htmlFor="message" style={{ color: "var(--text-muted)", fontSize: "0.9rem", fontFamily: "var(--font-mono)" }}>Message</label>
            <textarea 
              name="message" 
              id="message" 
              required
              rows={5}
              style={{
                width: "100%",
                padding: "1rem",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "var(--radius-sm)",
                color: "var(--text-main)",
                fontFamily: "var(--font-body)",
                outline: "none",
                resize: "vertical",
                transition: "border-color 0.3s ease"
              }}
              onFocus={(e) => e.target.style.borderColor = "var(--accent)"}
              onBlur={(e) => e.target.style.borderColor = "rgba(255, 255, 255, 0.1)"}
            />
          </div>

          {status === "error" && (
             <p style={{ color: "rgb(239, 68, 68)", fontSize: "0.9rem" }}>Oops! Something went wrong. Make sure you added your Web3Forms Access Key.</p>
          )}

          <button 
            type="submit" 
            disabled={status === "submitting"}
            style={{
              marginTop: "1rem",
              padding: "1rem 2rem",
              background: "var(--accent)",
              color: "#050505",
              border: "none",
              borderRadius: "30px",
              fontFamily: "var(--font-heading)",
              fontWeight: 600,
              cursor: status === "submitting" ? "not-allowed" : "pointer",
              transition: "transform 0.2s ease, opacity 0.2s ease",
              opacity: status === "submitting" ? 0.7 : 1,
            }}
            onMouseOver={(e) => {
              if (status !== "submitting") e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseOut={(e) => {
              if (status !== "submitting") e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {status === "submitting" ? "Sending..." : "Send Message"}
          </button>
        </form>
      )}
    </div>
  );
}
