import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Sparkles, CheckCircle2, ArrowRight, Calculator, Bot, DollarSign, Clock } from "lucide-react";
import { useAppStore } from "../store/useAppStore";
import { playClickSound, playHoverSound } from "../utils/audio";

export const AICostCalculator: React.FC = () => {
  const { isCalculatorOpen, setIsCalculatorOpen, soundEnabled } = useAppStore();

  const [step, setStep] = useState(1);
  const [projectType, setProjectType] = useState("WordPress Website");
  const [projectSize, setProjectSize] = useState("Medium");
  const [timeline, setTimeline] = useState("Normal");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    "Mobile Responsive",
    "Speed Optimization",
  ]);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  if (!isCalculatorOpen) return null;

  const toggleFeature = (feat: string) => {
    playClickSound(soundEnabled);
    if (selectedFeatures.includes(feat)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== feat));
    } else {
      setSelectedFeatures([...selectedFeatures, feat]);
    }
  };

  const calculateEstimate = async () => {
    setLoading(true);
    playClickSound(soundEnabled);

    try {
      const response = await fetch("/api/ai-consultant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectType,
          projectSize,
          timeline,
          features: selectedFeatures,
        }),
      });

      const data = await response.json();
      setResult(data);
      setStep(3);
    } catch (e) {
      console.error("Consultant error:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setResult(null);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-3xl rounded-3xl bg-gradient-to-b from-gray-900 via-black to-black border border-[#8201F2]/50 shadow-[0_25px_80px_rgba(130,1,242,0.5)] overflow-hidden p-6 sm:p-10 my-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#8201F2]/20 border border-[#8201F2]/50 flex items-center justify-center text-[#8201F2]">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>AI Scope & Cost Calculator</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    POWERED BY GEMINI
                  </span>
                </h3>
                <p className="text-xs text-[#B8B8B8]">Get instant project estimations and strategic advice</p>
              </div>
            </div>
            <button
              onClick={() => setIsCalculatorOpen(false)}
              className="p-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-[#8201F2] transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Step 1: Project Parameters */}
          {step === 1 && (
            <div className="space-y-6">
              {/* Type */}
              <div>
                <label className="block text-xs font-mono text-[#B8B8B8] uppercase tracking-wider mb-2">
                  1. Select Project Type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    "Business Website",
                    "E-commerce Store",
                    "WordPress Site",
                    "Laravel Web App",
                    "AI Solution / Bot",
                    "Website Security / SEO",
                  ].map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        playClickSound(soundEnabled);
                        setProjectType(t);
                      }}
                      className={`p-3 rounded-xl text-xs font-semibold text-left border transition-all cursor-pointer ${
                        projectType === t
                          ? "bg-[#8201F2] border-purple-400 text-white shadow-[0_0_15px_#8201F2]"
                          : "bg-white/[0.03] border-white/10 text-[#B8B8B8] hover:text-white"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <label className="block text-xs font-mono text-[#B8B8B8] uppercase tracking-wider mb-2">
                  2. Project Size & Scope
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {["Small", "Medium", "Enterprise"].map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        playClickSound(soundEnabled);
                        setProjectSize(s);
                      }}
                      className={`p-3 rounded-xl text-xs font-semibold text-center border transition-all cursor-pointer ${
                        projectSize === s
                          ? "bg-[#8201F2] border-purple-400 text-white shadow-[0_0_15px_#8201F2]"
                          : "bg-white/[0.03] border-white/10 text-[#B8B8B8] hover:text-white"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div>
                <label className="block text-xs font-mono text-[#B8B8B8] uppercase tracking-wider mb-2">
                  3. Delivery Timeline
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {["Urgent (Express)", "Normal", "Flexible"].map((tl) => (
                    <button
                      key={tl}
                      onClick={() => {
                        playClickSound(soundEnabled);
                        setTimeline(tl);
                      }}
                      className={`p-3 rounded-xl text-xs font-semibold text-center border transition-all cursor-pointer ${
                        timeline === tl
                          ? "bg-[#8201F2] border-purple-400 text-white shadow-[0_0_15px_#8201F2]"
                          : "bg-white/[0.03] border-white/10 text-[#B8B8B8] hover:text-white"
                      }`}
                    >
                      {tl}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-xl bg-[#8201F2] text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-[0_0_20px_#8201F2]"
                >
                  <span>Next: Choose Features</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Features Selection */}
          {step === 2 && (
            <div className="space-y-6">
              <label className="block text-xs font-mono text-[#B8B8B8] uppercase tracking-wider mb-2">
                Select Required Features & Enhancements
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Mobile Responsive Design",
                  "100/100 Speed Optimization",
                  "Custom Admin Dashboard",
                  "WooCommerce / Payment Gateways",
                  "AI Chatbot Integration",
                  "Security Hardening & Malware Shield",
                  "Technical SEO & Schema Markup",
                  "Custom REST API Endpoints",
                ].map((feat) => {
                  const isSelected = selectedFeatures.includes(feat);
                  return (
                    <button
                      key={feat}
                      onClick={() => toggleFeature(feat)}
                      className={`p-3.5 rounded-xl text-xs font-semibold text-left border flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#8201F2]/20 border-[#8201F2] text-white"
                          : "bg-white/[0.03] border-white/10 text-[#B8B8B8] hover:text-white"
                      }`}
                    >
                      <span>{feat}</span>
                      <CheckCircle2
                        className={`w-4 h-4 ${
                          isSelected ? "text-[#8201F2]" : "text-gray-600"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              <div className="pt-6 flex justify-between gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={calculateEstimate}
                  disabled={loading}
                  className="px-8 py-3 rounded-xl bg-[#8201F2] hover:bg-purple-600 text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-[0_0_25px_#8201F2]"
                >
                  {loading ? (
                    <span>Calculating with AI...</span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Generate AI Estimate</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Result Breakdown */}
          {step === 3 && result && (
            <div className="space-y-6">
              {/* Proposal Strategic Summary */}
              <div className="p-5 rounded-2xl bg-purple-950/30 border border-[#8201F2]/50 text-purple-200 text-xs sm:text-sm leading-relaxed">
                <div className="flex items-center gap-2 font-mono font-bold text-white mb-2">
                  <Bot className="w-4 h-4 text-purple-400" />
                  <span>Strategic AI Recommendation</span>
                </div>
                <p>{result.recommendation}</p>
              </div>

              {/* Estimate Numbers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-[#B8B8B8]">ESTIMATED BUDGET</div>
                    <div className="text-2xl font-black text-white font-mono">
                      {result.estimatedBudget}
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-[#B8B8B8]">TIMEFRAME</div>
                    <div className="text-xl font-bold text-white font-mono">
                      {result.estimatedTimeframe}
                    </div>
                  </div>
                </div>
              </div>

              {/* Deliverables */}
              <div>
                <h4 className="text-xs font-mono text-[#B8B8B8] uppercase tracking-wider mb-2">
                  Included Deliverables
                </h4>
                <div className="space-y-2">
                  {result.keyDeliverables?.map((del: string, dIdx: number) => (
                    <div key={dIdx} className="flex items-center gap-2 text-xs text-white">
                      <CheckCircle2 className="w-4 h-4 text-[#8201F2] shrink-0" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-between gap-3">
                <button
                  onClick={handleReset}
                  className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold cursor-pointer"
                >
                  Recalculate
                </button>
                <button
                  onClick={() => {
                    setIsCalculatorOpen(false);
                    const el = document.getElementById("contact");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-8 py-3 rounded-xl bg-[#8201F2] hover:bg-purple-600 text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-[0_0_20px_#8201F2]"
                >
                  <span>Lock in Estimate & Hire Ahsan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
