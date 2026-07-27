import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Zap,
  ArrowRight,
  FileText,
  CheckCircle2,
  Code,
  Shield,
  Sparkles,
  Terminal,
  Cpu
} from "lucide-react";
import { AHSAN_INFO } from "../data/portfolioData";
import { useAppStore } from "../store/useAppStore";
import { playClickSound, playHoverSound } from "../utils/audio";

export const Hero: React.FC = () => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const { soundEnabled, setIsResumeOpen, setIsCalculatorOpen, setIsChatbotOpen } = useAppStore();

  // Typing effect code text state
  const [codeLineIndex, setCodeLineIndex] = useState(0);
  const [typedChars, setTypedChars] = useState("");

  const codeSnippet = `const developer = {
  name: "Ahsan Durrani",
  role: "Full Stack Engineer",
  expertise: [
    "WordPress Custom Themes",
    "Laravel Web Apps",
    "React & Next.js",
    "AI Automation & Security"
  ],
  securityGrade: "A+",
  speedScore: "100/100",
  availability: "Ready for Projects"
};`;

  useEffect(() => {
    const roleInterval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % AHSAN_INFO.rotatingTitles.length);
    }, 2800);

    return () => clearInterval(roleInterval);
  }, []);

  // Typewriter code simulation
  useEffect(() => {
    if (typedChars.length < codeSnippet.length) {
      const timeout = setTimeout(() => {
        setTypedChars(codeSnippet.slice(0, typedChars.length + 1));
      }, 25);
      return () => clearTimeout(timeout);
    }
  }, [typedChars, codeSnippet]);

  const scrollTo = (id: string) => {
    playClickSound(soundEnabled);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-[90vh] pt-24 pb-12 sm:pt-28 sm:pb-16 px-4 lg:px-8 flex flex-col justify-center overflow-hidden bg-black"
    >
      {/* Background Interactive Energy Atmosphere */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#8201F2]/15 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-purple-900/10 blur-[130px] rounded-full pointer-events-none" />

      {/* Background Digital Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column - Hero Branding & Copywriting */}
        <div className="lg:col-span-7 flex flex-col items-start">
          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.04] border border-[#8201F2]/40 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(130,1,242,0.25)]"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-mono font-medium text-white tracking-wide">
              Available For Freelance Projects
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-4"
          >
            <span className="block text-lg sm:text-2xl font-mono text-[#B8B8B8] mb-1">
              Hi, I'm
            </span>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.02] font-sans">
              Ahsan{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-300 to-[#8201F2] drop-shadow-[0_0_35px_rgba(130,1,242,0.6)]">
                Durrani
              </span>
            </h1>
          </motion.div>

          {/* Dynamic Rotating Titles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-12 sm:h-14 mb-6 flex items-center gap-2 font-mono"
          >
            <span className="text-sm sm:text-lg text-[#B8B8B8] whitespace-nowrap">
              Building as
            </span>
            <div className="relative overflow-hidden h-full flex items-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentRoleIndex}
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -24, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="text-base sm:text-xl font-bold text-[#8201F2] px-3 py-1 rounded-lg bg-[#8201F2]/10 border border-[#8201F2]/30 shadow-[0_0_15px_rgba(130,1,242,0.3)]"
                >
                  {AHSAN_INFO.rotatingTitles[currentRoleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Subtitle Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-xl text-[#B8B8B8] max-w-2xl font-normal leading-relaxed mb-8"
          >
            I design and develop high-performance websites, scalable web applications,
            AI-powered automation tools, and secure digital platforms that help businesses grow.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 mb-8"
          >
            {/* Primary Hire Me */}
            <button
              onClick={() => scrollTo("contact")}
              onMouseEnter={() => playHoverSound(soundEnabled)}
              className="px-8 py-4 rounded-xl bg-[#8201F2] hover:bg-purple-600 text-white font-bold text-sm tracking-wide transition-all shadow-[0_0_30px_rgba(130,1,242,0.6)] hover:shadow-[0_0_45px_rgba(130,1,242,0.9)] hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2 group"
            >
              <Zap className="w-4 h-4 fill-white text-white group-hover:rotate-12 transition-transform" />
              <span>Hire Me Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* View Portfolio */}
            <button
              onClick={() => scrollTo("portfolio")}
              onMouseEnter={() => playHoverSound(soundEnabled)}
              className="px-7 py-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#8201F2]/50 text-white font-semibold text-sm transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2 backdrop-blur-md"
            >
              <Code className="w-4 h-4 text-purple-400" />
              <span>Explore Projects</span>
            </button>

            {/* Resume Button */}
            <button
              onClick={() => {
                playClickSound(soundEnabled);
                setIsResumeOpen(true);
              }}
              onMouseEnter={() => playHoverSound(soundEnabled)}
              className="px-6 py-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/10 text-[#B8B8B8] hover:text-white text-sm transition-all cursor-pointer flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-purple-400" />
              <span>Resume</span>
            </button>
          </motion.div>

          {/* Floating Statistics Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full"
          >
            {AHSAN_INFO.stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-md hover:border-[#8201F2]/50 transition-all hover:shadow-[0_0_20px_rgba(130,1,242,0.25)] group"
              >
                <div className="text-2xl sm:text-3xl font-black text-white font-mono group-hover:text-[#8201F2] transition-colors">
                  {stat.value}
                </div>
                <div className="text-xs text-[#B8B8B8] font-medium mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Column - Interactive 3D Workspace & Live Code Editor */}
        <div className="lg:col-span-5 relative">
          {/* Glowing Purple Backdrop */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#8201F2] via-purple-600 to-indigo-600 opacity-20 blur-xl animate-pulse -z-10" />

          {/* Laptop IDE Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-2xl border border-white/10 bg-gradient-to-b from-gray-900/90 to-black/95 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            {/* Window Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-white/[0.03] border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex items-center gap-2 font-mono text-xs text-[#B8B8B8]">
                <Terminal className="w-3.5 h-3.5 text-purple-400" />
                <span>ahsan-durrani.ts</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[10px] font-mono text-emerald-400">ONLINE</span>
              </div>
            </div>

            {/* IDE Code Typing Canvas */}
            <div className="p-5 font-mono text-xs sm:text-sm text-purple-200/90 leading-relaxed overflow-x-auto min-h-[300px]">
              <pre className="whitespace-pre-wrap">
                <code>
                  {typedChars}
                  <span className="inline-block w-2 h-4 bg-[#8201F2] ml-1 animate-pulse" />
                </code>
              </pre>
            </div>

            {/* Live Interactive Quick Launcher Strip inside IDE */}
            <div className="p-3 bg-white/[0.02] border-t border-white/10 flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  playClickSound(soundEnabled);
                  setIsCalculatorOpen(true);
                }}
                className="flex-1 py-2 px-3 rounded-xl bg-[#8201F2]/20 hover:bg-[#8201F2]/40 border border-[#8201F2]/50 text-purple-200 font-mono text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>AI Cost Calc</span>
              </button>
              <button
                onClick={() => {
                  playClickSound(soundEnabled);
                  setIsChatbotOpen(true);
                }}
                className="flex-1 py-2 px-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white font-mono text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Cpu className="w-3.5 h-3.5 text-purple-400" />
                <span>Ahsan AI</span>
              </button>
            </div>
          </motion.div>

          {/* Floating UI Feature Cards Around IDE */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -right-4 hidden sm:flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-black/80 border border-emerald-500/40 backdrop-blur-xl shadow-[0_10px_25px_rgba(16,185,129,0.2)]"
          >
            <Shield className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono font-bold text-white">Security Hardened</span>
          </motion.div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-6 -left-4 hidden sm:flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-black/80 border border-[#8201F2]/60 backdrop-blur-xl shadow-[0_10px_25px_rgba(130,1,242,0.3)]"
          >
            <CheckCircle2 className="w-4 h-4 text-[#8201F2]" />
            <span className="text-xs font-mono font-bold text-white">100/100 Core Web Vitals</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
