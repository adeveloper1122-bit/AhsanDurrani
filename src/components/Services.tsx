import React from "react";
import { motion } from "motion/react";
import { SERVICES } from "../data/portfolioData";
import {
  Code2,
  Globe,
  Server,
  Bot,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { useAppStore } from "../store/useAppStore";
import { playClickSound, playHoverSound } from "../utils/audio";

export const Services: React.FC = () => {
  const { soundEnabled, setIsCalculatorOpen } = useAppStore();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Code2":
        return Code2;
      case "Globe":
        return Globe;
      case "Server":
        return Server;
      case "Bot":
        return Bot;
      case "ShieldCheck":
        return ShieldCheck;
      default:
        return Zap;
    }
  };

  const handleSelectService = () => {
    playClickSound(soundEnabled);
    setIsCalculatorOpen(true);
  };

  return (
    <section id="services" className="relative py-16 sm:py-20 px-4 lg:px-8 bg-black">
      {/* Background Glow */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#8201F2]/10 blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="text-xs font-mono tracking-widest text-[#8201F2] uppercase font-bold px-3.5 py-1.5 rounded-full bg-[#8201F2]/10 border border-[#8201F2]/30">
            SOLUTIONS & OFFERS
          </span>
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight mt-4 mb-3">
            Services & Solutions
          </h2>
          <p className="text-base sm:text-xl text-[#B8B8B8] max-w-2xl mx-auto">
            High-performance engineering tailored to scale your business online.
          </p>
        </div>

        {/* 6 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((serv, idx) => {
            const Icon = getIcon(serv.iconName);
            return (
              <motion.div
                key={serv.id}
                whileHover={{ y: -8 }}
                onMouseEnter={() => playHoverSound(soundEnabled)}
                className={`relative rounded-3xl p-8 transition-all duration-300 border backdrop-blur-xl flex flex-col justify-between group ${
                  serv.popular
                    ? "bg-gradient-to-b from-gray-900/90 via-purple-950/20 to-black border-[#8201F2]/60 shadow-[0_0_40px_rgba(130,1,242,0.25)]"
                    : "bg-white/[0.02] border-white/10 hover:border-[#8201F2]/50 hover:bg-[#8201F2]/5"
                }`}
              >
                {/* Popular Badge */}
                {serv.popular && (
                  <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-[#8201F2] text-white font-mono text-[10px] font-bold tracking-wider uppercase shadow-[0_0_15px_#8201F2] flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>HIGH DEMAND</span>
                  </div>
                )}

                <div>
                  {/* Service Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-[#8201F2]/20 border border-[#8201F2]/50 flex items-center justify-center text-[#8201F2] mb-6 shadow-[0_0_20px_rgba(130,1,242,0.3)] group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-200 transition-colors">
                    {serv.title}
                  </h3>
                  <p className="text-sm text-[#B8B8B8] leading-relaxed mb-6">
                    {serv.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-2.5 mb-8 border-t border-white/10 pt-6">
                    {serv.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs text-white/90">
                        <CheckCircle2 className="w-4 h-4 text-[#8201F2] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Action Button */}
                <button
                  onClick={handleSelectService}
                  className="w-full py-3 px-4 rounded-xl bg-white/[0.05] hover:bg-[#8201F2] border border-white/10 hover:border-[#8201F2] text-white font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-[0_0_20px_#8201F2]"
                >
                  <span>Request Proposal</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
