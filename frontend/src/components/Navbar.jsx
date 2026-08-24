// import { useEffect, useState, useCallback } from "react";
// import { profile } from "../data/portfolio";

// const links = [
//   { label: "Home", href: "#home", id: "home" },
//   { label: "Experience", href: "#experience", id: "experience" },
//   { label: "Skills", href: "#skills", id: "skills" },
//   { label: "Projects", href: "#projects", id: "projects" },
//   { label: "Contact", href: "#contact", id: "contact" },
// ];

// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [activeId, setActiveId] = useState("home");

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 24);
//     onScroll();
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   useEffect(() => {
//     const sections = links
//       .map((l) => document.getElementById(l.id))
//       .filter(Boolean);
//     if (sections.length === 0) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         const visible = entries
//           .filter((e) => e.isIntersecting)
//           .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
//         if (visible) setActiveId(visible.target.id);
//       },
//       { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
//     );

//     sections.forEach((s) => observer.observe(s));
//     return () => observer.disconnect();
//   }, []);

//   const closeMenu = useCallback(() => setOpen(false), []);

//   return (
//     <header className={`navbar-wrapper ${scrolled ? "is-scrolled" : ""}`}>
//       <div className="navbar-surface">
//         <a href="#home" className="logo-pill">
//           <span className="logo-mark">{profile.name[0]}</span>
//           <span className="logo-text">
//             {profile.name}
//             <span style={{ color: "var(--blue)" }}>.</span>
//           </span>
//         </a>

//         <div className="navbar-spacer" />
        
//         <div className="links-pill">
//           <div className="navbar-inner">
//             <nav className="nav-links">
//               {links.slice(0, -1).map((l) => (
//                 <a
//                   key={l.href}
//                   href={l.href}
//                   className={activeId === l.id ? "nav-link-active" : ""}
//                 >
//                   {l.label}
//                 </a>
//               ))}
//             </nav>

//             <a href="#contact" className="nav-cta">
//               Hire Me ↗
//             </a>

//             <button
//               className="nav-toggle"
//               aria-label="Toggle navigation menu"
//               aria-expanded={open}
//               onClick={() => setOpen((v) => !v)}
//             >
//               {open ? "✕" : "☰"}
//             </button>
//           </div>
//         </div>
//       </div>

//       {open && (
//         <div className="container mobile-menu" style={{ paddingBottom: 16 }}>
//           <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
//             {links.map((l) => (
//               <a
//                 key={l.href}
//                 href={l.href}
//                 onClick={closeMenu}
//                 className={activeId === l.id ? "nav-link-active" : ""}
//               >
//                 {l.label}
//               </a>
//             ))}
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }


import { useEffect, useRef, useState, useCallback } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { useTheme } from "../context/ThemeContext";

function SunIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

const links = [
  { label: "Home", href: "#home", id: "home" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Contact", href: "#contact", id: "contact" },
];

// Extra breathing room below the navbar so headings never touch it
const SCROLL_GAP = 28;

export default function Navbar() {
  const { profile } = usePortfolio();
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("home");
  const headerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter(Boolean);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const closeMenu = useCallback(() => setOpen(false), []);

  const scrollToSection = useCallback((id) => (e) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;

    const navHeight = headerRef.current
      ? headerRef.current.getBoundingClientRect().height
      : 90;

    const navBottom = headerRef.current
      ? headerRef.current.getBoundingClientRect().bottom
      : navHeight;

    const targetTop =
      target.getBoundingClientRect().top + window.scrollY - navBottom - SCROLL_GAP;

    window.scrollTo({ top: Math.max(targetTop, 0), behavior: "smooth" });
    setActiveId(id);
    closeMenu();
  }, [closeMenu]);

  return (
    <header
      ref={headerRef}
      className={`navbar-wrapper ${scrolled ? "is-scrolled" : ""}`}
    >
      <div className="navbar-surface">
        <a href="#home" className="logo-pill" onClick={scrollToSection("home")}>
          <span className="logo-mark">{profile.name[0]}</span>
          <span className="logo-text">
            {profile.name}
            <span style={{ color: "var(--blue)" }}>.</span>
          </span>
        </a>

        <div className="navbar-spacer" />

        <div className="links-pill">
          <div className="navbar-inner">
            <nav className="nav-links">
              {links.slice(0, -1).map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={scrollToSection(l.id)}
                  className={activeId === l.id ? "nav-link-active" : ""}
                >
                  {l.label}
                </a>
              ))}
            </nav>

            <button
              className="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "light" ? <MoonIcon /> : <SunIcon />}
            </button>

            <a href="#contact" className="nav-cta" onClick={scrollToSection("contact")}>
              Hire Me ↗
            </a>

            <button
              className="nav-toggle"
              aria-label="Toggle navigation menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="container mobile-menu" style={{ paddingBottom: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={scrollToSection(l.id)}
                className={activeId === l.id ? "nav-link-active" : ""}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}