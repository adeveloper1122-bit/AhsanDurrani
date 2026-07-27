import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AHSAN_INFO } from "../data/portfolioData";
import {
  Lightbulb,
  Code2,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  User,
  Target,
  Workflow,
  Award,
  ArrowRight,
  Copy,
  Check,
  Briefcase,
  Globe2,
  Cpu
} from "lucide-react";
import portraitImg from "../assets/images/ahsan_about_portrait_1785125880301.jpg";
import { useAppStore } from "../store/useAppStore";
import { playClickSound, playHoverSound } from "../utils/audio";

export const About: React.FC = () => {
  const { soundEnabled, setIsTerminalOpen, setIsCalculatorOpen } = useAppStore();
  const [activeTab, setActiveTab] = useState<"overview" | "philosophy" | "workflow">("overview");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    playClickSound(soundEnabled);
    navigator.clipboard.writeText(AHSAN_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const stats = [
    { label: "Years Experience", value: "5+ Years", icon: Briefcase },
    { label: "Projects Delivered", value: "100+", icon: Target },
    { label: "Global Clients", value: "20+ Countries", icon: Globe2 },
    { label: "Code Quality", value: "99.9% Bug-Free", icon: Award },
  ];

  const values = [
    {
      icon: Lightbulb,
      title: "Innovation & AI",
      tag: "Forward Thinking",
      desc: "Integrating Gemini AI, automated workflows, and modern stacks to keep client products ahead of competition.",
    },
    {
      icon: Code2,
      title: "Clean Architecture",
      tag: "Maintainability",
      desc: "Writing modular, self-documenting PHP, TypeScript, and SQL code adhering to strict design patterns.",
    },
    {
      icon: Zap,
      title: "Core Web Vitals",
      tag: "Sub-Second Load",
      desc: "Eliminating bloat, optimizing asset pipelines, and achieving 95+ PageSpeed scores on every build.",
    },
    {
      icon: ShieldCheck,
      title: "Zero-Trust Security",
      tag: "Hardened Apps",
      desc: "Proactive firewall configuration, malware remediation, and secure API gateways protecting user data.",
    },
  ];

  return (
    <section id="about" className="relative py-16 sm:py-20 px-4 lg:px-8 bg-black overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#8201F2]/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[400px] h-[400px] bg-indigo-900/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="text-xs font-mono tracking-widest text-[#8201F2] uppercase font-bold px-3.5 py-1.5 rounded-full bg-[#8201F2]/10 border border-[#8201F2]/30 inline-flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" />
            PERSONAL STORY & VISION
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mt-4 mb-3">
            About Ahsan Durrani
          </h2>
          <p className="text-sm sm:text-lg text-[#B8B8B8] max-w-2xl mx-auto">
            Senior Web Developer & Digital Solution Engineer dedicated to turning complex tech challenges into streamlined digital platforms.
          </p>
        </div>

        {/* Top Grid: Portrait Card + Interactive Bio Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left Column - Portrait & Visual Card (5 Cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl p-1 bg-gradient-to-b from-[#8201F2]/50 via-white/10 to-transparent shadow-[0_0_50px_rgba(130,1,242,0.25)]">
              <div className="rounded-[22px] bg-gradient-to-b from-gray-900 via-black to-black p-6 sm:p-7 border border-white/10 overflow-hidden relative group">
                
                {/* Photo Container */}
                <div className="relative mb-5 rounded-2xl overflow-hidden border border-[#8201F2]/30 shadow-[0_0_30px_rgba(130,1,242,0.35)] aspect-[3/4]">
                  <img
                    src={portraitImg}
                    alt="Ahsan Durrani - Senior Software Engineer"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Status Badge */}
                  <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[11px] font-mono font-semibold text-emerald-300 uppercase tracking-wider">
                      Available for Projects
                    </span>
                  </div>
                </div>

                {/* Name & Title */}
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    {AHSAN_INFO.name}
                  </h3>
                  <Sparkles className="w-5 h-5 text-[#8201F2] animate-pulse" />
                </div>
                <p className="text-xs sm:text-sm font-mono text-[#8201F2] mb-5 font-semibold">
                  {AHSAN_INFO.tagline}
                </p>

                {/* Contact Quick Info Table */}
                <div className="space-y-2.5 pt-4 border-t border-white/10 text-xs font-mono text-[#B8B8B8]">
                  <div className="flex items-center justify-between py-0.5">
                    <span className="text-gray-400">LOCATION:</span>
                    <span className="text-white font-medium">{AHSAN_INFO.location}</span>
                  </div>
                  <div className="flex items-center justify-between py-0.5">
                    <span className="text-gray-400">EMAIL:</span>
                    <button
                      onClick={handleCopyEmail}
                      onMouseEnter={() => playHoverSound(soundEnabled)}
                      className="text-purple-300 hover:text-white font-medium flex items-center gap-1.5 transition-colors group/btn"
                      title="Click to copy email"
                    >
                      <span>{AHSAN_INFO.email}</span>
                      {copiedEmail ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-purple-400 group-hover/btn:text-white" />
                      )}
                    </button>
                  </div>
                  <div className="flex items-center justify-between py-0.5">
                    <span className="text-gray-400">EXPERIENCE:</span>
                    <span className="text-emerald-400 font-semibold">5+ Years Active</span>
                  </div>
                </div>

                {/* Quick Action Buttons */}
                <div className="grid grid-cols-2 gap-2 mt-5 pt-4 border-t border-white/10">
                  <button
                    onClick={() => {
                      playClickSound(soundEnabled);
                      setIsTerminalOpen(true);
                    }}
                    onMouseEnter={() => playHoverSound(soundEnabled)}
                    className="px-3 py-2 rounded-xl bg-white/[0.05] border border-white/10 hover:border-[#8201F2]/50 hover:bg-[#8201F2]/20 text-xs font-mono font-semibold text-white transition-all flex items-center justify-center gap-1.5"
                  >
                    <Cpu className="w-3.5 h-3.5 text-[#8201F2]" />
                    CLI Terminal
                  </button>
                  <button
                    onClick={() => {
                      playClickSound(soundEnabled);
                      setIsCalculatorOpen(true);
                    }}
                    onMouseEnter={() => playHoverSound(soundEnabled)}
                    className="px-3 py-2 rounded-xl bg-white/[0.05] border border-white/10 hover:border-[#8201F2]/50 hover:bg-[#8201F2]/20 text-xs font-mono font-semibold text-white transition-all flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    Estimate Cost
                  </button>
                </div>

              </div>
            </div>
          </div>

          {/* Right Column - Interactive Tabs & Story (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Tab Navigation Controls */}
              <div className="flex items-center gap-2 p-1.5 bg-white/[0.03] border border-white/10 rounded-2xl mb-6 backdrop-blur-md">
                <button
                  onClick={() => {
                    playClickSound(soundEnabled);
                    setActiveTab("overview");
                  }}
                  onMouseEnter={() => playHoverSound(soundEnabled)}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-mono font-semibold transition-all flex items-center justify-center gap-2 ${
                    activeTab === "overview"
                      ? "bg-[#8201F2] text-white shadow-[0_0_20px_rgba(130,1,242,0.5)]"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>Overview</span>
                </button>

                <button
                  onClick={() => {
                    playClickSound(soundEnabled);
                    setActiveTab("philosophy");
                  }}
                  onMouseEnter={() => playHoverSound(soundEnabled)}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-mono font-semibold transition-all flex items-center justify-center gap-2 ${
                    activeTab === "philosophy"
                      ? "bg-[#8201F2] text-white shadow-[0_0_20px_rgba(130,1,242,0.5)]"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Target className="w-4 h-4" />
                  <span>Engineering</span>
                </button>

                <button
                  onClick={() => {
                    playClickSound(soundEnabled);
                    setActiveTab("workflow");
                  }}
                  onMouseEnter={() => playHoverSound(soundEnabled)}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-mono font-semibold transition-all flex items-center justify-center gap-2 ${
                    activeTab === "workflow"
                      ? "bg-[#8201F2] text-white shadow-[0_0_20px_rgba(130,1,242,0.5)]"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Workflow className="w-4 h-4" />
                  <span>Methodology</span>
                </button>
              </div>

              {/* Tab Content Box */}
              <AnimatePresence mode="wait">
                {activeTab === "overview" && (
                  <motion.div
                    key="tab-overview"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4 text-sm sm:text-base text-[#B8B8B8] leading-relaxed"
                  >
                    <p className="text-base sm:text-lg text-white font-medium leading-relaxed">
                      Ahsan Durrani is a full-stack software engineer and WordPress architect with over half a decade of hands-on experience building mission-critical web applications, high-converting WooCommerce stores, enterprise Laravel platforms, and AI-enhanced digital tools.
                    </p>

                    <p>
                      Rather than relying on heavy page builders, Ahsan crafts bespoke code solutions from scratch using PHP 8, Laravel 11, React 19, Next.js 15, and Tailwind CSS. His engineering approach balances sleek UI micro-interactions with bulletproof backend security and sub-second loading performance.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {[
                        "Bespoke WordPress Themes & WooCommerce",
                        "Scalable Laravel REST & GraphQL APIs",
                        "Generative AI & Chatbot Integrations",
                        "Server Hardening & Exploit Remediation",
                        "Core Web Vitals & Technical SEO Optimization",
                        "Modern React & Next.js Single Page Apps",
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2.5 text-xs sm:text-sm text-white font-medium p-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#8201F2]/40 transition-colors"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#8201F2] shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === "philosophy" && (
                  <motion.div
                    key="tab-philosophy"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4 text-sm sm:text-base text-[#B8B8B8] leading-relaxed"
                  >
                    <p className="text-base sm:text-lg text-white font-medium leading-relaxed">
                      "Code should be clean, self-documenting, and designed for longevity — not quick hacks that accumulate technical debt."
                    </p>

                    <div className="space-y-3 pt-1">
                      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                        <h4 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#8201F2]" />
                          Performance First Architecture
                        </h4>
                        <p className="text-xs text-[#B8B8B8]">
                          Every kilobyte matters. By stripping unused CSS, bundling minimal JS dependencies, and leveraging aggressive CDN caching, sites stay blazingly fast.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                        <h4 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                          Enterprise-Grade Security Standards
                        </h4>
                        <p className="text-xs text-[#B8B8B8]">
                          Security isn't an afterthought. From SQL injection prevention and CSRF protection to Cloudflare WAF policies and zero-day patch deployments.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                        <h4 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-indigo-400" />
                          Future-Proof Scalability
                        </h4>
                        <p className="text-xs text-[#B8B8B8]">
                          Building with object-oriented paradigms and micro-frontend structures so your application smoothly scales from 1,000 to 1,000,000+ active users.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "workflow" && (
                  <motion.div
                    key="tab-workflow"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4 text-sm sm:text-base text-[#B8B8B8] leading-relaxed"
                  >
                    <p className="text-base sm:text-lg text-white font-medium leading-relaxed">
                      A disciplined 4-phase execution framework designed for maximum transparency and rapid deployment.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10">
                        <span className="text-xs font-mono font-bold text-[#8201F2]">01. DISCOVERY & ARCHITECTURE</span>
                        <p className="text-xs text-gray-300 mt-1">Requirement analysis, database schema drafting, and stack selection.</p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10">
                        <span className="text-xs font-mono font-bold text-purple-300">02. BESPOKE DEVELOPMENT</span>
                        <p className="text-xs text-gray-300 mt-1">Sprint-based coding with real-time preview staging environments.</p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10">
                        <span className="text-xs font-mono font-bold text-emerald-400">03. AUDIT & SPEED TUNING</span>
                        <p className="text-xs text-gray-300 mt-1">Cross-browser testing, security penetration tests, and PageSpeed tuning.</p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10">
                        <span className="text-xs font-mono font-bold text-indigo-300">04. LAUNCH & GUARANTEE</span>
                        <p className="text-xs text-gray-300 mt-1">Zero-downtime deployment, DNS setup, and post-launch support.</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick Metrics Banner */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-white/10">
              {stats.map((s, idx) => {
                const Icon = s.icon;
                return (
                  <div key={idx} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                    <Icon className="w-4 h-4 text-[#8201F2] mx-auto mb-1" />
                    <div className="text-base sm:text-lg font-bold font-mono text-white">{s.value}</div>
                    <div className="text-[10px] text-[#B8B8B8] font-sans truncate">{s.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Core Engineering Pillars Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((v, idx) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -6, scale: 1.02 }}
                onMouseEnter={() => playHoverSound(soundEnabled)}
                className="p-6 rounded-2xl bg-gradient-to-b from-white/[0.03] to-white/[0.01] border border-white/10 hover:border-[#8201F2]/60 hover:bg-[#8201F2]/10 transition-all duration-300 shadow-lg group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-[#8201F2]/20 border border-[#8201F2]/40 flex items-center justify-center text-[#8201F2] group-hover:bg-[#8201F2] group-hover:text-white transition-all shadow-md">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-semibold text-purple-300 bg-[#8201F2]/20 border border-[#8201F2]/30 px-2.5 py-0.5 rounded-full">
                      {v.tag}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">
                    {v.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#B8B8B8] leading-relaxed">
                    {v.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-[#8201F2]">
                  <span>Pillar {idx + 1}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

