import React from "react";
import { LoadingScreen } from "./components/LoadingScreen";
import { CustomCursor } from "./components/CustomCursor";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Expertise } from "./components/Expertise";
import { Services } from "./components/Services";
import { TechStack } from "./components/TechStack";
import { Portfolio } from "./components/Portfolio";
import { ProjectModal } from "./components/ProjectModal";
import { Pricing } from "./components/Pricing";
import { VirtualOffice } from "./components/VirtualOffice";
import { FAQ } from "./components/FAQ";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { AIChatbot } from "./components/AIChatbot";
import { AICostCalculator } from "./components/AICostCalculator";
import { AIAvatar } from "./components/AIAvatar";
import { HackerTerminal } from "./components/HackerTerminal";
import { ResumeModal } from "./components/ResumeModal";
import { BugHunter } from "./components/Games/BugHunter";
import { CodeRunner } from "./components/Games/CodeRunner";
import { AchievementToast } from "./components/AchievementToast";
import { useAppStore } from "./store/useAppStore";

export default function App() {
  const { isLoading, selectedProjectForModal, setSelectedProjectForModal } = useAppStore();

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#8201F2] selection:text-white font-sans antialiased overflow-x-hidden">
      {/* Loading Screen */}
      <LoadingScreen />

      {!isLoading && (
        <>
          {/* Custom Cursor */}
          <CustomCursor />

          {/* Floating Navigation Bar */}
          <Navbar />

          {/* Main Content Sections */}
          <main>
            <Hero />
            <About />
            <Experience />
            <Expertise />
            <Services />
            <TechStack />
            <Portfolio />
            <Pricing />
            <VirtualOffice />
            <FAQ />
            <Contact />
          </main>

          {/* Footer */}
          <Footer />

          {/* Overlays & Interactive Modals */}
          <AIChatbot />
          <AICostCalculator />
          <AIAvatar />
          <HackerTerminal />
          <ResumeModal />

          {/* Mini Games */}
          <BugHunter />
          <CodeRunner />

          {/* Achievement Toast Notification */}
          <AchievementToast />

          {/* Project Details Modal */}
          <ProjectModal
            project={selectedProjectForModal}
            onClose={() => setSelectedProjectForModal(null)}
          />
        </>
      )}
    </div>
  );
}
