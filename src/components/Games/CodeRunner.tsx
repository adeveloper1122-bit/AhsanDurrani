import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { X, Play, Trophy, Code } from "lucide-react";
import { useAppStore } from "../../store/useAppStore";

export const CodeRunner: React.FC = () => {
  const { activeGameModal, setActiveGameModal, addXP } = useAppStore();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  if (activeGameModal !== "codeRunner") return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-xl rounded-3xl bg-black border border-[#8201F2] p-6 shadow-[0_0_60px_rgba(130,1,242,0.5)] flex flex-col items-center"
      >
        <button
          onClick={() => setActiveGameModal(null)}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-white hover:bg-[#8201F2] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
            <Code className="w-6 h-6 text-[#8201F2]" />
            <span>CODE RUNNER ARCADE</span>
          </h3>
          <p className="text-xs text-[#B8B8B8] font-mono mt-1">
            Collect clean code blocks and avoid syntax errors to build XP!
          </p>
        </div>

        <div className="w-full p-8 bg-white/[0.03] border border-white/10 rounded-2xl text-center space-y-4">
          <Trophy className="w-12 h-12 text-[#8201F2] mx-auto" />
          <h4 className="text-lg font-bold text-white">Full Stack Runner Ready</h4>
          <p className="text-xs text-[#B8B8B8]">
            Earn XP while testing your developer reflexes. You have earned +50 XP for launching Code Runner!
          </p>
          <button
            onClick={() => {
              addXP(50, "Launched Code Runner Arcade");
              setActiveGameModal(null);
            }}
            className="px-6 py-3 rounded-xl bg-[#8201F2] text-white font-bold text-xs cursor-pointer shadow-[0_0_20px_#8201F2]"
          >
            Claim 50 XP & Close Arcade
          </button>
        </div>
      </motion.div>
    </div>
  );
};
