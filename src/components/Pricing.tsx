import React from "react";
import { motion } from "motion/react";
import { PRICING_PACKAGES } from "../data/portfolioData";
import { CheckCircle2, Sparkles, ArrowRight, Calculator } from "lucide-react";
import { useAppStore } from "../store/useAppStore";
import { playClickSound, playHoverSound } from "../utils/audio";

export const Pricing: React.FC = () => {
  const { soundEnabled, setIsCalculatorOpen } = useAppStore();

  const handleSelectPackage = () => {
    playClickSound(soundEnabled);
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="pricing" className="relative py-16 sm:py-20 px-4 lg:px-8 bg-black">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#8201F2]/10 blur-[190px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="text-xs font-mono tracking-widest text-[#8201F2] uppercase font-bold px-3.5 py-1.5 rounded-full bg-[#8201F2]/10 border border-[#8201F2]/30">
            TRANSPARENT VALUE
          </span>
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight mt-4 mb-3">
            Investment & Packages
          </h2>
          <p className="text-base sm:text-xl text-[#B8B8B8] max-w-2xl mx-auto mb-8">
            Clear, honest pricing with guaranteed return on investment.
          </p>

          {/* AI Calculator Banner CTA */}
          <button
            onClick={() => {
              playClickSound(soundEnabled);
              setIsCalculatorOpen(true);
            }}
            onMouseEnter={() => playHoverSound(soundEnabled)}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-white/[0.04] hover:bg-[#8201F2]/20 border border-[#8201F2]/40 text-purple-200 text-xs font-mono font-bold transition-all shadow-[0_0_20px_rgba(130,1,242,0.3)] cursor-pointer"
          >
            <Calculator className="w-4 h-4 text-purple-400" />
            <span>Need a custom quote? Launch AI Cost Calculator</span>
            <Sparkles className="w-4 h-4 text-purple-400" />
          </button>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PRICING_PACKAGES.map((pkg) => (
            <motion.div
              key={pkg.id}
              whileHover={{ y: -8 }}
              onMouseEnter={() => playHoverSound(soundEnabled)}
              className={`relative rounded-3xl p-8 transition-all duration-300 border backdrop-blur-xl flex flex-col justify-between ${
                pkg.popular
                  ? "bg-gradient-to-b from-gray-900 via-purple-950/40 to-black border-[#8201F2] shadow-[0_0_50px_rgba(130,1,242,0.35)] scale-105 z-20"
                  : "bg-white/[0.02] border-white/10 hover:border-[#8201F2]/50 hover:bg-[#8201F2]/5"
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#8201F2] text-white font-mono text-[10px] font-bold tracking-wider uppercase shadow-[0_0_20px_#8201F2]">
                  MOST POPULAR CHOICE
                </div>
              )}

              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                <p className="text-xs text-[#B8B8B8] leading-relaxed mb-6">
                  {pkg.tagline}
                </p>

                {/* Price Display */}
                <div className="mb-6 pb-6 border-b border-white/10">
                  <span className="text-4xl sm:text-5xl font-black text-white font-mono">
                    {pkg.price}
                  </span>
                  {pkg.period && (
                    <span className="text-xs text-[#B8B8B8] font-mono ml-2">
                      / {pkg.period}
                    </span>
                  )}
                  <div className="text-[10px] font-mono text-purple-300 mt-2">
                    Ideal for: {pkg.recommendedFor}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((f, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5 text-xs text-white/90">
                      <CheckCircle2 className="w-4 h-4 text-[#8201F2] shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <button
                onClick={handleSelectPackage}
                className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  pkg.popular
                    ? "bg-[#8201F2] hover:bg-purple-600 text-white shadow-[0_0_25px_#8201F2]"
                    : "bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white"
                }`}
              >
                <span>{pkg.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
