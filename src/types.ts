export interface Project {
  id: string;
  title: string;
  category: "WordPress" | "Laravel" | "E-commerce" | "Business" | "AI" | "Dashboard" | "Custom Systems";
  description: string;
  longDescription?: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  problem?: string;
  solution?: string;
  results?: string[];
  featured?: boolean;
}

export interface Service {
  id: string;
  title: string;
  iconName: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface SkillCategory {
  title: string;
  description: string;
  icon: string;
  skills: { name: string; level: number; icon?: string }[];
}

export interface TimelineItem {
  year: string;
  title: string;
  role: string;
  company: string;
  description: string;
  tags: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  xpReward: number;
}

export interface PricingPackage {
  id: string;
  name: string;
  tagline: string;
  price: string;
  period?: string;
  popular?: boolean;
  features: string[];
  ctaText: string;
  recommendedFor: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  source?: "gemini" | "fallback";
}
