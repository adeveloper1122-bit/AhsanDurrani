import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Project } from "../types";
import { X, ExternalLink, CheckCircle, ShieldAlert, Sparkles, Layers } from "lucide-react";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-4xl rounded-3xl bg-gradient-to-b from-gray-900 via-black to-black border border-white/10 shadow-[0_25px_70px_rgba(130,1,242,0.4)] overflow-hidden my-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-black/80 border border-white/20 text-white hover:bg-[#8201F2] transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Banner Image */}
          <div className="relative h-64 sm:h-80 w-full overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="px-3 py-1 rounded-full bg-[#8201F2] text-white font-mono text-xs font-bold uppercase tracking-wider mb-2 inline-block">
                {project.category}
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
                {project.title}
              </h2>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-10 space-y-8">
            {/* Overview */}
            <div>
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Layers className="w-5 h-5 text-purple-400" />
                <span>Project Overview</span>
              </h3>
              <p className="text-sm sm:text-base text-[#B8B8B8] leading-relaxed">
                {project.longDescription || project.description}
              </p>
            </div>

            {/* Problem & Solution Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.problem && (
                <div className="p-5 rounded-2xl bg-red-950/20 border border-red-500/30">
                  <h4 className="text-sm font-mono font-bold text-red-400 mb-2 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4" />
                    <span>The Challenge</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    {project.problem}
                  </p>
                </div>
              )}

              {project.solution && (
                <div className="p-5 rounded-2xl bg-purple-950/20 border border-[#8201F2]/40">
                  <h4 className="text-sm font-mono font-bold text-purple-300 mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span>Engineering Solution</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              )}
            </div>

            {/* Key Results */}
            {project.results && project.results.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-white mb-3">Key Results & Metrics</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {project.results.map((res, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white font-medium flex items-start gap-2.5"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{res}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack */}
            <div>
              <h3 className="text-sm font-mono text-[#B8B8B8] uppercase tracking-wider mb-3">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-[#8201F2]/10 border border-[#8201F2]/30 text-xs font-mono text-purple-200 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-white/10 flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold hover:bg-white/10 transition-all cursor-pointer"
              >
                Close Modal
              </button>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-2.5 rounded-xl bg-[#8201F2] hover:bg-purple-600 text-white text-xs font-bold transition-all shadow-[0_0_20px_#8201F2] flex items-center gap-2 cursor-pointer"
                >
                  <span>Launch Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
