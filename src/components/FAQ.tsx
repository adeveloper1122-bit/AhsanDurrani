import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FAQS } from "../data/portfolioData";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useAppStore } from "../store/useAppStore";
import { playClickSound } from "../utils/audio";

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { soundEnabled } = useAppStore();

  const toggle = (idx: number) => {
    playClickSound(soundEnabled);
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative py-16 sm:py-20 px-4 lg:px-8 bg-black">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <span className="text-xs font-mono tracking-widest text-[#8201F2] uppercase font-bold px-3.5 py-1.5 rounded-full bg-[#8201F2]/10 border border-[#8201F2]/30">
            ANSWERS & CLARITY
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mt-4 mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-[#B8B8B8] max-w-xl mx-auto">
            Everything you need to know about working with Ahsan Durrani.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#8201F2]/50 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-base sm:text-lg font-bold text-white flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-[#8201F2] shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[#8201F2]" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6 pt-0 text-sm text-[#B8B8B8] leading-relaxed border-t border-white/5"
                    >
                      <p className="pt-4">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
