import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState<"default" | "hover" | "view" | "play" | "chat">("default");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only run on desktop/devices with a fine pointer
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      setPosition({ x: e.clientX, y: e.clientY });

      // Detect hover target
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("button, a, input, textarea, select, [role='button']");
      const viewable = target.closest("[data-cursor='view']");
      const playable = target.closest("[data-cursor='play']");
      const chatable = target.closest("[data-cursor='chat']");

      if (playable) {
        setCursorType("play");
      } else if (viewable) {
        setCursorType("view");
      } else if (chatable) {
        setCursorType("chat");
      } else if (interactive) {
        setCursorType("hover");
      } else {
        setCursorType("default");
      }
    };

    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  useEffect(() => {
    let animationFrameId: number;
    const followCursor = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.18,
        y: prev.y + (position.y - prev.y) * 0.18,
      }));
      animationFrameId = requestAnimationFrame(followCursor);
    };
    animationFrameId = requestAnimationFrame(followCursor);
    return () => cancelAnimationFrame(animationFrameId);
  }, [position]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block" id="custom-cursor">
      {/* Primary Glowing Purple Center Dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-[#8201F2] rounded-full shadow-[0_0_12px_#8201F2]"
        style={{
          transform: `translate3d(${position.x - 6}px, ${position.y - 6}px, 0)`,
        }}
      />

      {/* Secondary Outer Trailing Ring */}
      <motion.div
        className={`fixed top-0 left-0 rounded-full border border-[#8201F2]/60 bg-[#8201F2]/10 backdrop-blur-[1px] flex items-center justify-center font-mono text-[10px] uppercase font-bold text-white transition-all duration-200 shadow-[0_0_20px_rgba(130,1,242,0.3)] ${
          cursorType === "hover"
            ? "w-12 h-12 border-purple-400 bg-[#8201F2]/20"
            : cursorType === "view"
            ? "w-16 h-16 border-white bg-[#8201F2]/40 text-white"
            : cursorType === "play"
            ? "w-16 h-16 border-emerald-400 bg-emerald-500/20 text-emerald-300"
            : cursorType === "chat"
            ? "w-14 h-14 border-purple-300 bg-purple-600/30 text-white"
            : "w-8 h-8"
        }`}
        style={{
          transform: `translate3d(${
            trailingPos.x -
            (cursorType === "view" || cursorType === "play" ? 32 : cursorType === "hover" ? 24 : cursorType === "chat" ? 28 : 16)
          }px, ${
            trailingPos.y -
            (cursorType === "view" || cursorType === "play" ? 32 : cursorType === "hover" ? 24 : cursorType === "chat" ? 28 : 16)
          }px, 0)`,
        }}
      >
        {cursorType === "view" && "VIEW"}
        {cursorType === "play" && "PLAY"}
        {cursorType === "chat" && "CHAT"}
      </motion.div>
    </div>
  );
};
