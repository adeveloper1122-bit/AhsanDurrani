import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, MessageCircle, X } from "lucide-react";
import { useAppStore } from "../store/useAppStore";

export const AIAvatar: React.FC = () => {
  const { activeSection, setIsChatbotOpen } = useAppStore();
  const [hint, setHint] = useState("Welcome to Ahsan Durrani's Digital Experience!");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    switch (activeSection) {
      case "about":
        setHint("Ahsan has 5+ years experience building WordPress & Laravel solutions!");
        break;
      case "expertise":
        setHint("Explore Ahsan's verified skill proficiencies in React, PHP, and Security.");
        break;
      case "services":
        setHint("Need a custom website or AI chatbot? Click Request Proposal!");
        break;
      case "portfolio":
        setHint("Click any project card to open detailed engineering case studies.");
        break;
      case "pricing":
        setHint("Need an exact budget estimate? Try our AI Cost Calculator!");
        break;
      case "office":
        setHint("Click items in the 3D Virtual Office to test interactive features.");
        break;
      case "contact":
        setHint("Ready to launch? Submit the form or message directly on WhatsApp!");
        break;
      default:
        setHint("Welcome to Ahsan Durrani's Digital Experience!");
    }
  }, [activeSection]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 hidden md:block">
      <AnimatePresence mode="wait">
        <motion.div
          key={hint}
          initial={{ opacity: 0, x: -20, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -20, scale: 0.9 }}
          className="relative max-w-xs p-3.5 rounded-2xl bg-black/90 border border-[#8201F2]/60 backdrop-blur-xl shadow-[0_0_25px_rgba(130,1,242,0.3)] flex items-center gap-3"
        >
          {/* Holographic Avatar Dot */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8201F2] to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-[0_0_15px_#8201F2] relative">
            <Sparkles className="w-5 h-5 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-black" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="text-[9px] font-mono font-bold text-purple-300 uppercase tracking-wider flex items-center justify-between">
              <span>AHSAN AI AVATAR</span>
              <button
                onClick={() => setVisible(false)}
                className="text-gray-500 hover:text-white cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
            <p className="text-xs text-white/90 font-sans mt-0.5 leading-tight truncate">
              {hint}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
