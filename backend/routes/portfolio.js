import { Router } from "express";

const router = Router();

export const portfolioData = {
  profile: {
    name: "Guruprasath K",
    title: "Software Development Engineer",
    subtitle: "Backend & Web Applications",
    roles: [
      "Software Development Engineer",
      "Full Stack Developer",
      "Backend & REST API Engineer",
      "Database & Systems Architect",
    ],
    summary:
      "Software Development Engineer with 2+ years of experience designing and building scalable web applications, RESTful APIs, and backend systems using Node.js, Express.js, MySQL, MongoDB, and Docker. Experienced in MVC-based application development, database architecture, microservices, production debugging, and Agile software development. Proven ability to design maintainable software, optimize application performance, evaluate technical solutions, and deliver production-ready features. Passionate about solving complex engineering problems and continuously learning advanced technologies.",
    tagline:
      "Bridging the gap between abstract data and actionable AI through scalable backend architectures and strategic collaboration.",
    location: "Chennai, India",
    email: "guruprasathk03@gmail.com",
    linkedin: "https://linkedin.com/in/guruprasathfsd",
    linkedinLabel: "guruprasathfsd",
    phone: "+91 9080594299",
    education: {
      degree: "Bachelor of Information Technology",
      institution: "Annamalai University, Chidambaram",
      period: "2019 – 2023",
      cgpa: "8.51 / 10",
    },
    certifications: [
      {
        title: "MERN Full Stack Development",
        issuer: "GUVI",
        location: "Chennai",
      },
      {
        title: "Firmware Engineering",
        issuer: "Boodskap Lab Network of Things",
        location: "Chennai",
      },
    ],
    languages: ["English", "Tamil"],
  },
  skills: [
    {
      category: "Languages & Core",
      icon: "code",
      items: ["JavaScript (ES6+)", "Dart", "Python", "SQL"],
    },
    {
      category: "Backend & Systems",
      icon: "brain",
      items: [
        "Node.js",
        "Express.js",
        "REST APIs",
        "Microservices",
        "MVC Architecture",
        "OOP Design",
      ],
    },
    {
      category: "Mobile & Frontend",
      icon: "spark",
      items: ["Flutter", "React", "React Native", "HTML5", "CSS3"],
    },
    {
      category: "Databases & Storage",
      icon: "db",
      items: [
        "MySQL",
        "MongoDB",
        "Redis",
        "PostgreSQL",
        "Schema Design",
        "Query Optimization",
        "Indexing",
      ],
    },
    {
      category: "DevOps & Tooling",
      icon: "mic",
      items: ["Docker", "GCP", "Git", "GitHub", "Postman", "Linux"],
    },
    {
      category: "Key Engineering Practices",
      icon: "chart",
      items: [
        "Database Migration",
        "API Integration",
        "Data Validation",
        "Performance Optimization",
        "Production Support",
        "Agile SDLC",
        "Debugging",
      ],
    },
  ],
  projects: [
    {
      title: "DearO — Workshop Management Platform",
      metric: "80+ Tables & 1M+ Records Migrated",
      description:
        "Planned and executed complete zero-data-loss database migration from MongoDB to MySQL: 80+ tables, 1M+ records, schema redesign, automated transformation scripts, and ORM reconfiguration.",
      tags: ["Node.js", "MongoDB", "MySQL", "Redis", "Docker", "MVC"],
      bullets: [
        "Diagnosed and resolved model configuration issues, cross-database relation errors, and authentication failures that surfaced during migration.",
        "Debugged containerized environment issues and validated full application stack post-migration to ensure production readiness.",
        "Designed modular backend architecture using MVC principles and improved application maintainability through reusable service layers.",
      ],
      link: "#",
    },
    {
      title: "Fit Valuation — Vehicle Assessment Platform",
      metric: "20+ Production APIs Rebuilt",
      description:
        "Refactored and rebuilt 20+ legacy backend APIs for vehicle assessment workflows. Added image session validation to enforce mandatory field capture and eliminate data loss.",
      tags: ["Node.js", "Express.js", "REST APIs", "MySQL", "Data Validation"],
      bullets: [
        "Built automated nightly report pipeline: data filtering, column-level pivot transformation, Excel generation, and scheduled email delivery.",
        "Fixed production-critical bugs including broken cron jobs, API failures, DB schema mismatches, and indexing errors with hands-on field support.",
        "Designed reusable backend modules and collaborated with cross-functional teams throughout the SDLC.",
      ],
      link: "#",
    },
    {
      title: "FinPilot — Personal Finance Planning Agent",
      metric: "LLM Finance Agent",
      description:
        "Built an AI-powered personal finance planning application featuring an LLM-powered Finance Agent with tool calling, deterministic financial calculation services, and containerized microservices.",
      tags: [
        "React Native",
        "Python",
        "FastAPI",
        "PostgreSQL",
        "Agentic AI",
        "Docker",
      ],
      bullets: [
        "Developed REST APIs for transactions, budgets, financial goals, debts, authentication, and financial analysis.",
        "Implemented LLM Finance Agent with tool calling for personalized budgeting, savings, debt, and goal recommendations.",
        "Designed agent orchestration layer, conversation memory, structured AI outputs, and safety guardrails for reliable agentic workflows.",
      ],
      link: "#",
    },
  ],
  experience: [
    {
      company: "TVS Mobility Solutions Pvt Ltd",
      shortCompany: "TVS Mobility",
      role: "Full Stack Developer",
      period: "Jan 2025 – Present",
      location: "Chennai, India",
      bullets: [
        "Executed zero-data-loss migration of 80+ tables and 1M+ records from MongoDB to MySQL, authored transformation scripts with precise type mapping, and reconfigured ORM layer across all modules.",
        "Rebuilt and optimized 20+ production REST APIs for the Fit Valuation platform, resolved third-party integration failures, and added image session validation to prevent data loss in vehicle assessment workflows.",
        "Resolved critical production bugs including DB schema mismatches, broken cron jobs, failing API endpoints, and indexing errors, reducing downtime for active field users.",
        "Provided direct field agent and business team support, bridging communication gaps and guiding end-users on platform workflows for smooth operations.",
        "Contributed to Docker-based infrastructure debugging, query optimization, and database indexing across platforms in Agile sprints.",
        "Designed backend modules following MVC architecture and built reusable components following clean coding standards to improve maintainability and scalability.",
      ],
    },
    {
      company: "Outworkx Solutions (Client: Wipro / Equitas Small Finance Bank)",
      shortCompany: "Outworkx Solutions",
      role: "Operations & Systems Support Engineer",
      period: "May 2024 – Dec 2024",
      location: "Chennai, India",
      bullets: [
        "Coordinated enterprise system operations across large branch network, collaborating with L2/L3 teams on system validation, network configuration, and data reconciliation.",
        "Automated audit and compliance reporting workflows using Excel, improving data accuracy and reducing turnaround time for internal teams.",
      ],
    },
    {
      company:"Vi MicroSystem Pvt Ltd",
      shortCompany:"Vi MicroSystem",
      role:"Embedded Software Engineer",
      period:"Aug 2023 – Nov 2023",
      location:"Chennai, India",
      bullets:[
        "Worked as a Trainer and Developer in VI MicroSystem Pvt.Ltd.",
        "Learned about the working principle of Embedded System by working on RP2040.",
        "Created a Realtime Project’s and guided the college students for their studies."
      ]
    },
    {
      company: "Boodskap Lab Network of Things",
      shortCompany: "Boodskap Lab",
      role: "Firmware Engineer",
      period: "Jul 2023 – Apr 2024",
      location: "Chennai, India",
      bullets: [
        "Integrated and optimized 50+ IoT devices with ESP-IDF framework, enhancing reliability and performance of end-to-end device ecosystems.",
        "Improved OTA (Over-the-Air) update success rates through robust firmware engineering, ensuring seamless device management and software delivery.",
        "Enhanced product quality by implementing rigorous testing protocols and validation procedures for IoT hardware and firmware, ensuring compliance with industry standards.",
      ],
    }
  ],
};

router.get("/", (req, res) => {
  res.json(portfolioData);
});

export default router;
