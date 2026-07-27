import { create } from "zustand";
import { Achievement, Project } from "../types";
import { playAchievementSound } from "../utils/audio";
import confetti from "canvas-confetti";

interface AppState {
  soundEnabled: boolean;
  toggleSound: () => void;
  cyberMode: boolean;
  setCyberMode: (val: boolean) => void;
  toggleCyberMode: () => void;
  xp: number;
  addXP: (amount: number, reason?: string) => void;
  achievements: Achievement[];
  unlockAchievement: (id: string) => void;
  recentToast: { title: string; desc: string; xp: number } | null;
  clearRecentToast: () => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  
  // Modals
  isChatbotOpen: boolean;
  setIsChatbotOpen: (open: boolean) => void;
  isCalculatorOpen: boolean;
  setIsCalculatorOpen: (open: boolean) => void;
  isTerminalOpen: boolean;
  setIsTerminalOpen: (open: boolean) => void;
  isResumeOpen: boolean;
  setIsResumeOpen: (open: boolean) => void;
  selectedProjectForModal: Project | null;
  setSelectedProjectForModal: (proj: Project | null) => void;
  activeGameModal: "bugHunter" | "codeRunner" | null;
  setActiveGameModal: (game: "bugHunter" | "codeRunner" | null) => void;
}

const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: "explorer",
    title: "Digital Explorer",
    description: "Visited all primary sections of Ahsan's portfolio.",
    icon: "Compass",
    unlocked: false,
    xpReward: 50,
  },
  {
    id: "ai_friend",
    title: "AI Innovator",
    description: "Engaged in conversation with Ahsan AI assistant.",
    icon: "Bot",
    unlocked: false,
    xpReward: 75,
  },
  {
    id: "bug_hunter",
    title: "Master Bug Hunter",
    description: "Cleared all security threats in the Bug Hunter game.",
    icon: "ShieldAlert",
    unlocked: false,
    xpReward: 150,
  },
  {
    id: "client_ready",
    title: "Project Strategist",
    description: "Generated an AI Project Consultation or requested a quote.",
    icon: "Briefcase",
    unlocked: false,
    xpReward: 100,
  },
  {
    id: "cyber_hacker",
    title: "Cyberpunk Hacker",
    description: "Unlocked the secret Developer Terminal or Cyber Overdrive mode.",
    icon: "Terminal",
    unlocked: false,
    xpReward: 100,
  },
];

export const useAppStore = create<AppState>((set, get) => ({
  soundEnabled: true,
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
  cyberMode: false,
  setCyberMode: (val) => set({ cyberMode: val }),
  toggleCyberMode: () => {
    const next = !get().cyberMode;
    set({ cyberMode: next });
    if (next) {
      get().unlockAchievement("cyber_hacker");
    }
  },
  xp: 0,
  addXP: (amount, reason) => {
    set((state) => ({ xp: state.xp + amount }));
  },
  achievements: INITIAL_ACHIEVEMENTS,
  unlockAchievement: (id) => {
    const { achievements, soundEnabled } = get();
    const target = achievements.find((a) => a.id === id);
    if (target && !target.unlocked) {
      const updated = achievements.map((a) =>
        a.id === id ? { ...a, unlocked: true, unlockedAt: new Date().toLocaleTimeString() } : a
      );
      playAchievementSound(soundEnabled);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.8 },
          colors: ["#8201F2", "#ffffff", "#b8b8b8"],
        });
      } catch (e) {
        // Ignore confetti error
      }
      set({
        achievements: updated,
        xp: get().xp + target.xpReward,
        recentToast: { title: target.title, desc: target.description, xp: target.xpReward },
      });
    }
  },
  recentToast: null,
  clearRecentToast: () => set({ recentToast: null }),
  activeSection: "home",
  setActiveSection: (sec) => set({ activeSection: sec }),
  isLoading: true,
  setIsLoading: (loading) => set({ isLoading: loading }),

  isChatbotOpen: false,
  setIsChatbotOpen: (open) => {
    if (open) get().unlockAchievement("ai_friend");
    set({ isChatbotOpen: open });
  },
  isCalculatorOpen: false,
  setIsCalculatorOpen: (open) => {
    if (open) get().unlockAchievement("client_ready");
    set({ isCalculatorOpen: open });
  },
  isTerminalOpen: false,
  setIsTerminalOpen: (open) => {
    if (open) get().unlockAchievement("cyber_hacker");
    set({ isTerminalOpen: open });
  },
  isResumeOpen: false,
  setIsResumeOpen: (open) => set({ isResumeOpen: open }),
  selectedProjectForModal: null,
  setSelectedProjectForModal: (proj) => set({ selectedProjectForModal: proj }),
  activeGameModal: null,
  setActiveGameModal: (game) => set({ activeGameModal: game }),
}));
