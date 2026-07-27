import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Laptop,
  BookOpen,
  Server,
  Coffee,
  Trophy,
  Calendar as CalendarIcon,
  DoorOpen,
  Sparkles,
  Zap,
  Activity,
  Terminal,
  Volume2,
  VolumeX,
  Sliders,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  HardDrive,
  Cpu,
  Flame,
  Sun,
  Moon,
  Eye
} from "lucide-react";
import { useAppStore } from "../store/useAppStore";
import { playClickSound, playHoverSound } from "../utils/audio";

interface OfficeItem {
  id: string;
  title: string;
  category: string;
  icon: React.ElementType;
  color: string;
  glowColor: string;
  status: string;
  telemetry: string;
  desc: string;
  stats: { label: string; value: string }[];
  actionLabel: string;
  action: () => void;
  gridSpan?: string;
}

export const VirtualOffice: React.FC = () => {
  const { soundEnabled, setIsCalculatorOpen, setIsTerminalOpen } = useAppStore();
  const [selectedItem, setSelectedItem] = useState<OfficeItem | null>(null);
  const [ambientTheme, setAmbientTheme] = useState<"cyberpunk" | "latenight" | "matrix" | "studio">("cyberpunk");
  const [coffeeBrewed, setCoffeeBrewed] = useState(14);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const themeGlows = {
    cyberpunk: "from-[#8201F2]/25 via-purple-900/15 to-indigo-950/20",
    latenight: "from-blue-900/25 via-slate-900/20 to-black",
    matrix: "from-emerald-950/30 via-green-900/15 to-black",
    studio: "from-amber-950/20 via-neutral-900/20 to-black",
  };

  const officeItems: OfficeItem[] = [
    {
      id: "laptop",
      title: "Developer Workstation",
      category: "CORE DEV RIG",
      icon: Laptop,
      color: "from-purple-600 via-indigo-600 to-blue-600",
      glowColor: "rgba(130,1,242,0.4)",
      status: "IDE ACTIVE • VS CODE & NEOVIM",
      telemetry: "CPU: 12% • RAM: 14.2 GB / 64 GB",
      gridSpan: "col-span-1 md:col-span-2 lg:col-span-2",
      desc: "Ahsan's primary dual-monitor development rig running high-performance Node servers, Docker containers, and Git workflows.",
      stats: [
        { label: "Primary Stack", value: "PHP, Laravel, React, Next.js" },
        { label: "Active IDE", value: "VS Code + Vim Bindings" },
        { label: "Dev OS", value: "Linux / macOS Enterprise" },
      ],
      actionLabel: "Explore Projects",
      action: () => scrollTo("portfolio"),
    },
    {
      id: "server",
      title: "Encrypted Server Node",
      category: "CLOUD INFRA",
      icon: Server,
      color: "from-fuchsia-600 via-purple-600 to-[#8201F2]",
      glowColor: "rgba(192,38,211,0.4)",
      status: "WAF PROTECTED • 99.99% UPTIME",
      telemetry: "Latency: 14ms • Cloudflare Edge CDN",
      gridSpan: "col-span-1 md:col-span-1 lg:col-span-1",
      desc: "Hardened cloud hosting environment protected by Cloudflare Web Application Firewall, SSL encryption, and automated database replication.",
      stats: [
        { label: "Protection", value: "Cloudflare Enterprise WAF" },
        { label: "SSL Grade", value: "A+ SSL Labs Certified" },
        { label: "Security Record", value: "0 Breaches in 5+ Years" },
      ],
      actionLabel: "View Security Solutions",
      action: () => scrollTo("services"),
    },
    {
      id: "coffee",
      title: "Precision Espresso Bar",
      category: "STAMINA ENGINE",
      icon: Coffee,
      color: "from-amber-600 via-orange-600 to-yellow-600",
      glowColor: "rgba(217,119,6,0.4)",
      status: `CAFFEINE LEVEL • ${coffeeBrewed} CUPS TODAY`,
      telemetry: "Pressure: 9 Bar • Extraction: Perfect",
      gridSpan: "col-span-1 md:col-span-1 lg:col-span-1",
      desc: "Fueling 100+ flawless project launches with endless focus, rapid troubleshooting, and high-energy coding sessions.",
      stats: [
        { label: "Caffeine Rating", value: "100% High Velocity" },
        { label: "Projects Fueled", value: "100+ Completed" },
        { label: "Turnaround Time", value: "2x Faster Delivery" },
      ],
      actionLabel: "Read Ahsan's Story",
      action: () => {
        setCoffeeBrewed((prev) => prev + 1);
        scrollTo("about");
      },
    },
    {
      id: "bookshelf",
      title: "Engineering Library",
      category: "KNOWLEDGE BANK",
      icon: BookOpen,
      color: "from-blue-600 via-cyan-600 to-teal-500",
      glowColor: "rgba(37,99,235,0.4)",
      status: "5+ YEARS • CONTINUOUS LEARNING",
      telemetry: "250+ Tech Handbooks & Specs Read",
      gridSpan: "col-span-1 md:col-span-1 lg:col-span-1",
      desc: "A vast repository of software architecture blueprints, clean code principles, database indexing strategies, and algorithm mastery.",
      stats: [
        { label: "Focus Areas", value: "OOP, MVC, Microservices" },
        { label: "Core Web Vitals", value: "Speed Optimization" },
        { label: "SEO Mastery", value: "Technical Schema Standards" },
      ],
      actionLabel: "Inspect Skillset",
      action: () => scrollTo("expertise"),
    },
    {
      id: "awards",
      title: "Trophy & Accolades Shelf",
      category: "MILESTONES",
      icon: Trophy,
      color: "from-yellow-500 via-amber-500 to-orange-500",
      glowColor: "rgba(234,179,8,0.4)",
      status: "100/100 PAGE SPEED • 5★ RATINGS",
      telemetry: "Client Satisfaction: 100%",
      gridSpan: "col-span-1 md:col-span-1 lg:col-span-1",
      desc: "Recognition for outstanding Core Web Vitals performance, custom theme architecture, and top-tier client ratings across freelance platforms.",
      stats: [
        { label: "Lighthouse Score", value: "100 / 100 Performance" },
        { label: "Client Rating", value: "5.0 ★ Top Rated" },
        { label: "Repeat Clients", value: "85% Retention Rate" },
      ],
      actionLabel: "View Experience",
      action: () => scrollTo("experience"),
    },
    {
      id: "calendar",
      title: "Client Booking Schedule",
      category: "AVAILABILITY",
      icon: CalendarIcon,
      color: "from-emerald-600 via-teal-600 to-green-500",
      glowColor: "rgba(5,150,105,0.4)",
      status: "OPEN FOR H2 2026 PROJECTS",
      telemetry: "Response Time: < 2 Hours",
      gridSpan: "col-span-1 md:col-span-1 lg:col-span-1",
      desc: "Currently taking on select custom web engineering projects, WooCommerce builds, and technical security consultations.",
      stats: [
        { label: "Current Capacity", value: "2 Spots Available" },
        { label: "Avg Kickoff", value: "Within 48 Hours" },
        { label: "Pricing Model", value: "Fixed or Hourly Rate" },
      ],
      actionLabel: "Calculate Estimate",
      action: () => setIsCalculatorOpen(true),
    },
    {
      id: "door",
      title: "Consultation Portal",
      category: "INITIATE DEAL",
      icon: DoorOpen,
      color: "from-purple-700 via-indigo-800 to-black",
      glowColor: "rgba(126,34,206,0.4)",
      status: "DIRECT LINE • AHSAN DURRANI",
      telemetry: "Global Timezone Support: 24/7",
      gridSpan: "col-span-1 md:col-span-1 lg:col-span-1",
      desc: "Step inside to discuss your digital vision, request a detailed quotation, or start a real-time WhatsApp consultation.",
      stats: [
        { label: "Direct Email", value: "asadurrrani@gmail.com" },
        { label: "WhatsApp", value: "+92 313 5350125" },
        { label: "Turnaround", value: "Same-day Proposal" },
      ],
      actionLabel: "Contact Ahsan Now",
      action: () => scrollTo("contact"),
    },
  ];

  return (
    <section id="office" className="relative py-16 sm:py-20 px-4 lg:px-8 bg-black overflow-hidden select-none">
      {/* Background Dynamic Theme Atmosphere */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-r ${themeGlows[ambientTheme]} blur-[220px] rounded-full pointer-events-none transition-all duration-700`}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8">
          <span className="text-xs font-mono tracking-widest text-[#8201F2] uppercase font-bold px-3.5 py-1.5 rounded-full bg-[#8201F2]/10 border border-[#8201F2]/30 inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            3D SPATIAL WORKSPACE EXPERIENCE
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mt-4 mb-3">
            Ahsan's Interactive Virtual Office
          </h2>
          <p className="text-sm sm:text-lg text-[#B8B8B8] max-w-2xl mx-auto">
            Step into Ahsan's digital command center. Click on interactive workstation modules to inspect real-time telemetry, stats, and workflows.
          </p>
        </div>

        {/* Ambient Lighting & Audio Controls Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-3 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md mb-8">
          {/* Room Lighting Presets */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-gray-400 font-semibold px-2 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-[#8201F2]" />
              AMBIENT LIGHTS:
            </span>
            <div className="flex items-center gap-1.5">
              {[
                { id: "cyberpunk", label: "Cyberpunk", icon: Flame, color: "text-purple-400" },
                { id: "latenight", label: "Late Night", icon: Moon, color: "text-blue-400" },
                { id: "matrix", label: "Matrix", icon: Terminal, color: "text-emerald-400" },
                { id: "studio", label: "Studio", icon: Sun, color: "text-amber-400" },
              ].map((t) => {
                const Icon = t.icon;
                const isActive = ambientTheme === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      playClickSound(soundEnabled);
                      setAmbientTheme(t.id as any);
                    }}
                    onMouseEnter={() => playHoverSound(soundEnabled)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
                      isActive
                        ? "bg-[#8201F2] text-white shadow-[0_0_15px_rgba(130,1,242,0.5)] scale-105"
                        : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : t.color}`} />
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick HUD Telemetry Bar */}
          <div className="hidden lg:flex items-center gap-4 text-xs font-mono text-gray-400">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>STATION: ONLINE</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5 text-purple-300">
              <Cpu className="w-3.5 h-3.5" />
              <span>LOAD: 12%</span>
            </div>
            <span>•</span>
            <button
              onClick={() => {
                playClickSound(soundEnabled);
                setIsTerminalOpen(true);
              }}
              onMouseEnter={() => playHoverSound(soundEnabled)}
              className="text-xs font-mono text-[#8201F2] hover:text-white flex items-center gap-1 hover:underline"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Open CLI</span>
            </button>
          </div>
        </div>

        {/* 3D Perspective Workspace Grid */}
        <div className="perspective-1000">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {officeItems.map((item) => {
              const Icon = item.icon;
              const isSelected = selectedItem?.id === item.id;

              return (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.02, y: -6, rotateX: 2, rotateY: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    playClickSound(soundEnabled);
                    setSelectedItem(isSelected ? null : item);
                  }}
                  onMouseEnter={() => playHoverSound(soundEnabled)}
                  style={{
                    boxShadow: isSelected
                      ? `0 0 35px ${item.glowColor}`
                      : "0 10px 30px rgba(0,0,0,0.5)",
                  }}
                  className={`relative p-6 rounded-3xl bg-gradient-to-b from-white/[0.04] to-black border text-left transition-all duration-300 backdrop-blur-xl group cursor-pointer flex flex-col justify-between min-h-[220px] overflow-hidden ${
                    item.gridSpan || ""
                  } ${
                    isSelected
                      ? "border-[#8201F2] bg-[#8201F2]/15 ring-1 ring-[#8201F2]"
                      : "border-white/10 hover:border-[#8201F2]/60 hover:bg-[#8201F2]/10"
                  }`}
                >
                  {/* Subtle Glowing Header Bar */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${item.color}`}
                  />

                  <div>
                    {/* Top Icon & Badge Row */}
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>

                      <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-purple-300 group-hover:bg-[#8201F2]/20 group-hover:border-[#8201F2]/40 transition-colors">
                        {item.category}
                      </span>
                    </div>

                    {/* Title & Status */}
                    <h3 className="text-lg font-bold text-white group-hover:text-purple-200 transition-colors mb-1">
                      {item.title}
                    </h3>

                    <div className="text-[11px] font-mono text-emerald-400 font-medium flex items-center gap-1.5 mb-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{item.status}</span>
                    </div>

                    <p className="text-xs text-[#B8B8B8] leading-relaxed line-clamp-2">
                      {item.desc}
                    </p>
                  </div>

                  {/* Telemetry Footer */}
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-gray-400">
                    <span className="truncate max-w-[180px]">{item.telemetry}</span>
                    <span className="text-[#8201F2] font-semibold group-hover:text-white flex items-center gap-1">
                      <span>Inspect</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Selected Object Detailed HUD Modal Drawer */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-gray-950 via-purple-950/40 to-black border border-[#8201F2]/60 shadow-[0_0_50px_rgba(130,1,242,0.4)] relative overflow-hidden backdrop-blur-2xl"
            >
              {/* Background Glow */}
              <div
                className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-br ${selectedItem.color} opacity-20 blur-3xl pointer-events-none rounded-full`}
              />

              <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                {/* Left Info */}
                <div className="space-y-3 max-w-2xl">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${selectedItem.color} flex items-center justify-center text-white shrink-0 shadow-xl`}
                    >
                      {React.createElement(selectedItem.icon, { className: "w-7 h-7" })}
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-[#8201F2] font-bold tracking-wider uppercase">
                        {selectedItem.category} • TELEMETRY
                      </span>
                      <h4 className="text-2xl font-bold text-white tracking-tight">
                        {selectedItem.title}
                      </h4>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    {selectedItem.desc}
                  </p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    {selectedItem.stats.map((st, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-white/[0.03] border border-white/10"
                      >
                        <div className="text-[10px] font-mono text-gray-400 uppercase">{st.label}</div>
                        <div className="text-xs font-bold text-white font-mono mt-0.5">{st.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Action Controls */}
                <div className="flex flex-col sm:flex-row lg:flex-col items-stretch gap-3 w-full lg:w-auto shrink-0">
                  <button
                    onClick={() => {
                      playClickSound(soundEnabled);
                      selectedItem.action();
                      setSelectedItem(null);
                    }}
                    className="px-6 py-3.5 rounded-xl bg-[#8201F2] hover:bg-purple-600 text-white font-mono font-bold text-xs transition-all shadow-[0_0_25px_#8201F2] cursor-pointer flex items-center justify-center gap-2 hover:scale-105"
                  >
                    <span>{selectedItem.actionLabel}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      playClickSound(soundEnabled);
                      setSelectedItem(null);
                    }}
                    className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 font-mono text-xs font-semibold transition-all text-center"
                  >
                    Close Telemetry
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

