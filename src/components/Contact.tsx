import React, { useState } from "react";
import { motion } from "motion/react";
import { AHSAN_INFO } from "../data/portfolioData";
import {
  Mail,
  Phone,
  MessageSquare,
  Facebook,
  Linkedin,
  Send,
  CheckCircle2,
  Sparkles,
  Zap,
  Globe
} from "lucide-react";
import { useAppStore } from "../store/useAppStore";
import { playClickSound, playHoverSound } from "../utils/audio";

export const Contact: React.FC = () => {
  const { soundEnabled, addXP } = useAppStore();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "Business Website",
    budget: "$1,000 - $2,500",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      setError("Please fill in your name and email address.");
      return;
    }

    setSubmitting(true);
    setError(null);
    playClickSound(soundEnabled);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (data.success) {
        setSuccess("Thank you! Your project request has been submitted to Ahsan Durrani. Ahsan will respond via email/phone within 12 hours.");
        addXP(100, "Submitted project lead request");
        setForm({
          name: "",
          email: "",
          phone: "",
          projectType: "Business Website",
          budget: "$1,000 - $2,500",
          message: "",
        });
      } else {
        setError("Could not submit request. Please try again or email AhsanDurraniHR@gmail.com directly.");
      }
    } catch (err) {
      setError("Network error. Please contact AhsanDurraniHR@gmail.com directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-16 sm:py-20 px-4 lg:px-8 bg-black">
      {/* Background Atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#8201F2]/15 blur-[220px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="text-xs font-mono tracking-widest text-[#8201F2] uppercase font-bold px-3.5 py-1.5 rounded-full bg-[#8201F2]/10 border border-[#8201F2]/30">
            INITIATE COLLABORATION
          </span>
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight mt-4 mb-3">
            Let's Build Something Great
          </h2>
          <p className="text-base sm:text-xl text-[#B8B8B8] max-w-2xl mx-auto">
            Ready to turn your vision into a modern, high-converting digital product?
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact Info & Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl space-y-6">
              <h3 className="text-2xl font-bold text-white mb-2">Direct Contact Channels</h3>
              <p className="text-sm text-[#B8B8B8] leading-relaxed">
                Reach Ahsan directly via email, WhatsApp, phone, or social media for instant project discussions.
              </p>

              {/* Email */}
              <a
                href={`mailto:${AHSAN_INFO.email}`}
                onMouseEnter={() => playHoverSound(soundEnabled)}
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#8201F2] hover:bg-[#8201F2]/10 transition-all flex items-center gap-4 text-white group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-[#8201F2]/20 border border-[#8201F2]/50 flex items-center justify-center text-[#8201F2] shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-mono text-[#B8B8B8] uppercase">EMAIL ADDRESS</div>
                  <div className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors truncate">
                    {AHSAN_INFO.email}
                  </div>
                </div>
              </a>

              {/* Phone / WhatsApp */}
              <a
                href={AHSAN_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => playHoverSound(soundEnabled)}
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-emerald-500 hover:bg-emerald-500/10 transition-all flex items-center gap-4 text-white group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-mono text-[#B8B8B8] uppercase">WHATSAPP / PHONE</div>
                  <div className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {AHSAN_INFO.phone}
                  </div>
                </div>
              </a>

              {/* Location */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-4 text-white">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/50 flex items-center justify-center text-purple-300 shrink-0">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#B8B8B8] uppercase">AVAILABILITY</div>
                  <div className="text-sm font-bold text-white">{AHSAN_INFO.location}</div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-white/10">
                <div className="text-xs font-mono text-[#B8B8B8] uppercase tracking-wider mb-3">
                  CONNECT ON SOCIAL
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={AHSAN_INFO.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#8201F2] hover:bg-[#8201F2]/20 text-white transition-all cursor-pointer"
                  >
                    <Linkedin className="w-5 h-5 text-purple-300" />
                  </a>
                  <a
                    href={AHSAN_INFO.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#8201F2] hover:bg-[#8201F2]/20 text-white transition-all cursor-pointer"
                  >
                    <Facebook className="w-5 h-5 text-purple-300" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Submission Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-gray-900/90 to-black border border-white/10 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span>Send a Project Proposal</span>
                <Sparkles className="w-5 h-5 text-purple-400" />
              </h3>

              {success ? (
                <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 text-emerald-200 space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                  <h4 className="text-lg font-bold text-white">Proposal Received!</h4>
                  <p className="text-xs leading-relaxed">{success}</p>
                  <button
                    onClick={() => setSuccess(null)}
                    className="px-4 py-2 rounded-xl bg-emerald-500 text-black font-bold text-xs cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {error && (
                    <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/50 text-red-300 text-xs">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-[#B8B8B8] uppercase mb-2">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-[#8201F2]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#B8B8B8] uppercase mb-2">
                        Your Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-[#8201F2]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-[#B8B8B8] uppercase mb-2">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="text"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-[#8201F2]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#B8B8B8] uppercase mb-2">
                        Project Category
                      </label>
                      <select
                        value={form.projectType}
                        onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-white/10 text-white text-xs focus:outline-none focus:border-[#8201F2]"
                      >
                        <option value="Business Website">Business Website</option>
                        <option value="WordPress Theme/Plugin">WordPress Theme/Plugin</option>
                        <option value="Laravel Web Application">Laravel Web Application</option>
                        <option value="AI Solution / Chatbot">AI Solution / Chatbot</option>
                        <option value="Website Security / Malware Removal">Website Security / Malware Removal</option>
                        <option value="SEO & Speed Tuning">SEO & Speed Tuning</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#B8B8B8] uppercase mb-2">
                      Project Details & Goals
                    </label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Describe your project requirements, goals, and ideal launch timeline..."
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-[#8201F2]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 rounded-xl bg-[#8201F2] hover:bg-purple-600 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_25px_#8201F2] hover:shadow-[0_0_40px_#8201F2] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? (
                      <span>Transmitting Proposal...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Project Proposal</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
