import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Volume2,
  VolumeX,
  Zap,
  Terminal as TerminalIcon,
  Menu,
  X,
  Sparkles,
  Briefcase,
  Layers,
  Code2,
  Shield,
  MessageSquare
} from "lucide-react";
import { useAppStore } from "../store/useAppStore";
import { playClickSound, playHoverSound } from "../utils/audio";
import logoImg from "../assets/images/ahsan_brand_logo_1785125990969.jpg";

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {
    soundEnabled,
    toggleSound,
    cyberMode,
    toggleCyberMode,
    xp,
    setIsTerminalOpen,
    setIsCalculatorOpen,
    setIsChatbotOpen,
    activeSection,
    setActiveSection
  } = useAppStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Section tracking
      const sections = ["home", "about", "experience", "expertise", "services", "stack", "portfolio", "pricing", "office", "contact"];
      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sec);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setActiveSection]);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "expertise", label: "Expertise" },
    { id: "services", label: "Services" },
    { id: "stack", label: "Stack" },
    { id: "portfolio", label: "Portfolio" },
    { id: "pricing", label: "Pricing" },
    { id: "office", label: "3D Office" },
    { id: "contact", label: "Contact" },
  ];

  const scrollToSection = (id: string) => {
    playClickSound(soundEnabled);
    setActiveSection(id);
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 flex justify-center px-4 pt-4 pb-2 transition-all duration-300">
        <motion.nav
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className={`w-full max-w-7xl rounded-2xl border transition-all duration-300 flex items-center justify-between px-4 lg:px-6 ${
            scrolled
              ? "py-2.5 bg-black/80 backdrop-blur-xl border-white/10 shadow-[0_10px_30px_rgba(130,1,242,0.2)]"
              : "py-3.5 bg-white/[0.02] backdrop-blur-md border-white/[0.08]"
          }`}
          id="main-navbar"
        >
          {/* Logo & Brand */}
          <button
            onClick={() => scrollToSection("home")}
            onMouseEnter={() => playHoverSound(soundEnabled)}
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden border border-[#8201F2]/60 shadow-[0_0_15px_rgba(130,1,242,0.6)] group-hover:scale-105 transition-transform flex-shrink-0 bg-black">
              <img
                src={logoImg}
                alt="Ahsan Durrani Logo"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="text-sm font-bold text-white tracking-wide font-sans group-hover:text-purple-300 transition-colors flex items-center gap-1.5">
                AHSAN DURRANI
                {cyberMode && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-500/30 text-purple-300 border border-purple-500/50 font-mono">
                    CYBER
                  </span>
                )}
              </div>
              <div className="text-[10px] text-[#B8B8B8] font-mono tracking-widest hidden sm:block">
                SOLUTIONS ENGINEER
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center gap-1 bg-white/[0.03] border border-white/10 rounded-full px-3 py-1 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  onMouseEnter={() => playHoverSound(soundEnabled)}
                  className={`relative px-3 py-1.5 text-xs font-medium transition-all duration-200 rounded-full cursor-pointer ${
                    isActive ? "text-white font-semibold" : "text-[#B8B8B8] hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavBg"
                      className="absolute inset-0 bg-[#8201F2] rounded-full shadow-[0_0_12px_#8201F2]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}
          </div>

          {/* Controls & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Gamified XP Rank Badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/40 border border-[#8201F2]/40 text-xs font-mono text-purple-200 shadow-[0_0_10px_rgba(130,1,242,0.2)]">
              <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-spin" style={{ animationDuration: "6s" }} />
              <span>{xp} XP</span>
            </div>

            {/* Sound Toggle Button */}
            <button
              onClick={() => {
                playClickSound(!soundEnabled);
                toggleSound();
              }}
              title={soundEnabled ? "Mute Audio SFX" : "Enable Audio SFX"}
              onMouseEnter={() => playHoverSound(soundEnabled)}
              className="p-2 rounded-xl bg-white/[0.05] border border-white/10 text-white/80 hover:text-white hover:border-[#8201F2]/60 hover:bg-[#8201F2]/20 transition-all cursor-pointer"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-purple-400" /> : <VolumeX className="w-4 h-4 text-gray-500" />}
            </button>

            {/* Terminal CLI Button */}
            <button
              onClick={() => {
                playClickSound(soundEnabled);
                setIsTerminalOpen(true);
              }}
              title="Open Developer Hacker Terminal (Ctrl+Shift+T)"
              onMouseEnter={() => playHoverSound(soundEnabled)}
              className="p-2 rounded-xl bg-white/[0.05] border border-white/10 text-white/80 hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all cursor-pointer hidden md:flex items-center gap-1 font-mono text-xs"
            >
              <TerminalIcon className="w-4 h-4 text-emerald-400" />
              <span className="hidden lg:inline text-[10px]">CLI</span>
            </button>

            {/* Hire Me Primary Button */}
            <button
              onClick={() => scrollToSection("contact")}
              onMouseEnter={() => playHoverSound(soundEnabled)}
              className="px-4 py-2 rounded-xl bg-[#8201F2] hover:bg-purple-600 text-white text-xs font-bold tracking-wide transition-all shadow-[0_0_20px_rgba(130,1,242,0.5)] hover:shadow-[0_0_30px_rgba(130,1,242,0.8)] hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 fill-white text-white" />
              <span>Hire Me</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/[0.05] border border-white/10 text-white xl:hidden cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-20 z-40 rounded-2xl bg-black/95 border border-white/10 backdrop-blur-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.9)] xl:hidden"
          >
            <div className="grid grid-cols-2 gap-2 mb-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`p-3 rounded-xl text-left text-sm font-medium transition-all ${
                    activeSection === link.id
                      ? "bg-[#8201F2] text-white shadow-[0_0_15px_#8201F2]"
                      : "bg-white/[0.03] border border-white/5 text-[#B8B8B8] hover:text-white"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsCalculatorOpen(true);
                }}
                className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-semibold flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>AI Project Cost Calculator</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsChatbotOpen(true);
                }}
                className="w-full py-2.5 rounded-xl bg-purple-900/30 border border-purple-500/40 text-purple-200 text-xs font-semibold flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-purple-400" />
                <span>Chat with Ahsan AI</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
