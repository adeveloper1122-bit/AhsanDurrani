import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Globe,
  Flame,
  Code2,
  Zap,
  FileCode,
  Palette,
  Server,
  Database,
  Sparkles,
  ShieldCheck,
  Box,
  Terminal,
  Cpu,
  Layers,
  CheckCircle2,
  Star,
  Activity,
  ArrowUpRight
} from "lucide-react";
import { useAppStore } from "../store/useAppStore";
import { playClickSound, playHoverSound } from "../utils/audio";

interface TechItem {
  id: string;
  name: string;
  category: "Core & CMS" | "Full Stack & APIs" | "Cloud & DevOps" | "AI & Security";
  level: "Master" | "Expert" | "Senior" | "Advanced";
  years: string;
  desc: string;
  highlights: string[];
  icon: React.ElementType;
  color: string;
  featured?: boolean;
}

export const TechStack: React.FC = () => {
  const { soundEnabled } = useAppStore();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  const categories = [
    "All",
    "Core & CMS",
    "Full Stack & APIs",
    "Cloud & DevOps",
    "AI & Security",
  ];

  const techStack: TechItem[] = [
    {
      id: "wordpress",
      name: "WordPress",
      category: "Core & CMS",
      level: "Master",
      years: "5+ Yrs",
      desc: "Custom PHP Theme & Plugin Development, WooCommerce Engineering",
      highlights: ["Custom Gutenberg Blocks", "REST API Extensions", "Speed & Core Web Vitals"],
      icon: Globe,
      color: "from-blue-600 to-cyan-500",
      featured: true,
    },
    {
      id: "laravel",
      name: "Laravel 11",
      category: "Full Stack & APIs",
      level: "Expert",
      years: "4+ Yrs",
      desc: "Enterprise Multi-tenant SaaS, Robust REST APIs & Microservices",
      highlights: ["Eloquent ORM & Migrations", "Inertia.js & Livewire", "Queue Workers & Caching"],
      icon: Flame,
      color: "from-red-600 to-orange-500",
      featured: true,
    },
    {
      id: "php",
      name: "PHP 8.x",
      category: "Core & CMS",
      level: "Master",
      years: "5+ Yrs",
      desc: "Strictly Typed, OOP Architecture, Clean Code & Design Patterns",
      highlights: ["Attributes & Enums", "JIT Performance", "Legacy Code Refactoring"],
      icon: Terminal,
      color: "from-indigo-600 to-purple-500",
    },
    {
      id: "react",
      name: "React 19",
      category: "Full Stack & APIs",
      level: "Expert",
      years: "4+ Yrs",
      desc: "High-speed UI Components, Custom Hooks & State Management",
      highlights: ["React Fiber Architecture", "Concurrent Rendering", "Custom Hook Libraries"],
      icon: Code2,
      color: "from-cyan-500 to-blue-600",
      featured: true,
    },
    {
      id: "nextjs",
      name: "Next.js 15",
      category: "Full Stack & APIs",
      level: "Expert",
      years: "3+ Yrs",
      desc: "Production Server-Side Rendering, App Router & Server Actions",
      highlights: ["SSR & Static Generation", "API Routes Proxy", "SEO Optimization"],
      icon: Zap,
      color: "from-gray-200 to-gray-500",
      featured: true,
    },
    {
      id: "typescript",
      name: "TypeScript",
      category: "Full Stack & APIs",
      level: "Advanced",
      years: "4+ Yrs",
      desc: "End-to-End Type Safety, Generic Architecture & SDK Integration",
      highlights: ["Strict Type Inference", "Utility Types", "Interface Abstractions"],
      icon: FileCode,
      color: "from-blue-500 to-indigo-600",
    },
    {
      id: "tailwind",
      name: "Tailwind CSS",
      category: "Core & CMS",
      level: "Master",
      years: "4+ Yrs",
      desc: "Utility-First Responsive Styling, Custom Design Tokens & Animations",
      highlights: ["Tailwind v4 Setup", "Dark Mode System", "Custom Micro-interactions"],
      icon: Palette,
      color: "from-sky-400 to-teal-500",
    },
    {
      id: "nodejs",
      name: "Node.js & Express",
      category: "Full Stack & APIs",
      level: "Advanced",
      years: "4+ Yrs",
      desc: "Scalable Event-Driven Servers, WebSockets & Proxy Pipelines",
      highlights: ["REST API Endpoints", "Real-Time WebSockets", "Middleware Pipeline"],
      icon: Server,
      color: "from-emerald-500 to-green-600",
    },
    {
      id: "mysql",
      name: "MySQL & Relational DBs",
      category: "Cloud & DevOps",
      level: "Expert",
      years: "5+ Yrs",
      desc: "Schema Optimization, Complex Join Indexing & Query Tuning",
      highlights: ["Index Optimization", "Database Migrations", "ACID Transactions"],
      icon: Database,
      color: "from-amber-500 to-orange-600",
    },
    {
      id: "gemini",
      name: "Gemini AI API",
      category: "AI & Security",
      level: "Expert",
      years: "2+ Yrs",
      desc: "Generative AI Integration, RAG Grounding & Function Calling",
      highlights: ["Structured JSON Outputs", "Chat Assistants", "Context Grounding"],
      icon: Sparkles,
      color: "from-purple-500 to-pink-500",
      featured: true,
    },
    {
      id: "cloudflare",
      name: "Cloudflare & Security",
      category: "AI & Security",
      level: "Expert",
      years: "4+ Yrs",
      desc: "Enterprise WAF Protection, DDoS Shielding & CDN Caching Rules",
      highlights: ["Malware & Exploit Removal", "DNS Optimization", "Edge Page Rules"],
      icon: ShieldCheck,
      color: "from-orange-500 to-amber-500",
    },
    {
      id: "docker",
      name: "Docker & CI/CD",
      category: "Cloud & DevOps",
      level: "Senior",
      years: "3+ Yrs",
      desc: "Containerized Environments, Automated Deployment & Cloud Hosting",
      highlights: ["Multi-stage Dockerfiles", "Environment Isolation", "Vercel & Cloud Run"],
      icon: Box,
      color: "from-blue-600 to-cyan-600",
    },
  ];

  const filteredStack =
    activeCategory === "All"
      ? techStack
      : techStack.filter((item) => item.category === activeCategory);

  const marqueeRow1 = techStack.slice(0, 6);
  const marqueeRow2 = techStack.slice(6);

  return (
    <section id="stack" className="relative py-16 sm:py-20 bg-black overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#8201F2]/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[400px] h-[400px] bg-indigo-900/10 blur-[160px] rounded-full pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10 mb-10 text-center">
        <span className="text-xs font-mono tracking-widest text-[#8201F2] uppercase font-bold px-3.5 py-1.5 rounded-full bg-[#8201F2]/10 border border-[#8201F2]/30 inline-flex items-center gap-1.5">
          <Cpu className="w-3.5 h-3.5" />
          POWERFUL TOOLKIT
        </span>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mt-4 mb-3">
          Technology Stack & Core Masteries
        </h2>
        <p className="text-sm sm:text-lg text-[#B8B8B8] max-w-2xl mx-auto">
          Modern, battle-tested tools and frameworks Ahsan leverages to engineer high-speed, secure digital platforms.
        </p>
      </div>

      {/* Dual Infinite Marquees */}
      <div className="relative w-full overflow-hidden mb-12 space-y-3 py-2 bg-white/[0.01] border-y border-white/10">
        {/* Row 1 - Forward */}
        <div className="flex w-[200%] animate-marquee whitespace-nowrap gap-4 hover:[animation-play-state:paused]">
          {[...marqueeRow1, ...marqueeRow1, ...marqueeRow1].map((tech, idx) => {
            const Icon = tech.icon;
            return (
              <div
                key={`m1-${idx}`}
                className="px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2.5 backdrop-blur-md shadow-sm hover:border-[#8201F2]/50 hover:bg-[#8201F2]/10 transition-all cursor-default"
              >
                <div className="p-1 rounded-lg bg-[#8201F2]/20 text-[#8201F2]">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="font-mono text-xs sm:text-sm font-bold text-white">
                  {tech.name}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold">
                  {tech.level}
                </span>
              </div>
            );
          })}
        </div>

        {/* Row 2 - Reverse */}
        <div className="flex w-[200%] animate-marquee-reverse whitespace-nowrap gap-4 hover:[animation-play-state:paused]">
          {[...marqueeRow2, ...marqueeRow2, ...marqueeRow2].map((tech, idx) => {
            const Icon = tech.icon;
            return (
              <div
                key={`m2-${idx}`}
                className="px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2.5 backdrop-blur-md shadow-sm hover:border-[#8201F2]/50 hover:bg-[#8201F2]/10 transition-all cursor-default"
              >
                <div className="p-1 rounded-lg bg-[#8201F2]/20 text-[#8201F2]">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="font-mono text-xs sm:text-sm font-bold text-white">
                  {tech.name}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">
                  {tech.years}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  playClickSound(soundEnabled);
                  setActiveCategory(cat);
                }}
                onMouseEnter={() => playHoverSound(soundEnabled)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-medium transition-all flex items-center gap-2 border ${
                  isActive
                    ? "bg-[#8201F2] text-white border-[#8201F2] shadow-[0_0_20px_rgba(130,1,242,0.5)] scale-105"
                    : "bg-white/[0.03] text-[#B8B8B8] border-white/10 hover:border-white/20 hover:text-white"
                }`}
              >
                {cat === "All" && <Layers className="w-3.5 h-3.5" />}
                {cat}
              </button>
            );
          })}
        </div>

        {/* Tech Stack Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredStack.map((tech) => {
              const Icon = tech.icon;
              const isSelected = selectedTech === tech.id;

              return (
                <motion.div
                  key={tech.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => {
                    playClickSound(soundEnabled);
                    setSelectedTech(isSelected ? null : tech.id);
                  }}
                  onMouseEnter={() => playHoverSound(soundEnabled)}
                  className={`relative p-6 rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border transition-all duration-300 cursor-pointer group flex flex-col justify-between overflow-hidden ${
                    isSelected
                      ? "border-[#8201F2] bg-[#8201F2]/15 shadow-[0_0_30px_rgba(130,1,242,0.35)] ring-1 ring-[#8201F2]"
                      : "border-white/10 hover:border-[#8201F2]/60 hover:bg-[#8201F2]/10 hover:shadow-[0_0_25px_rgba(130,1,242,0.2)]"
                  }`}
                >
                  {/* Subtle Top Gradient Line */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${tech.color} opacity-75 group-hover:opacity-100 transition-opacity`}
                  />

                  <div>
                    {/* Top Header Row */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#8201F2]/20 to-indigo-900/40 border border-[#8201F2]/30 flex items-center justify-center text-[#8201F2] group-hover:scale-110 group-hover:text-white group-hover:bg-[#8201F2] transition-all shadow-md">
                        <Icon className="w-5 h-5" />
                      </div>

                      <div className="flex items-center gap-2">
                        {tech.featured && (
                          <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-amber-300 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full">
                            <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                            TOP
                          </span>
                        )}
                        <span className="text-[10px] font-mono font-semibold text-purple-300 bg-[#8201F2]/20 border border-[#8201F2]/40 px-2.5 py-0.5 rounded-full">
                          {tech.level}
                        </span>
                      </div>
                    </div>

                    {/* Tech Title & Category */}
                    <div className="mb-2">
                      <div className="text-[11px] font-mono font-semibold text-[#8201F2] tracking-wider uppercase mb-0.5 flex items-center justify-between">
                        <span>{tech.category}</span>
                        <span className="text-gray-400 font-normal">{tech.years}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white group-hover:text-purple-200 transition-colors flex items-center justify-between">
                        <span>{tech.name}</span>
                        <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-[#8201F2] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-[#B8B8B8] leading-relaxed mb-4">
                      {tech.desc}
                    </p>

                    {/* Key Highlights */}
                    <div className="space-y-1.5 pt-3 border-t border-white/[0.06]">
                      {tech.highlights.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-1.5 text-[11px] text-gray-300 font-sans"
                        >
                          <CheckCircle2 className="w-3 h-3 text-[#8201F2] flex-shrink-0" />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Status Indicator */}
                  <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-[#B8B8B8]">
                    <span className="flex items-center gap-1.5">
                      <Activity className="w-3 h-3 text-emerald-400" />
                      <span>Production Ready</span>
                    </span>
                    <span className="text-purple-300 font-medium">
                      {isSelected ? "Selected" : "Click details"}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Metrics Bar */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-purple-950/30 via-black to-indigo-950/30 border border-white/10 backdrop-blur-md grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold font-mono text-white">100%</div>
            <div className="text-xs text-[#B8B8B8] font-sans mt-0.5">Modern Code Standards</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-purple-300">&lt; 0.5s</div>
            <div className="text-xs text-[#B8B8B8] font-sans mt-0.5">Sub-Second Page Speed</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-emerald-400">99.9%</div>
            <div className="text-xs text-[#B8B8B8] font-sans mt-0.5">Production Uptime</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-indigo-300">100+</div>
            <div className="text-xs text-[#B8B8B8] font-sans mt-0.5">Delivered Systems</div>
          </div>
        </div>
      </div>
    </section>
  );
};

