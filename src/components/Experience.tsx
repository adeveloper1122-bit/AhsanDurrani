import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TIMELINE_ITEMS } from "../data/portfolioData";
import {
  Briefcase,
  Calendar,
  Award,
  Sparkles,
  Building2,
  FileText,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Globe,
  Zap,
  Code2,
  Layers,
  MapPin,
  ShieldCheck
} from "lucide-react";
import { useAppStore } from "../store/useAppStore";
import { playClickSound, playHoverSound } from "../utils/audio";

export const Experience: React.FC = () => {
  const { soundEnabled, setIsResumeOpen } = useAppStore();
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filterCategories = [
    "All",
    "Enterprise & Freelance",
    "Agency Leadership",
    "WordPress & Frontend",
    "Foundations",
  ];

  const filteredItems = useMemo(() => {
    if (activeFilter === "All") return TIMELINE_ITEMS;
    if (activeFilter === "Enterprise & Freelance") {
      return TIMELINE_ITEMS.filter((item) => item.year.includes("2024"));
    }
    if (activeFilter === "Agency Leadership") {
      return TIMELINE_ITEMS.filter((item) => item.year.includes("2022"));
    }
    if (activeFilter === "WordPress & Frontend") {
      return TIMELINE_ITEMS.filter((item) => item.year.includes("2020"));
    }
    if (activeFilter === "Foundations") {
      return TIMELINE_ITEMS.filter((item) => item.year.includes("2019"));
    }
    return TIMELINE_ITEMS;
  }, [activeFilter]);

  const scrollToContact = () => {
    playClickSound(soundEnabled);
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="experience" className="relative py-16 sm:py-20 px-4 lg:px-8 bg-black overflow-hidden select-none">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 right-0 w-[550px] h-[550px] bg-[#8201F2]/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[450px] h-[450px] bg-indigo-900/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="text-xs font-mono tracking-widest text-[#8201F2] uppercase font-bold px-3.5 py-1.5 rounded-full bg-[#8201F2]/10 border border-[#8201F2]/30 inline-flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-purple-400" />
            CAREER ROADMAP & ARCHITECTURAL MILESTONES
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mt-4 mb-3">
            Proven Engineering Leadership
          </h2>
          <p className="text-sm sm:text-lg text-[#B8B8B8] max-w-2xl mx-auto">
            A 5+ year track record of delivering enterprise web systems, custom WordPress themes, AI solutions, and high-converting portals for clients globally.
          </p>
        </div>

        {/* Experience Metrics Stats Banner */}
        <div className="mb-12 p-5 rounded-2xl bg-gradient-to-r from-purple-950/20 via-black to-indigo-950/20 border border-white/10 backdrop-blur-md grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="flex flex-col items-center justify-center p-2">
            <div className="text-2xl sm:text-3xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-300">
              5+ YEARS
            </div>
            <div className="text-xs font-mono text-gray-400 mt-0.5">Software Engineering</div>
          </div>

          <div className="flex flex-col items-center justify-center p-2 border-l border-white/10">
            <div className="text-2xl sm:text-3xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-[#8201F2]">
              100+
            </div>
            <div className="text-xs font-mono text-gray-400 mt-0.5">Projects Shipped</div>
          </div>

          <div className="flex flex-col items-center justify-center p-2 border-l border-white/10">
            <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">
              100 / 100
            </div>
            <div className="text-xs font-mono text-gray-400 mt-0.5">Core Web Vitals</div>
          </div>

          <div className="flex flex-col items-center justify-center p-2 border-l border-white/10">
            <div className="text-2xl sm:text-3xl font-black font-mono text-amber-300 flex items-center justify-center gap-1">
              <span>GLOBAL</span>
            </div>
            <div className="text-xs font-mono text-gray-400 mt-0.5">USA, UK, UAE & PK</div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {filterCategories.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  playClickSound(soundEnabled);
                  setActiveFilter(cat);
                }}
                onMouseEnter={() => playHoverSound(soundEnabled)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer border ${
                  isActive
                    ? "bg-[#8201F2] text-white border-[#8201F2] shadow-[0_0_20px_rgba(130,1,242,0.5)] scale-105"
                    : "bg-white/[0.03] border-white/10 text-[#B8B8B8] hover:text-white hover:border-white/20"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 sm:pl-10 md:pl-12 border-l-2 border-[#8201F2]/40 space-y-10 my-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.year + item.title}
                layout
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="relative group"
              >
                {/* Glowing Node Dot on Timeline */}
                <div className="absolute -left-[31px] sm:-left-[47px] md:-left-[55px] top-1.5 w-6 h-6 rounded-full bg-black border-2 border-[#8201F2] flex items-center justify-center shadow-[0_0_20px_#8201F2] group-hover:scale-125 transition-transform duration-300">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#8201F2] group-hover:animate-ping" />
                </div>

                {/* Card Container */}
                <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-white/[0.04] to-black border border-white/10 backdrop-blur-xl hover:border-[#8201F2]/70 hover:bg-[#8201F2]/10 transition-all duration-300 shadow-xl hover:shadow-[0_0_40px_rgba(130,1,242,0.3)]">
                  {/* Top Bar: Year & Role Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8201F2]/20 border border-[#8201F2]/40 text-xs font-mono text-purple-200 font-bold">
                      <Calendar className="w-3.5 h-3.5 text-[#8201F2]" />
                      <span>{item.year}</span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-gray-300">
                      <Building2 className="w-3 h-3 text-purple-400" />
                      <span>{item.role || "Senior Role"}</span>
                    </div>
                  </div>

                  {/* Title & Company */}
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">
                    {item.title}
                  </h3>

                  <div className="flex items-center gap-2 text-sm font-mono text-[#8201F2] font-semibold mb-4">
                    <Briefcase className="w-4 h-4 text-purple-400" />
                    <span>{item.company}</span>
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-[#B8B8B8] leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2 items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-mono text-purple-300 group-hover:border-purple-500/30 transition-colors"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 mt-2 sm:mt-0 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verified Milestone</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom Resume CTA Banner */}
        <div className="mt-14 p-8 rounded-3xl bg-gradient-to-r from-purple-950/40 via-black to-indigo-950/40 border border-[#8201F2]/50 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_40px_rgba(130,1,242,0.25)]">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-purple-300 font-bold uppercase tracking-wider">
              <FileText className="w-4 h-4 text-[#8201F2]" />
              TECHNICAL CREDENTIALS & RESUME
            </div>
            <h3 className="text-2xl font-bold text-white">
              Want Ahsan's Full Resume & Technical Stack Specs?
            </h3>
            <p className="text-xs sm:text-sm text-[#B8B8B8] max-w-xl">
              Inspect full career history, verified client reviews, education credentials, and complete technical breakdown in the interactive resume view.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={() => {
                playClickSound(soundEnabled);
                setIsResumeOpen(true);
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#8201F2] hover:bg-purple-600 text-white font-mono font-bold text-xs transition-all shadow-[0_0_25px_#8201F2] flex items-center justify-center gap-2 hover:scale-105 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>View Interactive Resume</span>
            </button>

            <button
              onClick={scrollToContact}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-mono font-bold text-xs transition-all flex items-center justify-center gap-2 hover:scale-105 cursor-pointer"
            >
              <span>Schedule Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

