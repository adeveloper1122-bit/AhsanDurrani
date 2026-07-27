import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Terminal as TerminalIcon, X, Send } from "lucide-react";
import { useAppStore } from "../store/useAppStore";
import { playClickSound } from "../utils/audio";

export const HackerTerminal: React.FC = () => {
  const { isTerminalOpen, setIsTerminalOpen, soundEnabled } = useAppStore();
  const [history, setHistory] = useState<string[]>([
    "============================================================",
    "AHSAN DURRANI [AHSAN-OS v5.2] DIGITAL EXPERIENCE TERMINAL",
    "Type 'help' to display available system commands.",
    "============================================================",
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === "T" || e.key === "t")) {
        e.preventDefault();
        setIsTerminalOpen(!isTerminalOpen);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isTerminalOpen, setIsTerminalOpen]);

  useEffect(() => {
    if (isTerminalOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isTerminalOpen]);

  if (!isTerminalOpen) return null;

  const handleCommand = (cmdStr: string) => {
    const cmd = cmdStr.trim().toLowerCase();
    playClickSound(soundEnabled);

    const newHist = [...history, `> ${cmdStr}`];

    switch (cmd) {
      case "help":
        newHist.push(
          "Available Commands:",
          "  about      - Display Ahsan's bio & background",
          "  skills     - List verified technical competencies",
          "  projects   - Show key portfolio project highlights",
          "  services   - List core development solutions",
          "  contact    - Get email, phone, and direct contact details",
          "  hire       - Jump directly to client hire form",
          "  clear      - Clear terminal screen"
        );
        break;

      case "about":
        newHist.push(
          "Ahsan Durrani — Senior Web Developer & Digital Solution Engineer",
          "5+ years crafting high-performance WordPress themes, Laravel web apps,",
          "AI automation chatbots, and enterprise security platforms."
        );
        break;

      case "skills":
        newHist.push(
          "Core Tech Stack:",
          "  • Frontend: React 19, Next.js 15, Tailwind CSS, GSAP",
          "  • Backend: PHP 8.3, Laravel 11, Node.js, REST APIs, MySQL",
          "  • WordPress: Custom Theme/Plugin Dev, WooCommerce, Speed Tuning",
          "  • AI & DevOps: Gemini API, OpenAI, Cloudflare WAF, Linux Hardening"
        );
        break;

      case "projects":
        newHist.push(
          "Featured Portfolio Highlights:",
          "  1. ApexFlow — AI-Powered Enterprise ERP & CRM Dashboard",
          "  2. Luxura Commerce — Custom Headless WordPress Store",
          "  3. CyberShield Guard — Automated Web Security Suite",
          "  4. Nexus AI — Lead Qualification & Engagement Bot"
        );
        break;

      case "services":
        newHist.push(
          "Solutions Offered:",
          "  1) Custom Website Development (<1s speed)",
          "  2) Bespoke WordPress Themes & Plugins",
          "  3) Scalable Laravel Web Applications",
          "  4) AI Chatbot & Automation Workflows",
          "  5) Malware Removal & Website Security",
          "  6) Technical SEO & Core Web Vitals Audit"
        );
        break;

      case "contact":
        newHist.push(
          "Direct Contact Information:",
          "  Email: AhsanDurraniHR@gmail.com",
          "  Phone/WhatsApp: +92 3180598980",
          "  LinkedIn: linkedin.com/in/ahsan-durrani"
        );
        break;

      case "hire":
        newHist.push("Redirecting to contact section...");
        setIsTerminalOpen(false);
        const el = document.getElementById("contact");
        if (el) el.scrollIntoView({ behavior: "smooth" });
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      default:
        newHist.push(`Command not recognized: '${cmd}'. Type 'help' for options.`);
    }

    setHistory(newHist);
    setInput("");
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-3xl rounded-3xl bg-black border border-emerald-500/50 p-6 shadow-[0_0_60px_rgba(16,185,129,0.3)] font-mono text-xs text-emerald-400 overflow-hidden flex flex-col h-[500px]"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-emerald-500/30 mb-4">
            <div className="flex items-center gap-2">
              <TerminalIcon className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-white tracking-widest">AHSAN-CLI-TERMINAL</span>
            </div>
            <button
              onClick={() => setIsTerminalOpen(false)}
              className="p-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-black transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Terminal History */}
          <div className="flex-1 overflow-y-auto space-y-1.5 leading-relaxed pr-2">
            {history.map((line, idx) => (
              <div key={idx} className="whitespace-pre-wrap">
                {line}
              </div>
            ))}
          </div>

          {/* Terminal Prompt Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCommand(input);
            }}
            className="pt-3 border-t border-emerald-500/30 flex items-center gap-2"
          >
            <span className="text-emerald-400 font-bold">&gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type command..."
              className="flex-1 bg-transparent text-emerald-300 focus:outline-none font-mono text-xs"
            />
            <button type="submit" className="text-emerald-400 hover:text-white cursor-pointer">
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
