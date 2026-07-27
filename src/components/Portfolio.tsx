import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PROJECTS } from "../data/portfolioData";
import { Project } from "../types";
import { useAppStore } from "../store/useAppStore";
import {
  ExternalLink,
  Eye,
  Sparkles,
  FolderGit2,
  Search,
  Filter,
  CheckCircle2,
  ArrowUpRight,
  TrendingUp,
  RotateCcw,
  Layers,
  Award,
  Zap,
  ShieldCheck
} from "lucide-react";
import { playClickSound, playHoverSound } from "../utils/audio";

export const Portfolio: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { soundEnabled, setSelectedProjectForModal } = useAppStore();

  // Extract all unique categories dynamically
  const categories = useMemo(() => {
    const set = new Set<string>();
    PROJECTS.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ["All", ...Array.from(set)];
  }, []);

  // Filter projects based on active category and search input
  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((p) => {
      const matchesCategory =
        activeCategory === "All" || p.category === activeCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.technologies.some((tech) => tech.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleOpenProject = (proj: Project, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    playClickSound(soundEnabled);
    setSelectedProjectForModal(proj);
  };

  const handleOpenLiveUrl = (url: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playClickSound(soundEnabled);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="portfolio" className="relative py-16 sm:py-20 px-4 lg:px-8 bg-black overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-[#8201F2]/10 blur-[200px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-900/10 blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="text-xs font-mono tracking-widest text-[#8201F2] uppercase font-bold px-3.5 py-1.5 rounded-full bg-[#8201F2]/10 border border-[#8201F2]/30 inline-flex items-center gap-1.5">
            <FolderGit2 className="w-3.5 h-3.5" />
            SHOWCASE OF EXCELLENCE & CASE STUDIES
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mt-4 mb-3">
            Featured Portfolio & Systems
          </h2>
          <p className="text-sm sm:text-lg text-[#B8B8B8] max-w-2xl mx-auto">
            Real-world web applications, custom WordPress themes, enterprise Laravel architectures, and AI automation systems built by Ahsan.
          </p>
        </div>

        {/* Quick Highlights Stats Banner */}
        <div className="mb-10 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-950/20 via-black to-indigo-950/20 border border-white/10 backdrop-blur-md grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          <div className="flex items-center justify-center gap-3">
            <div className="p-2 rounded-xl bg-[#8201F2]/20 text-[#8201F2]">
              <Award className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-sm font-bold text-white font-mono">100+ Projects</div>
              <div className="text-[11px] text-[#B8B8B8]">Delivered Worldwide</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
              <Zap className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-sm font-bold text-white font-mono">100 / 100 Speed</div>
              <div className="text-[11px] text-[#B8B8B8]">Core Web Vitals</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-sm font-bold text-white font-mono">Zero Vulnerability</div>
              <div className="text-[11px] text-[#B8B8B8]">Enterprise Hardened</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-sm font-bold text-white font-mono">Custom Architecture</div>
              <div className="text-[11px] text-[#B8B8B8]">Zero Bloated Builders</div>
            </div>
          </div>
        </div>

        {/* Controls Bar: Search & Category Pills */}
        <div className="space-y-4 mb-10">
          {/* Top Row: Search input + Results Counter */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:max-w-md">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects by tech, title e.g. Laravel, AI, WooCommerce..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#8201F2] focus:ring-1 focus:ring-[#8201F2] transition-all font-sans"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-purple-300 hover:text-white font-mono"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="text-xs font-mono text-[#B8B8B8] flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-[#8201F2]" />
              <span>
                Showing <strong className="text-white">{filteredProjects.length}</strong> of{" "}
                <strong className="text-white">{PROJECTS.length}</strong> case studies
              </span>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              const count =
                cat === "All"
                  ? PROJECTS.length
                  : PROJECTS.filter((p) => p.category === cat).length;

              return (
                <button
                  key={cat}
                  onClick={() => {
                    playClickSound(soundEnabled);
                    setActiveCategory(cat);
                  }}
                  onMouseEnter={() => playHoverSound(soundEnabled)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all flex items-center gap-2 cursor-pointer border ${
                    isActive
                      ? "bg-[#8201F2] text-white border-[#8201F2] shadow-[0_0_20px_rgba(130,1,242,0.5)] scale-105"
                      : "bg-white/[0.03] border-white/10 text-[#B8B8B8] hover:text-white hover:border-white/20 hover:bg-white/5"
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-white/10 text-gray-400"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((proj) => (
                <motion.div
                  key={proj.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  onClick={(e) => handleOpenProject(proj, e)}
                  onMouseEnter={() => playHoverSound(soundEnabled)}
                  className="group relative rounded-2xl bg-gradient-to-b from-white/[0.04] to-black border border-white/10 hover:border-[#8201F2]/70 overflow-hidden transition-all duration-300 shadow-xl hover:shadow-[0_0_35px_rgba(130,1,242,0.3)] cursor-pointer flex flex-col justify-between"
                >
                  {/* Top Glowing Border Accent */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#8201F2] via-purple-400 to-indigo-500 opacity-60 group-hover:opacity-100 transition-opacity" />

                  <div>
                    {/* Image Header Box */}
                    <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-gray-950">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-85 group-hover:opacity-65 transition-opacity" />

                      {/* Top Badges */}
                      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[10px] font-mono font-bold text-purple-300">
                          {proj.category}
                        </span>

                        {proj.featured && (
                          <span className="px-2.5 py-1 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-500/40 text-[10px] font-mono font-bold text-amber-300 flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-amber-300" />
                            FEATURED
                          </span>
                        )}
                      </div>

                      {/* Hover Actions Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                        <button
                          onClick={(e) => handleOpenProject(proj, e)}
                          className="px-4 py-2 rounded-xl bg-[#8201F2] text-white font-mono text-xs font-bold shadow-[0_0_20px_#8201F2] flex items-center gap-1.5 hover:scale-105 transition-transform"
                        >
                          <Eye className="w-4 h-4" />
                          <span>Case Study</span>
                        </button>

                        {proj.liveUrl && (
                          <button
                            onClick={(e) => handleOpenLiveUrl(proj.liveUrl!, e)}
                            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs font-bold transition-all hover:scale-105"
                            title="Open Live Preview"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-purple-200 transition-colors line-clamp-2">
                        {proj.title}
                      </h3>

                      <p className="text-xs text-[#B8B8B8] leading-relaxed line-clamp-2 mb-4">
                        {proj.description}
                      </p>

                      {/* Key Result Highlight Box */}
                      {proj.results && proj.results.length > 0 && (
                        <div className="mb-4 p-2.5 rounded-xl bg-purple-950/30 border border-[#8201F2]/30 flex items-center gap-2 text-[11px] font-mono text-purple-200">
                          <TrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="truncate">{proj.results[0]}</span>
                        </div>
                      )}

                      {/* Tech Stack Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {proj.technologies.slice(0, 4).map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/5 text-[10px] font-mono text-gray-300"
                          >
                            {tech}
                          </span>
                        ))}
                        {proj.technologies.length > 4 && (
                          <span className="px-2 py-1 rounded-md bg-[#8201F2]/20 border border-[#8201F2]/30 text-[10px] font-mono text-purple-300 font-semibold">
                            +{proj.technologies.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Action Bar */}
                  <div className="px-6 py-3.5 bg-white/[0.02] border-t border-white/5 flex items-center justify-between text-xs font-mono text-purple-300 group-hover:text-white transition-colors">
                    <span className="font-semibold">Explore Engineering Case Study</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-[#8201F2]" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Empty Search State */
          <div className="py-16 text-center rounded-2xl bg-white/[0.02] border border-white/10 max-w-xl mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-[#8201F2]/20 border border-[#8201F2]/40 flex items-center justify-center text-[#8201F2] mx-auto mb-4">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No Projects Found</h3>
            <p className="text-xs sm:text-sm text-[#B8B8B8] max-w-sm mx-auto mb-6">
              No case studies match your search filter "{searchQuery}". Try searching for another technology or category.
            </p>
            <button
              onClick={() => {
                playClickSound(soundEnabled);
                setSearchQuery("");
                setActiveCategory("All");
              }}
              className="px-5 py-2.5 rounded-xl bg-[#8201F2] text-white font-mono text-xs font-bold shadow-[0_0_20px_#8201F2] inline-flex items-center gap-2 hover:scale-105 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

