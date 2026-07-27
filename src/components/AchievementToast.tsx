import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Trophy, Sparkles, X } from "lucide-react";
import { useAppStore } from "../store/useAppStore";

export const AchievementToast: React.FC = () => {
  const { recentToast, clearRecentToast } = useAppStore();

  useEffect(() => {
    if (recentToast) {
      const timer = setTimeout(() => {
        clearRecentToast();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [recentToast, clearRecentToast]);

  if (!recentToast) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 p-4 rounded-2xl bg-black/95 border-2 border-[#8201F2] shadow-[0_0_35px_#8201F2] backdrop-blur-2xl flex items-center gap-4 text-white max-w-md w-full"
      >
        <div className="w-12 h-12 rounded-xl bg-[#8201F2] flex items-center justify-center text-white shrink-0 shadow-[0_0_20px_#8201F2]">
          <Trophy className="w-6 h-6 text-yellow-300 animate-bounce" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="text-[10px] font-mono text-purple-300 font-bold uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>ACHIEVEMENT UNLOCKED (+{recentToast.xp} XP)</span>
          </div>
          <h4 className="text-base font-bold text-white leading-tight truncate">
            {recentToast.title}
          </h4>
          <p className="text-xs text-[#B8B8B8] leading-tight truncate mt-0.5">
            {recentToast.desc}
          </p>
        </div>

        <button
          onClick={clearRecentToast}
          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
