import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SKILL_CATEGORIES } from "../data/portfolioData";
import {
  Layout,
  Server,
  Globe,
  Cpu,
  Shield,
  TrendingUp,
  ChevronRight,
  Code2
} from "lucide-react";
import { useAppStore } from "../store/useAppStore";
import { playClickSound, playHoverSound } from "../utils/audio";

export const Expertise: React.FC = () => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const { soundEnabled } = useAppStore();

  const getIcon = (title: string) => {
    switch (title) {
      case "Frontend Development":
        return Layout;
      case "Backend Development":
        return Server;
      case "WordPress Mastery":
        return Globe;
      case "AI & Automation":
        return Cpu;
      case "Security & DevOps":
        return Shield;
      default:
        return TrendingUp;
    }
  };

  return (
    <section id="expertise" className="relative py-16 sm:py-20 px-4 lg:px-8 bg-black">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#8201F2]/10 blur-[170px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="text-xs font-mono tracking-widest text-[#8201F2] uppercase font-bold px-3.5 py-1.5 rounded-full bg-[#8201F2]/10 border border-[#8201F2]/30">
            TECHNICAL PROFICIENCY
          </span>
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight mt-4 mb-3">
            Expertise & Skills
          </h2>
          <p className="text-base sm:text-xl text-[#B8B8B8] max-w-2xl mx-auto">
            Comprehensive domain mastery across modern full-stack web engineering.
          </p>
        </div>

        {/* Interactive Category Selector Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const Icon = getIcon(cat.title);
            const isActive = activeCategoryIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => {
                  playClickSound(soundEnabled);
                  setActiveCategoryIndex(idx);
                }}
                onMouseEnter={() => playHoverSound(soundEnabled)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between h-32 ${
                  isActive
                    ? "bg-[#8201F2] border-purple-400 text-white shadow-[0_0_25px_rgba(130,1,242,0.6)] scale-105"
                    : "bg-white/[0.02] border-white/10 text-[#B8B8B8] hover:border-white/30 hover:text-white"
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? "text-white" : "text-purple-400"}`} />
                <div>
                  <div className="text-xs font-mono font-bold uppercase tracking-wider mb-0.5">
                    0{idx + 1}
                  </div>
                  <div className="text-sm font-bold leading-tight">{cat.title}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Skill Category Expanded Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategoryIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl bg-gradient-to-b from-gray-900/90 to-black p-8 sm:p-12 border border-white/10 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column Overview */}
              <div className="lg:col-span-5">
                <div className="w-16 h-16 rounded-2xl bg-[#8201F2]/20 border border-[#8201F2]/50 flex items-center justify-center text-[#8201F2] mb-6 shadow-[0_0_25px_rgba(130,1,242,0.4)]">
                  {React.createElement(getIcon(SKILL_CATEGORIES[activeCategoryIndex].title), {
                    className: "w-8 h-8",
                  })}
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  {SKILL_CATEGORIES[activeCategoryIndex].title}
                </h3>
                <p className="text-base text-[#B8B8B8] leading-relaxed mb-6">
                  {SKILL_CATEGORIES[activeCategoryIndex].description}
                </p>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 font-mono text-xs text-purple-200 flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Verified 100% Production Standards</span>
                </div>
              </div>

              {/* Right Column Progress Bars */}
              <div className="lg:col-span-7 space-y-5">
                {SKILL_CATEGORIES[activeCategoryIndex].skills.map((s, sIdx) => (
                  <div key={sIdx} className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-mono">
                      <span className="text-white font-semibold">{s.name}</span>
                      <span className="text-[#8201F2] font-bold">{s.level}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${s.level}%` }}
                        transition={{ duration: 0.8, delay: sIdx * 0.1 }}
                        className="h-full bg-gradient-to-r from-[#8201F2] via-purple-500 to-indigo-400 rounded-full shadow-[0_0_12px_#8201F2]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
