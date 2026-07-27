import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAppStore } from "../store/useAppStore";
import logoImg from "../assets/images/ahsan_brand_logo_1785125990969.jpg";
import { Sparkles, Cpu } from "lucide-react";

interface LoadingScreenProps {
  onComplete?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING SYSTEM...");
  const { setIsLoading, isLoading } = useAppStore();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 7) + 2;

        if (next < 30) {
          setStatusText("LOADING CORE ARCHITECTURE...");
        } else if (next < 60) {
          setStatusText("COMPILING INTERACTIVE COMPONENTS...");
        } else if (next < 90) {
          setStatusText("OPTIMIZING DIGITAL ASSETS...");
        } else {
          setStatusText("WELCOME TO AHSAN DURRANI'S PORTFOLIO");
        }

        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
            if (onComplete) onComplete();
          }, 350);
          return 100;
        }
        return next;
      });
    }, 28);

    return () => clearInterval(interval);
  }, [onComplete, setIsLoading]);

  if (!isLoading) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.04 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white select-none overflow-hidden"
        id="loading-screen"
      >
        {/* Background Radial Glow & Ambient Pulses */}
        <div className="absolute w-[600px] h-[600px] rounded-full bg-[#8201F2]/20 blur-[160px] pointer-events-none animate-pulse" />
        <div className="absolute w-[350px] h-[350px] rounded-full bg-indigo-600/15 blur-[120px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center px-4">
          {/* Animated Logo Container with Image */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative mb-6"
          >
            {/* Outer Glow Ring */}
            <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-[#8201F2] via-purple-500 to-indigo-500 opacity-60 blur-lg animate-pulse" />

            {/* Logo Image Box */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-black p-1.5 border border-white/20 shadow-[0_0_50px_rgba(130,1,242,0.6)] overflow-hidden flex items-center justify-center">
              <img
                src={logoImg}
                alt="Ahsan Durrani Logo"
                className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>

          {/* Name & Title */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center mb-8"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-[#8201F2] font-sans drop-shadow-[0_0_25px_rgba(130,1,242,0.4)]">
              AHSAN DURRANI
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <Cpu className="w-3.5 h-3.5 text-[#8201F2]" />
              <p className="text-xs sm:text-sm font-mono tracking-widest text-[#B8B8B8] uppercase">
                Senior Web Developer & Solution Engineer
              </p>
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            </div>
          </motion.div>

          {/* Progress Bar & Status */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-72 sm:w-80 flex flex-col items-center"
          >
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/15 backdrop-blur-md">
              <motion.div
                className="h-full bg-gradient-to-r from-[#8201F2] via-purple-400 to-indigo-300 rounded-full shadow-[0_0_15px_#8201F2]"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            <div className="w-full flex justify-between items-center mt-3 font-mono text-[11px] text-gray-400 tracking-wider">
              <span className="truncate max-w-[200px] text-left text-gray-300 font-semibold">{statusText}</span>
              <span className="text-[#8201F2] font-bold text-sm font-mono">{progress}%</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

