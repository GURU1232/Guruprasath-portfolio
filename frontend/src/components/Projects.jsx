import { usePortfolio } from "../context/PortfolioContext";
import { ArrowIcon } from "./icons";

export default function Projects() {
  const { projects = [] } = usePortfolio();

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="eyebrow">Selected work</div>
        <h2 className="section-title">
          Impact & <em>Execution.</em>
        </h2>

        <div className="projects-grid">
          {projects.map((p) => (
            <div className="project-card" key={p.title}>
              <span className="metric-badge">{p.metric}</span>
              <div className="project-title">{p.title}</div>
              <p className="project-desc">{p.description}</p>

              {p.bullets && p.bullets.length > 0 && (
                <ul className="project-bullets">
                  {p.bullets.map((bullet, idx) => (
                    <li key={idx}>{bullet}</li>
                  ))}
                </ul>
              )}

              <div className="chip-row" style={{ marginBottom: 20 }}>
                {p.tags.map((t) => (
                  <span className="chip" key={t}>
                    {t}
                  </span>
                ))}
              </div>
              <a href={p.link} className="project-link">
                Inquire details <ArrowIcon />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
