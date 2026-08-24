const common = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const CodeIcon = () => (
  <svg {...common}>
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

export const BrainIcon = () => (
  <svg {...common}>
    <path d="M9.5 2a3.5 3.5 0 0 0-3.5 3.5V6a3 3 0 0 0-2 5.24A3 3 0 0 0 6 17a3.5 3.5 0 0 0 3.5 3.5" />
    <path d="M14.5 2A3.5 3.5 0 0 1 18 5.5V6a3 3 0 0 1 2 5.24A3 3 0 0 1 18 17a3.5 3.5 0 0 1-3.5 3.5" />
    <path d="M9.5 2v18.5" />
    <path d="M14.5 2v18.5" />
  </svg>
);

export const SparkIcon = () => (
  <svg {...common}>
    <path d="M12 2l1.8 5.6L19.5 9.4 13.8 11.2 12 17l-1.8-5.8L4.5 9.4l5.7-1.8z" />
  </svg>
);

export const DbIcon = () => (
  <svg {...common}>
    <ellipse cx="12" cy="5" rx="8" ry="3" />
    <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
    <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
  </svg>
);

export const MicIcon = () => (
  <svg {...common}>
    <rect x="9" y="2" width="6" height="12" rx="3" />
    <path d="M5 10a7 7 0 0 0 14 0" />
    <line x1="12" y1="19" x2="12" y2="22" />
  </svg>
);

export const ChartIcon = () => (
  <svg {...common}>
    <line x1="4" y1="20" x2="20" y2="20" />
    <rect x="6" y="12" width="3" height="7" />
    <rect x="11" y="7" width="3" height="12" />
    <rect x="16" y="4" width="3" height="15" />
  </svg>
);

export const MailIcon = () => (
  <svg {...common}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 6-10 7L2 6" />
  </svg>
);

export const LinkedinIcon = () => (
  <svg {...common}>
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
    <path d="M10 21v-7a2 2 0 0 1 4 0v7" />
    <path d="M10 12h4" />
    <path d="M18 21v-6a3 3 0 0 0-6 0" />
  </svg>
);

export const PhoneIcon = () => (
  <svg {...common}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.68 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.32 1.85.55 2.81.68A2 2 0 0 1 22 16.92z" />
  </svg>
);

export const PinIcon = () => (
  <svg {...common}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const ArrowIcon = () => (
  <svg {...common} width="14" height="14">
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

export const SendIcon = () => (
  <svg {...common} width="16" height="16">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

export const iconMap = {
  code: CodeIcon,
  brain: BrainIcon,
  spark: SparkIcon,
  db: DbIcon,
  mic: MicIcon,
  chart: ChartIcon,
};
