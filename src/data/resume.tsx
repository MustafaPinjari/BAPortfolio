import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";
import { Python } from "@/components/ui/svgs/python";
import { Postgresql } from "@/components/ui/svgs/postgresql";

export type SkillItem = {
  name: string;
  icon?: React.ComponentType<{ className?: string }>;
};

export type ProjectItem = {
  title: string;
  href?: string;
  dates: string;
  active: boolean;
  description: string;
  technologies: readonly string[];
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  image?: string;
  video?: string;
};

export type HackathonItem = {
  title: string;
  dates: string;
  location: string;
  description: string;
  image?: string;
  win?: string;
  project?: string;
  mlh?: string;
  links?: readonly {
    title: string;
    icon?: React.ReactNode;
    href: string;
  }[];
};

export const DATA = {
  name: "Mustafa Pinjari",
  initials: "MP",
  url: "https://mustafa-pinjari.vercel.app",
  location: "India",
  locationLink: "https://www.google.com/maps/place/India",
  description:
    "Business Analyst & Technical Product Builder. Turning Business Problems into Clear, Actionable Solutions.",
  summary:
    "I'm Mustafa Pinjari, a Business Analyst and technical product builder with experience working on digital products, requirement documentation, workflow improvement, and cross-functional problem-solving. I combine business analysis with technical knowledge to help teams turn ideas into practical solutions.\n\nI analyze business problems, identify opportunities for operational improvement, and translate stakeholder needs into structured requirements, detailed user stories, and clear acceptance criteria. With practical understanding of Agile/Scrum, SDLC, process mapping (As-Is / To-Be), REST APIs, and databases, I collaborate effectively with technical and business teams to align specifications with implementation. I enjoy building practical products and validating ideas through hands-on projects and hackathons.",
  avatarUrl: "/me.png",
  skills: [
    { name: "Requirements Elicitation" },
    { name: "Requirements Documentation" },
    { name: "BRD / FRD" },
    { name: "User Stories" },
    { name: "Acceptance Criteria" },
    { name: "Process Mapping" },
    { name: "As-Is / To-Be Analysis" },
    { name: "Gap Analysis" },
    { name: "Stakeholder Communication" },
    { name: "UAT Support" },
    { name: "Agile / Scrum" },
    { name: "SDLC" },
    { name: "SQL", icon: Postgresql },
    { name: "Microsoft Excel" },
    { name: "Power BI" },
    { name: "REST APIs" },
    { name: "Postman" },
    { name: "Python", icon: Python },
    { name: "Django" },
    { name: "MySQL" },
    { name: "API & Database Analysis" },
    { name: "Technical Documentation" },
    { name: "Jira" },
    { name: "Confluence" },
  ] as readonly SkillItem[],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "mustafapinjari344@gmail.com",
    tel: "",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/MustafaPinjari",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/mustafapinjari",
        icon: Icons.linkedin,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:mustafapinjari344@gmail.com",
        icon: Icons.email,
        navbar: true,
      },
    },
  },

  work: [
    {
      company: "TechEntrance",
      href: "#",
      badges: [] as readonly string[],
      location: "India",
      title: "Business Analyst / Technical Business Analysis Experience",
      logoUrl: "/techentrance.png",
      start: "July 2024",
      end: "December 2025",
      description:
        "Contributed to digital product initiatives through project-based business analysis. Understood business needs and defined functional requirements, preparing comprehensive functional specifications, user stories, and acceptance criteria. Coordinated requirements with technical implementation teams, analyzed existing workflows to identify process improvements, and supported product development while validating functional deliverables.",
    },
  ],
  education: [
    {
      school: "Master of Computer Applications (MCA)",
      href: "#",
      degree: "Currently Pursuing — Savitribai Phule Pune University",
      logoUrl: "/SPPU.png",
      start: "Pursuing",
      end: "Present",
    },
    {
      school: "Bachelor of Computer Applications (BCA)",
      href: "#",
      degree: "Undergraduate Degree — Sandip University",
      logoUrl: "/sandip.jpg",
      start: "Graduated",
      end: "Undergraduate",
    },
    {
      school: "Symbiosis Open Education Society (SOES)",
      href: "#",
      degree: "Business Analyst Certification (300 Hours) — GCC Employability & Skilling Program",
      logoUrl: "/symbosis.png",
      start: "Issued",
      end: "30 April 2026",
    },
  ],
  projects: [
    {
      title: "BAHub",
      href: "https://bahub-official.netlify.app/",
      dates: "2024 - Present",
      active: true,
      description:
        "An AI-powered Business Analysis and Product Collaboration Platform designed to support the requirements engineering lifecycle. Unifies BRD and FRD documentation workflows, structured user story decomposition with Gherkin acceptance criteria, AI-assisted requirements drafting, and centralized product documentation with Jira/Confluence integration concepts.",
      technologies: [
        "Business Analysis",
        "Requirements Engineering",
        "BRD / FRD",
        "User Stories",
        "Acceptance Criteria",
        "Traceability Matrix",
        "Django REST",
        "PostgreSQL",
      ],
      links: [
        {
          type: "Website",
          href: "https://bahub-official.netlify.app/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/BAHub AI Product Showcase.png",
      video: "",
    },
    {
      title: "NeuroCart",
      href: "#",
      dates: "2024",
      active: true,
      description:
        "A multi-vendor commerce platform involving order processing, billing, inventory, and transaction workflows. Analyzed 25+ functional requirements, evaluated API and database data flows, designed workflows for Razorpay payment integration and GST-related billing automation, and established operational reporting dashboards to monitor 1,000+ transactions.",
      technologies: [
        "Business Analysis",
        "Process Mapping",
        "Order & Inventory Workflows",
        "Razorpay Integration",
        "GST Billing Automation",
        "REST APIs",
        "MySQL",
      ],
      links: [],
      image: "/NeuroCart E-Commerce Dashboard Showcase.png",
      video: "",
    },
    {
      title: "WariMitra / VARIMITRA",
      href: "#",
      dates: "2024",
      active: true,
      description:
        "A digital safety platform designed for the Wari pilgrimage, focused on improving emergency response, coordination, and pilgrim safety. Defined functional specifications for an emergency SOS workflow with a 3-second hold mechanism, GPS coordinate capture, backend distress processing, and a web-based command-center interface. Formulated future roadmap for offline synchronization, IVR/SMS support, and missing-person assistance.",
      technologies: [
        "Requirements Analysis",
        "Emergency Workflows",
        "GPS Incident Tracking",
        "Command Center UI",
        "Firebase",
        "Functional Specifications",
      ],
      links: [],
      image: "/WariMitra Pilgrimage Safety Platform.png",
      video: "",
    },
    {
      title: "DuplicateBin",
      href: "https://duplicatebin.in/",
      dates: "2024 - 2025",
      active: true,
      description:
        "A duplicate-file management solution intended to help users identify and manage redundant files to reclaim storage. Analyzed user workflows and usability friction, specifying requirements for multi-threaded scanning, SQLite persistent hash caching, and a reversible quarantine archive system ensuring zero data loss.",
      technologies: [
        "Product Specifications",
        "Workflow Analysis",
        "Acceptance Criteria",
        "Python",
        "SQLite",
        "FastAPI",
        "Usability Engineering",
      ],
      links: [
        {
          type: "Website",
          href: "https://duplicatebin.in/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/DuplicateBin_ Reclaim Space Smarter.png",
      video: "",
    },
  ] as readonly ProjectItem[],
  hackathons: [
    {
      title: "TechDrill 2026",
      dates: "2026",
      location: "Sinhgad / Silicon Institute, Pune",
      win: "Runner-Up | Team Captain",
      project: "NeuroCart (Multi-Vendor Commerce)",
      description:
        "Led Team Chaos as Team Captain to secure Runner-Up. Formulated business requirements and system workflows for NeuroCart—a multi-vendor commerce platform with automated order-to-billing workflows, GST compliance, and real-time transaction tracking.",
      image: "",
      links: [],
    },
    {
      title: "Gameathon 2026 — ZIBACAR",
      dates: "2026",
      location: "ZIBACAR (Zeal Institute), Pune",
      win: "Runner-Up | Team Captain",
      project: "Last Signal (Human Protocol)",
      description:
        "Secured Runner-Up for conceptualizing and developing 'Last Signal', a survival communication protocol game modeling decentralized human coordination. Engineered peer-to-peer relay heuristics and resource-allocation decision trees under total signal loss.",
      image: "",
      links: [],
    },
    {
      title: "HackFusion — College ERP System",
      dates: "2024",
      location: "Guru Gobind Singh College, Nanded",
      project: "Campus ERP Workflow System",
      description:
        "Developed a centralized campus ERP workflow solution eliminating manual administrative bottlenecks across student admissions, attendance logging, timetable scheduling, and faculty record management with role-based access control.",
      image: "",
      links: [],
    },
    {
      title: "NASA Space Apps Challenge 2022 (Inauguration)",
      dates: "October 2023",
      location: "Global / Nashik",
      project: "NASA Space Exploration Portal",
      description:
        "Participated in the international NASA Space Apps Challenge, developing a public web portal for NASA. Integrated open space datasets to transform raw telemetry and astrophysics research into interactive educational models.",
      image: "",
      links: [],
    },
    {
      title: "SUN Hacks",
      dates: "2023",
      location: "Sandip University, Nashik",
      project: "E-Commerce Platform",
      description:
        "Built a full-featured e-commerce platform during SUN Hacks organized by Sandip University, Nashik. Defined functional specifications for product catalog browsing, cart session persistence, checkout funnel UX, and payment gateway flows under tight sprint constraints.",
      image: "",
      links: [],
    },
    {
      title: "NASA Space Apps Challenge — Satellite Application",
      dates: "2022",
      location: "Global / Nashik",
      project: "Meet (Satellite Telemetry Platform)",
      description:
        "Engineered 'Meet', a satellite-based web application connecting ground stations with satellite telemetry. Mapped user workflows for real-time orbital pass tracking, sensor telemetry visualization, and geographic coordinate overlay.",
      image: "",
      links: [],
    },
    {
      title: "SUN Hacks — The Hack",
      dates: "2022",
      location: "Sandip University, Nashik",
      project: "Adaptive Learning Platform",
      description:
        "Designed and developed an interactive e-learning platform at SUN Hacks hosted by Sandip University, Nashik. Engineered modular course progression roadmaps, interactive quiz modules, and student performance analytics dashboards to boost learning outcomes.",
      image: "",
      links: [],
    },
  ] as readonly HackathonItem[],
} as const;
