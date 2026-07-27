import React from "react";
import { motion } from "motion/react";
import { AHSAN_INFO } from "../data/portfolioData";
import { ArrowUp, Heart, Terminal, Sparkles } from "lucide-react";
import { useAppStore } from "../store/useAppStore";
import { playClickSound, playHoverSound } from "../utils/audio";
import logoImg from "../assets/images/ahsan_brand_logo_1785125990969.jpg";

export const Footer: React.FC = () => {
  const { soundEnabled, setIsTerminalOpen, setIsCalculatorOpen } = useAppStore();

  const scrollToTop = () => {
    playClickSound(soundEnabled);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-black border-t border-white/10 pt-12 pb-8 px-4 lg:px-8 text-white font-sans overflow-hidden">
      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[#8201F2]/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-8 border-b border-white/10">
          {/* Col 1 Brand */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-[#8201F2]/60 shadow-[0_0_15px_#8201F2] flex-shrink-0 bg-black">
                <img
                  src={logoImg}
                  alt="Ahsan Durrani Logo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Ahsan Durrani
              </span>
            </div>

            <p className="text-xs text-[#B8B8B8] max-w-sm leading-relaxed">
              Senior Web Developer & Digital Solution Engineer crafting modern websites, custom WordPress themes, Laravel platforms, and AI systems worldwide.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-[10px] font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>ALL SYSTEMS OPERATIONAL</span>
            </div>
          </div>

          {/* Col 2 Quick Links */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs text-[#B8B8B8]">
            <div className="text-white font-bold uppercase tracking-wider text-xs mb-2">
              NAVIGATION
            </div>
            {["home", "about", "expertise", "services", "portfolio", "pricing"].map((sec) => (
              <a
                key={sec}
                href={`#${sec}`}
                className="block hover:text-white transition-colors capitalize"
              >
                • {sec}
              </a>
            ))}
          </div>

          {/* Col 3 Interactive Utilities */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-white font-bold uppercase tracking-wider text-xs mb-2 font-mono">
              DEVELOPER UTILITIES
            </div>
            <button
              onClick={() => {
                playClickSound(soundEnabled);
                setIsCalculatorOpen(true);
              }}
              className="w-full p-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#8201F2] text-xs text-white font-mono flex items-center justify-between transition-all cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>AI Scope & Cost Calculator</span>
              </span>
              <span className="text-[#8201F2]">&gt;</span>
            </button>

            <button
              onClick={() => {
                playClickSound(soundEnabled);
                setIsTerminalOpen(true);
              }}
              className="w-full p-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-emerald-500 text-xs text-emerald-400 font-mono flex items-center justify-between transition-all cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5" />
                <span>Developer CLI Terminal</span>
              </span>
              <span>&gt;</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#B8B8B8] font-mono">
          <div>
            © {new Date().getFullYear()} Ahsan Durrani. All rights reserved.
          </div>

          <div className="flex items-center gap-1">
            <span>Engineered with precision for digital growth</span>
          </div>

          <button
            onClick={scrollToTop}
            onMouseEnter={() => playHoverSound(soundEnabled)}
            className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-[#8201F2] hover:border-[#8201F2] text-white transition-all cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
