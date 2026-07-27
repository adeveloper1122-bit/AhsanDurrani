import { Project, Service, SkillCategory, TimelineItem, PricingPackage } from "../types";

export const AHSAN_INFO = {
  name: "Ahsan Durrani",
  tagline: "Senior Web Developer & Digital Solution Engineer",
  email: "AhsanDurraniHR@gmail.com",
  phone: "+92 3180598980",
  whatsappUrl: "https://wa.me/923180598980",
  facebook: "https://www.facebook.com/AhsanDurrani907/",
  linkedin: "https://pk.linkedin.com/in/ahsan-durrani",
  github: "https://github.com/ahsan-durrani",
  location: "Islamabad, Pakistan / Remote Worldwide",
  bio: "Ahsan Durrani is a Senior Web Developer & Digital Solution Engineer with over 5 years of experience designing and engineering high-performance websites, complex web applications, custom WordPress themes/plugins, Laravel platforms, AI automation systems, and enterprise website security solutions.",
  coreMessage: "I design and develop high-performance websites, web applications, AI-powered solutions, and digital experiences that help businesses grow.",
  stats: [
    { value: "100+", label: "Projects Delivered" },
    { value: "50+", label: "Happy Global Clients" },
    { value: "5+", label: "Years Experience" },
    { value: "20+", label: "Tech Stack Tools" },
  ],
  rotatingTitles: [
    "WordPress Developer",
    "Full Stack Developer",
    "Laravel Developer",
    "Frontend Engineer",
    "Backend Developer",
    "AI Automation Specialist",
    "UI/UX Designer",
    "SEO Specialist",
    "Website Security Expert",
  ]
};

export const PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "ApexFlow — AI-Powered Enterprise ERP & CRM Dashboard",
    category: "Laravel",
    description: "A secure, multi-tenant Laravel enterprise dashboard featuring real-time analytics, automated client management, and custom AI assistant integration.",
    longDescription: "ApexFlow was built for a fast-growing SaaS enterprise requiring real-time revenue analytics, automated invoice generation, and AI-driven client sentiment tracking. Built with Laravel 11, React 19, Inertia.js, and Redis caching.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    technologies: ["Laravel", "React", "MySQL", "Redis", "Tailwind CSS", "Gemini API", "Chart.js"],
    liveUrl: "https://example.com/apexflow",
    problem: "The client was struggling with fragmented legacy software that caused slow reporting, data sync lag, and manual client support overhead.",
    solution: "Ahsan engineered a unified Laravel SaaS architecture with custom REST APIs, automated queue workers, and an embedded AI chatbot for instant analytics generation.",
    results: [
      "400% faster data loading speed via Redis query caching",
      "Saved 25+ hours weekly in manual report creation",
      "Achieved 99.98% uptime across 15,000 active monthly users"
    ],
    featured: true
  },
  {
    id: "proj-2",
    title: "Luxura Commerce — Custom Headless WordPress & WooCommerce Marketplace",
    category: "WordPress",
    description: "High-end luxury e-commerce platform built with custom WordPress PHP theme, decoupled REST API, and sub-second page transition rendering.",
    longDescription: "Designed for a premium international fashion brand, Luxura Commerce combines custom WooCommerce checkout hooks, multi-currency payment gateways, and a custom Gutenberg block library.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
    technologies: ["WordPress", "WooCommerce", "PHP 8.3", "JavaScript ES6", "Tailwind CSS", "Stripe API"],
    liveUrl: "https://example.com/luxura",
    problem: "The previous store suffered from slow speeds (7.4s load time), security vulnerabilities, and checkout abandonment rate of over 68%.",
    solution: "Rebuilt from the ground up using custom clean PHP code without bloated page builders, reducing database queries from 180 to 22 per page.",
    results: [
      "Reduced page load time from 7.4s to 0.8s (100/100 Core Web Vitals)",
      "32% increase in checkout conversions within 30 days",
      "Zero security incidents after implementing custom security headers and Cloudflare WAF"
    ],
    featured: true
  },
  {
    id: "proj-3",
    title: "CyberShield Guard — Automated Web Security & Malware Cleanup Suite",
    category: "Custom Systems",
    description: "Automated vulnerability scanner, malware cleanup tool, and server hardening suite built for high-traffic client websites.",
    longDescription: "CyberShield provides continuous file integrity monitoring, automatic malware signature removal, custom firewall rules, and automated cloud database backup automation.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    technologies: ["PHP", "Python", "Bash", "Cloudflare API", "MySQL", "Linux Hardening"],
    liveUrl: "https://example.com/cybershield",
    problem: "High-value business websites were suffering from brute-force DDoS attacks, malicious script injections, and blacklisting on Google.",
    solution: "Ahsan developed a custom server security suite that monitors file hashes, cleans infected database tables, and blocks malicious botnets automatically.",
    results: [
      "Cleaned and restored 120+ hacked WordPress sites without data loss",
      "Blocked over 1.2M malicious bot requests per month",
      "Restored blacklisted domain status on Google Search Console within 48 hours"
    ],
    featured: true
  },
  {
    id: "proj-4",
    title: "Nexus AI — Smart Customer Engagement & Lead Qualification Bot",
    category: "AI",
    description: "AI-powered conversational system integrated into corporate portals, qualifying leads and scheduling calls automatically.",
    longDescription: "Nexus AI leverages Google Gemini API models to understand visitor intent, recommend relevant services, calculate instant project quotes, and push warm leads directly to CRM.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    technologies: ["React", "TypeScript", "Node.js", "Express", "Gemini API", "Tailwind CSS"],
    liveUrl: "https://example.com/nexus-ai",
    problem: "Sales teams were missing qualified leads during off-hours and spending too much time answering repetitive pricing questions.",
    solution: "Engineered a custom AI widget with custom knowledge grounding, multi-language support, and real-time appointment booking.",
    results: [
      "Generated 240% more inbound leads during off-business hours",
      "Decreased sales cycle response time from 12 hours to 2 seconds",
      "Customer satisfaction score rose to 98.4%"
    ],
    featured: true
  },
  {
    id: "proj-5",
    title: "Vanguard Real Estate — High-Converting Property Portal & Map System",
    category: "Business",
    description: "Modern real estate platform with interactive property filtering, custom dynamic maps, virtual tour embeds, and agent portal.",
    longDescription: "A feature-rich real estate application built for property brokers featuring custom CRM integration, automated PDF brochures, and real-time property status updates.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
    technologies: ["Laravel", "Vue.js", "Tailwind CSS", "Mapbox API", "MySQL"],
    liveUrl: "https://example.com/vanguard",
    problem: "Slow property search experience, clunky mobile layout, and difficult property management for agents.",
    solution: "Built a lightning-fast responsive interface with instant search filters and dynamic map clustering.",
    results: [
      "2.5x increase in time spent on page",
      "Mobile traffic conversion increased by 45%",
      "Agents listed 300+ properties in the first month"
    ],
    featured: false
  },
  {
    id: "proj-6",
    title: "PulseAnalytics — Technical SEO & Core Web Vitals Monitor",
    category: "Dashboard",
    description: "SaaS dashboard tracking website speed performance, broken links, schema markups, and Google indexation in real-time.",
    longDescription: "Provides automated weekly technical SEO audits, site speed benchmarks, lighthouse scores, and actionable optimization roadmaps.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    technologies: ["React", "Next.js", "Node.js", "Google PageSpeed API", "Recharts"],
    liveUrl: "https://example.com/pulseanalytics",
    problem: "Agencies lacked a single clean dashboard to present white-label speed & SEO reports to their executive clients.",
    solution: "Engineered an elegant dark-mode dashboard with PDF export capabilities and automated audit alerts.",
    results: [
      "Helped 40+ agency clients achieve 95+ PageSpeed scores",
      "Automated 1,000+ monthly audit reports",
      "Zero performance overhead"
    ],
    featured: false
  }
];

export const SERVICES: Service[] = [
  {
    id: "serv-1",
    title: "Website Development",
    iconName: "Code2",
    description: "Modern, responsive, high-converting websites crafted for businesses, startups, and global brands looking for a standout online presence.",
    features: [
      "Custom UI/UX & Responsive Layouts",
      "Fast Loading Speed (< 1s)",
      "Technical SEO & Schema Built-in",
      "Interactive Animations & Micro-interactions",
      "Cross-browser & Mobile Optimization"
    ],
    popular: true
  },
  {
    id: "serv-2",
    title: "WordPress Development",
    iconName: "Globe",
    description: "Professional WordPress solutions ranging from bespoke PHP theme development to custom plugins, WooCommerce stores, and membership systems.",
    features: [
      "Custom Theme Development (No bloated builders)",
      "Custom Plugin Engineering",
      "WooCommerce Setup & Gateway Integration",
      "Speed Optimization & Database Cleanup",
      "Security Hardening & Maintenance"
    ],
    popular: true
  },
  {
    id: "serv-3",
    title: "Laravel Applications",
    iconName: "Server",
    description: "Scalable, secure, enterprise-grade web applications, administrative dashboards, RESTful APIs, and custom SaaS platforms built with Laravel.",
    features: [
      "Custom Web Application Architecture",
      "Role-Based Authentication & Permissions",
      "REST & GraphQL API Engineering",
      "Database Optimization (MySQL/PostgreSQL)",
      "Automated Queue Workers & Background Jobs"
    ]
  },
  {
    id: "serv-4",
    title: "AI & Automation Solutions",
    iconName: "Bot",
    description: "Smart AI integration, custom conversational chatbots, automated workflow pipelines, and intelligent data processing to scale productivity.",
    features: [
      "Custom AI Chatbots (Gemini / OpenAI)",
      "Automated CRM & Lead Qualification",
      "API & Workflow Integrations",
      "Smart Content & Data Analysis",
      "Custom Fine-tuned AI Agents"
    ],
    popular: true
  },
  {
    id: "serv-5",
    title: "Website Security & Malware Cleanup",
    iconName: "ShieldCheck",
    description: "Complete security protection for hacked or vulnerable websites, including instant malware removal, security audit, and server hardening.",
    features: [
      "Hacked Website Malware Removal",
      "Blacklist Removal (Google / McAfee)",
      "Server Hardening & Firewall Setup",
      "Brute-force & DDoS Protection",
      "Automated Cloud Backup Systems"
    ]
  },
  {
    id: "serv-6",
    title: "SEO & Speed Optimization",
    iconName: "Zap",
    description: "Boost organic search rankings and achieve 90+ PageSpeed Insights scores across mobile and desktop devices.",
    features: [
      "Core Web Vitals Optimization",
      "Technical SEO & On-Page Audit",
      "Structured Data & Schema Markup",
      "Image & Code Compression",
      "Google Search Console & Indexing Setup"
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend Development",
    description: "Creating fluid, responsive, 60fps user interfaces with cutting-edge visual design.",
    icon: "Layout",
    skills: [
      { name: "HTML5 / CSS3", level: 98 },
      { name: "JavaScript (ES6+)", level: 95 },
      { name: "React 19 & Next.js", level: 92 },
      { name: "Tailwind CSS", level: 96 },
      { name: "GSAP & Motion", level: 90 },
      { name: "Three.js / Canvas", level: 85 }
    ]
  },
  {
    title: "Backend Development",
    description: "Architecting robust backend servers, database pipelines, and secure API gateways.",
    icon: "Server",
    skills: [
      { name: "PHP 8.x", level: 96 },
      { name: "Laravel Framework", level: 94 },
      { name: "Node.js & Express", level: 88 },
      { name: "RESTful APIs", level: 95 },
      { name: "MySQL & Database Design", level: 92 },
      { name: "Redis Caching", level: 85 }
    ]
  },
  {
    title: "WordPress Mastery",
    description: "Deep expertise in custom WordPress engineering without relying on slow visual builders.",
    icon: "Globe",
    skills: [
      { name: "Custom Theme Engineering", level: 98 },
      { name: "Custom Plugin Development", level: 94 },
      { name: "WooCommerce Customization", level: 95 },
      { name: "Hooks, Actions & Filters", level: 98 },
      { name: "Gutenberg Custom Blocks", level: 90 },
      { name: "DB Optimization & Speed", level: 96 }
    ]
  },
  {
    title: "AI & Automation",
    description: "Connecting AI models to business workflows to automate repetitive tasks and engage users.",
    icon: "Cpu",
    skills: [
      { name: "Gemini API Integration", level: 94 },
      { name: "OpenAI API", level: 92 },
      { name: "AI Chatbots & Agents", level: 95 },
      { name: "Webhook Pipelines", level: 90 },
      { name: "Python Automation", level: 85 }
    ]
  },
  {
    title: "Security & DevOps",
    description: "Hardening servers, cleaning malware, and deploying bulletproof cloud setups.",
    icon: "Shield",
    skills: [
      { name: "Malware Removal & Recovery", level: 98 },
      { name: "Cloudflare WAF Setup", level: 95 },
      { name: "Linux Server Management", level: 88 },
      { name: "SSL & Security Headers", level: 96 },
      { name: "Git & Version Control", level: 94 }
    ]
  },
  {
    title: "SEO & Performance",
    description: "Optimizing search visibility, schema architecture, and Core Web Vitals.",
    icon: "TrendingUp",
    skills: [
      { name: "Core Web Vitals Tuning", level: 96 },
      { name: "Technical SEO Audits", level: 95 },
      { name: "Schema & JSON-LD", level: 94 },
      { name: "On-Page Optimization", level: 92 },
      { name: "Google Analytics & GTM", level: 90 }
    ]
  }
];

export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    year: "2024 — PRESENT",
    title: "Senior Web Developer & Digital Solution Engineer",
    role: "Lead Architect",
    company: "Freelance & Enterprise Digital Consultancy",
    description: "Architecting custom web applications, AI integrations, custom WordPress/WooCommerce themes, and high-performance Laravel platforms for clients across USA, UK, UAE, and Pakistan.",
    tags: ["Laravel", "WordPress", "React", "AI Solutions", "Security", "SEO"]
  },
  {
    year: "2022 — 2024",
    title: "Lead Full Stack & WordPress Developer",
    role: "Full Stack Engineer",
    company: "Digital Product Agency",
    description: "Led a team of developers building custom web applications, e-commerce portals, and enterprise security hardening workflows. Reduced average site load times by 65%.",
    tags: ["WordPress PHP", "Laravel", "REST APIs", "MySQL", "Tailwind CSS"]
  },
  {
    year: "2020 — 2022",
    title: "WordPress & Frontend Specialist",
    role: "Frontend Developer",
    company: "TechSolutions Global",
    description: "Developed over 40+ custom responsive websites, WooCommerce stores, and interactive landing pages with custom GSAP scroll animations.",
    tags: ["HTML5/CSS3", "JavaScript", "WordPress", "Bootstrap", "PHP"]
  },
  {
    year: "2019 — 2020",
    title: "Software Engineering & Web Development Foundation",
    role: "Junior Developer",
    company: "Tech Academy",
    description: "Mastered computer science fundamentals, object-oriented programming in PHP, relational database modeling, and modern web standards.",
    tags: ["PHP", "MySQL", "JavaScript", "CSS3", "Algorithms"]
  }
];

export const PRICING_PACKAGES: PricingPackage[] = [
  {
    id: "pkg-starter",
    name: "Starter Package",
    tagline: "Perfect for startups, small businesses, & single high-converting landing pages.",
    price: "$499",
    period: "One-Time",
    features: [
      "Custom Modern Landing Page / Business Site (Up to 5 Pages)",
      "100% Mobile Responsive Layout",
      "Basic On-Page SEO & Meta Setup",
      "Interactive Contact Form & Google Maps",
      "Fast Speed & Performance Optimization",
      "Social Media & WhatsApp Integration",
      "14 Days Post-Launch Support"
    ],
    ctaText: "Choose Starter",
    recommendedFor: "Small Businesses & Landing Pages"
  },
  {
    id: "pkg-professional",
    name: "Professional Package",
    tagline: "Our most popular package for growing businesses needing custom WordPress or CMS portals.",
    price: "$1,299",
    period: "One-Time",
    popular: true,
    features: [
      "Custom WordPress / CMS Website (Up to 10 Pages)",
      "Bespoke Design (No bloated themes)",
      "Full WooCommerce E-commerce or Booking System Setup",
      "Advanced GSAP Smooth Animations & Glassmorphism",
      "Technical SEO Audit & Schema Markup",
      "Website Security Hardening & Firewall Setup",
      "90+ Core Web Vitals Speed Optimization",
      "30 Days Post-Launch Support & Training"
    ],
    ctaText: "Get Professional",
    recommendedFor: "E-Commerce, CMS & Growing Brands"
  },
  {
    id: "pkg-enterprise",
    name: "Enterprise Package",
    tagline: "Custom web applications, Laravel platforms, AI tools, and enterprise security.",
    price: "$2,999+",
    period: "Custom Quote",
    features: [
      "Custom Laravel Web Application or SaaS System",
      "Custom AI Chatbot or Gemini API Automation",
      "Role-Based Admin Dashboard & Analytics",
      "Custom RESTful API Engineering",
      "High-Traffic Database Optimization",
      "Enterprise Website Security & Malware Shield",
      "Priority 24/7 Dedicated Support",
      "60 Days Post-Launch Guarantee"
    ],
    ctaText: "Request Enterprise Quote",
    recommendedFor: "SaaS Apps, AI Portals & Custom Laravel"
  }
];

export const FAQS = [
  {
    q: "Why should I hire Ahsan Durrani over other developers?",
    a: "Ahsan brings a rare blend of clean full-stack coding (Laravel, React, Node) along with deep WordPress mastery and website security expertise. Instead of relying on slow page builders or template bloat, Ahsan writes clean, lightning-fast code that ranks high on Google and converts visitors into buyers."
  },
  {
    q: "How long does a typical project take to complete?",
    a: "Starter landing pages take 5 to 7 days. Professional custom WordPress or e-commerce websites typically take 2 to 3 weeks. Custom Laravel applications or AI integrations usually take 3 to 6 weeks depending on requirement complexity."
  },
  {
    q: "Do you offer website maintenance and security after launch?",
    a: "Yes! Every package includes complimentary post-launch support (ranging from 14 to 60 days). Furthermore, Ahsan offers monthly maintenance, backup monitoring, and security hardening packages."
  },
  {
    q: "Can Ahsan fix a hacked or infected website?",
    a: "Absolutely. Ahsan specializes in emergency malware removal, cleaning backdoor infections, removing Google blacklists, and hardening server security to prevent future attacks."
  },
  {
    q: "How does the AI Chatbot and Cost Calculator work on this portfolio?",
    a: "You can interact directly with 'Ahsan AI' (bottom right) or use the interactive Project Cost Calculator to estimate project scopes, budget ranges, and timelines based on your exact feature requirements!"
  }
];
