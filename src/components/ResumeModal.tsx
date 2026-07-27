import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Download, FileText, CheckCircle, Mail, Phone, Globe, Briefcase, GraduationCap } from "lucide-react";
import { useAppStore } from "../store/useAppStore";
import { AHSAN_INFO } from "../data/portfolioData";

export const ResumeModal: React.FC = () => {
  const { isResumeOpen, setIsResumeOpen } = useAppStore();

  if (!isResumeOpen) return null;

  const handleDownload = () => {
    // Generate simple printable view or download trigger
    const printableContent = `
AHSAN DURRANI — SENIOR WEB DEVELOPER & DIGITAL SOLUTION ENGINEER
Email: ${AHSAN_INFO.email} | Phone: ${AHSAN_INFO.phone} | Location: ${AHSAN_INFO.location}
Website: https://ahsan-durrani.dev | LinkedIn: ${AHSAN_INFO.linkedin}

SUMMARY:
${AHSAN_INFO.bio}

CORE SKILLS:
• Custom WordPress Theme & Plugin Engineering
• Laravel Full-Stack Application Development & REST APIs
• React, Next.js, TypeScript, Tailwind CSS, GSAP
• AI Integration (Gemini / OpenAI), Chatbots, Automation
• Website Security Hardening, Malware Removal, Cloudflare
• Technical SEO & Core Web Vitals Optimization (100/100)

EXPERIENCE:
• Senior Web Developer & Digital Solution Engineer (2024–Present)
• Lead Full Stack & WordPress Developer (2022–2024)
• WordPress & Frontend Specialist (2020–2022)
    `;

    const blob = new Blob([printableContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Ahsan_Durrani_Resume.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-3xl rounded-3xl bg-gradient-to-b from-gray-900 via-black to-black border border-white/10 shadow-[0_25px_80px_rgba(130,1,242,0.4)] overflow-hidden p-6 sm:p-10 my-8 text-white font-sans"
        >
          {/* Header Controls */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#8201F2]/20 border border-[#8201F2] flex items-center justify-center text-[#8201F2]">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Curriculum Vitae</h3>
                <p className="text-xs text-[#B8B8B8]">Ahsan Durrani — Senior Web Developer</p>
              </div>
            </div>

            <button
              onClick={() => setIsResumeOpen(false)}
              className="p-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-[#8201F2] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Resume Body View */}
          <div className="space-y-6 text-sm text-[#B8B8B8] leading-relaxed">
            {/* Contact Header Strip */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#8201F2]" />
                <span className="text-white">{AHSAN_INFO.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#8201F2]" />
                <span className="text-white">{AHSAN_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#8201F2]" />
                <span className="text-white">{AHSAN_INFO.location}</span>
              </div>
            </div>

            {/* Profile */}
            <div>
              <h4 className="text-xs font-mono font-bold text-[#8201F2] uppercase tracking-wider mb-2">
                EXECUTIVE SUMMARY
              </h4>
              <p className="text-xs sm:text-sm text-gray-200">{AHSAN_INFO.bio}</p>
            </div>

            {/* Core Competencies */}
            <div>
              <h4 className="text-xs font-mono font-bold text-[#8201F2] uppercase tracking-wider mb-2">
                CORE TECHNICAL COMPETENCIES
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {[
                  "WordPress Custom PHP Theme & Plugin Engineering",
                  "Laravel 11 RESTful APIs & Web Applications",
                  "React 19, Next.js 15, Tailwind CSS, GSAP",
                  "AI Automation & Gemini API Implementations",
                  "Website Malware Removal & Cloudflare WAF",
                  "100/100 Core Web Vitals & Technical SEO Audits",
                ].map((sk, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-white">
                    <CheckCircle className="w-3.5 h-3.5 text-[#8201F2] shrink-0" />
                    <span>{sk}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Career Track */}
            <div>
              <h4 className="text-xs font-mono font-bold text-[#8201F2] uppercase tracking-wider mb-2">
                CAREER HIGHLIGHTS
              </h4>
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="flex justify-between font-bold text-white text-xs mb-1">
                    <span>Senior Web Developer & Digital Solution Engineer</span>
                    <span className="text-[#8201F2] font-mono">2024 – Present</span>
                  </div>
                  <p className="text-[11px] text-gray-400">
                    Lead developer engineering custom web applications, e-commerce portals, and enterprise security platforms.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Strip */}
          <div className="pt-6 border-t border-white/10 flex justify-between gap-3 mt-6">
            <button
              onClick={() => setIsResumeOpen(false)}
              className="px-5 py-2.5 rounded-xl bg-white/5 text-white text-xs font-bold hover:bg-white/10 cursor-pointer"
            >
              Close Preview
            </button>
            <button
              onClick={handleDownload}
              className="px-6 py-2.5 rounded-xl bg-[#8201F2] hover:bg-purple-600 text-white text-xs font-bold flex items-center gap-2 shadow-[0_0_20px_#8201F2] cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
