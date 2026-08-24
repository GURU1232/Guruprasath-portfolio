import { usePortfolio } from "../context/PortfolioContext";
import { iconMap } from "./icons";

export default function Skills() {
  const { skills = [] } = usePortfolio();

  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="eyebrow">Toolkit</div>
        <h2 className="section-title">
          Technical <em>Sovereignty.</em>
        </h2>

        <div className="skills-grid">
          {skills.map((group) => {
            const Icon = iconMap[group.icon] || iconMap["code"];
            return (
              <div className="skill-card" key={group.category}>
                <div className="skill-card-head">
                  <span className="skill-icon">
                    <Icon />
                  </span>
                  <span className="skill-category">{group.category}</span>
                </div>
                <div className="chip-row">
                  {group.items.map((item) => (
                    <span className="chip" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
