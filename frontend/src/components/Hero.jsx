import { useEffect, useState } from "react";
import { usePortfolio } from "../context/PortfolioContext";

function useTypedRoles(roles) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!roles || roles.length === 0) return;
    const current = roles[roleIndex % roles.length];
    const speed = deleting ? 35 : 65;

    const timeout = setTimeout(() => {
      if (!deleting) {
        if (displayed.length < current.length) {
          setDisplayed(current.slice(0, displayed.length + 1));
        } else {
          setTimeout(() => setDeleting(true), 1200);
        }
      } else {
        if (displayed.length > 0) {
          setDisplayed(current.slice(0, displayed.length - 1));
        } else {
          setDeleting(false);
          setRoleIndex((i) => (i + 1) % roles.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex, roles]);

  return displayed;
}

export default function Hero() {
  const { profile } = usePortfolio();
  const typed = useTypedRoles(profile?.roles || []);

  return (
    <section id="home" className="hero">
      <div className="container hero-grid">
        <div>
          <div className="eyebrow">Portfolio / {profile.location}</div>
          <h1 className="hero-heading">
            Let's Build
            <br />
            <span className="accent">The Future.</span>
          </h1>
          <p className="hero-tagline">{profile.tagline}</p>
          <div className="hero-ctas">
            <a href="#projects" className="btn-primary">
              View Projects
            </a>
            <a href="#contact" className="btn-secondary">
              Get In Touch
            </a>
          </div>
        </div>

        <div className="terminal">
          <div className="terminal-bar">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
            <span className="terminal-title">whoami.sh</span>
          </div>
          <div className="terminal-body">
            <div className="terminal-line">
              <span className="terminal-prompt">$</span>
              <span className="terminal-value">whoami</span>
            </div>
            <div className="terminal-line">
              <span className="terminal-prompt">&gt;</span>
              <span className="terminal-value">{profile.name}</span>
            </div>
            <div className="terminal-line">
              <span className="terminal-prompt">$</span>
              <span className="terminal-value">role --current</span>
            </div>
            <div className="terminal-line">
              <span className="terminal-prompt">&gt;</span>
              <span className="terminal-value">
                {typed}
                <span className="terminal-cursor" />
              </span>
            </div>
            <div className="terminal-line" style={{ marginTop: 24 }}>
              <span className="terminal-prompt">$</span>
              <span className="terminal-value">location --show</span>
            </div>
            <div className="terminal-line">
              <span className="terminal-prompt">&gt;</span>
              <span className="terminal-value">{profile.location}</span>
            </div>
            <div className="terminal-line">
              <span className="terminal-prompt">$</span>
              <span className="terminal-value">status --availability</span>
            </div>
            <div className="terminal-line">
              <span className="terminal-prompt">&gt;</span>
              <span className="terminal-value" style={{ color: "var(--teal)" }}>
                open to opportunities
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
