import { useState } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { MailIcon, LinkedinIcon, PhoneIcon, PinIcon, SendIcon } from "./icons";

// Auto-shrinks long values (like emails) so they always fit on one line
// without ever being clipped or hidden — computed per-item in JS.
function getValueStyle(value) {
  if (!value) return {};
  const len = value.length;
  let fontSize = 14;

  if (len > 22) fontSize = 12.6;
  else if (len > 18) fontSize = 11.8;
  else if (len > 14) fontSize = 12.8;

  return {
    fontSize: `${fontSize}px`,
    fontWeight: 700,
    whiteSpace: "nowrap",
    color: "var(--text)",
    display: "inline-block",
    letterSpacing: "-0.02em",
  };
}

export default function Contact() {
  const { profile = {} } = usePortfolio();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ state: "idle", text: "" });

  const infoItems = [
    {
      icon: MailIcon,
      label: "Email",
      value: profile.email || "",
      color: "var(--blue)",
      href: profile.email ? `mailto:${profile.email}` : "#",
    },
    {
      icon: LinkedinIcon,
      label: "LinkedIn",
      value: profile.linkedinLabel || "LinkedIn",
      color: "#818cf8",
      href:
        profile.linkedin ||
        `https://linkedin.com/in/${profile.linkedinLabel}`,
    },
    {
      icon: PhoneIcon,
      label: "Phone",
      value: profile.phone || "",
      color: "var(--teal)",
      href: profile.phone ? `tel:${profile.phone.replace(/\s+/g, "")}` : "#",
    },
    {
      icon: PinIcon,
      label: "Location",
      value: profile.location || "",
      color: "#f472b6",
      href: null,
    },
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: "loading", text: "" });

    try {
      const apiBase = import.meta.env.VITE_API_URL || "";
      const res = await fetch(`${apiBase}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus({
        state: "success",
        text: data.message || "Message sent — thank you!",
      });
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus({ state: "error", text: err.message });
    }
  };

  return (
    <section id="contact" className="section" style={{ borderBottom: "none" }}>
      <div className="container">
        <div className="eyebrow">Let's talk</div>
        <h2 className="section-title">
          Get In <em>Touch.</em>
        </h2>

        <div className="contact-grid">
          <div className="contact-info-grid">
            {infoItems.map((item) => (
              <div className="contact-card" key={item.label}>
                <div
                  className="contact-card-icon"
                  style={{ color: item.color }}
                >
                  <item.icon />
                </div>

                <div className="contact-card-content">
                  <div className="contact-label">{item.label}</div>

                  {item.href ? (
                    <a
                      href={item.href}
                      target={
                        item.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        item.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="contact-value contact-link"
                      style={getValueStyle(item.value)}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <div
                      className="contact-value"
                      style={getValueStyle(item.value)}
                    >
                      {item.value}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="field">
                <label htmlFor="name">Your name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Describe your project or opportunity..."
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            <button
              className="submit-btn"
              type="submit"
              disabled={status.state === "loading"}
            >
              {status.state === "loading" ? "Sending..." : "Send message"}{" "}
              <SendIcon />
            </button>

            {status.state === "success" && (
              <p className="form-status success">✓ {status.text}</p>
            )}
            {status.state === "error" && (
              <p className="form-status error">✕ {status.text}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
