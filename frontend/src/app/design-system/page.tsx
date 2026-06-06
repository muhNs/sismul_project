"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Mascot } from "@/components/ui/Mascot";

import LoginPage from "@/features/pages/auth/LoginPage";
import HomePage from "@/features/pages/home/HomePage";
import ChooseChapterPage from "@/features/pages/materials/ChooseChapterPage";
import QuizPrepPage from "@/features/pages/quizzes/PrepPage";
import QuizArenaPage from "@/features/pages/quizzes/ArenaPage";
import QuizCompletePage from "@/features/pages/quizzes/CompletePage";
import VocabularyPage from "@/features/pages/vocabularies/VocabularyPage";
import ProfilePage from "@/features/pages/profile/ProfilePage";
import RegisterPage from "@/features/pages/auth/RegisterPage";

interface MockupConfig {
  name: string;
  image: string;
  component: React.ComponentType;
  description: string;
}

export default function DesignSystemPage() {
  const [activeTab, setActiveTab] = useState<"components" | "comparisons">("components");
  const [selectedMockup, setSelectedMockup] = useState<number>(0);
  const [comparisonMode, setComparisonMode] = useState<"react" | "mockup" | "side-by-side">("side-by-side");

  const mockups: MockupConfig[] = [
    {
      name: "Dashboard & Class Selection",
      image: "/mockups/home_choose_class.png",
      component: HomePage,
      description: "Class / Grade Selection page featuring 3D clay bento cards and weekly progress tracking.",
    },
    {
      name: "Login & Register",
      image: "/mockups/login_register.png",
      component: LoginPage,
      description: "Authentication portal containing input animations, Google OAuth, and mascot bubbles.",
    },
    {
      name: "Choose Chapter",
      image: "/mockups/choose_chapter.png",
      component: ChooseChapterPage,
      description: "Bento grid for chapters (Reading, Listening, Writing, Speaking, Vocabulary).",
    },
    {
      name: "Quiz Prep",
      image: "/mockups/quiz_preparation.png",
      component: QuizPrepPage,
      description: "Chapter start preparation screen containing quest timers, total questions, and start actions.",
    },
    {
      name: "Quiz Arena (Reading Mode)",
      image: "/mockups/quiz_arena_reading_mode.png",
      component: QuizArenaPage,
      description: "Active reading board containing quiz questions, highlight choices, and result banners.",
    },
    {
      name: "Quiz Completion & High Score",
      image: "/mockups/quiz_completion_high_score.png",
      component: QuizCompletePage,
      description: "Gamified reward dashboard featuring falling confetti particles, score cards, and play again triggers.",
    },
    {
      name: "Vocabulary Dictionary",
      image: "/mockups/vocabulary_dictionary.png",
      component: VocabularyPage,
      description: "Word bank tab containing audio synthesizers, search filtering, and categorized vocabulary cards.",
    },
    {
      name: "Profile & Report Card",
      image: "/mockups/profile_report_card.png",
      component: ProfilePage,
      description: "Student report card showing stars rating, progress bars, profile avatars, and configuration lists.",
    },
    {
      name: "Register Account (Dedicated)",
      image: "/mockups/register.png",
      component: RegisterPage,
      description: "Dedicated account sign-up page with glowing background blurs, password show/hide, and custom processing buttons.",
    },
  ];

  const SelectedComponent = mockups[selectedMockup].component;

  return (
    <div className="bg-[#faf9f9] text-[#1a1c1c] min-h-screen font-sans pb-16">
      {/* Top Header */}
      <header className="bg-white border-b-4 border-surface-container-highest flex justify-between items-center px-6 h-16 w-full sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-3xl font-black">dashboard</span>
          <span className="font-display font-black text-xl text-primary leading-tight">
            Learnly Developer Dashboard
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("components")}
            className={`px-4 py-2 font-label text-xs font-bold rounded-lg border-b-2 cursor-pointer transition-all ${
              activeTab === "components"
                ? "bg-primary-container text-white border-primary"
                : "bg-surface-container text-on-surface-variant border-surface-dim"
            }`}
          >
            Tactile Components
          </button>
          <button
            onClick={() => setActiveTab("comparisons")}
            className={`px-4 py-2 font-label text-xs font-bold rounded-lg border-b-2 cursor-pointer transition-all ${
              activeTab === "comparisons"
                ? "bg-primary-container text-white border-primary"
                : "bg-surface-container text-on-surface-variant border-surface-dim"
            }`}
          >
            UI/UX Comparisons
          </button>
        </div>
      </header>

      {activeTab === "components" ? (
        /* Components Showcase */
        <main className="max-w-5xl mx-auto px-6 py-8 space-y-12">
          {/* Section 1: Introduction */}
          <div>
            <h1 className="font-display text-3xl font-extrabold text-on-surface mb-2">
              Vibrant Scholar Design System
            </h1>
            <p className="text-on-surface-variant text-sm font-medium">
              Explore the extracted modern-tactile component sandboxes and visual tokens.
            </p>
          </div>

          {/* Section 2: Buttons */}
          <section className="space-y-6">
            <h2 className="font-display text-xl font-bold border-b-2 border-surface-container-highest pb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">smart_button</span>
              1. Tactile Buttons (Big Action)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <span className="text-xs font-bold text-on-surface-variant block uppercase">Primary (Vibrant Green)</span>
                <Button variant="primary">Mulai Belajar</Button>
              </div>
              <div className="space-y-2">
                <span className="text-xs font-bold text-on-surface-variant block uppercase">Secondary (Sky Blue)</span>
                <Button variant="secondary">Ayo Mulai!</Button>
              </div>
              <div className="space-y-2">
                <span className="text-xs font-bold text-on-surface-variant block uppercase">Tertiary (Orange Alert)</span>
                <Button variant="tertiary">Beli Item</Button>
              </div>
              <div className="space-y-2">
                <span className="text-xs font-bold text-on-surface-variant block uppercase">Outline (Neutral Gray)</span>
                <Button variant="outline">Kembali</Button>
              </div>
            </div>
          </section>

          {/* Section 3: Cards */}
          <section className="space-y-6">
            <h2 className="font-display text-xl font-bold border-b-2 border-surface-container-highest pb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">view_quilt</span>
              2. Bento Cards (Clay Borders)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Card variant="green" clickable={true} className="p-6 flex flex-col items-center">
                <span className="material-symbols-outlined text-3xl text-primary mb-2">rocket_launch</span>
                <span className="font-display font-bold">Kelas 3</span>
              </Card>
              <Card variant="blue" clickable={true} className="p-6 flex flex-col items-center">
                <span className="material-symbols-outlined text-3xl text-secondary mb-2">biotech</span>
                <span className="font-display font-bold">Kelas 4</span>
              </Card>
              <Card variant="orange" clickable={true} className="p-6 flex flex-col items-center">
                <span className="material-symbols-outlined text-3xl text-tertiary mb-2">explore</span>
                <span className="font-display font-bold">Kelas 5</span>
              </Card>
              <Card variant="surface" className="p-6 flex flex-col items-center">
                <span className="material-symbols-outlined text-3xl text-on-surface-variant mb-2">school</span>
                <span className="font-display font-bold">Neutral Card</span>
              </Card>
            </div>
          </section>

          {/* Section 4: Progress Bars */}
          <section className="space-y-6">
            <h2 className="font-display text-xl font-bold border-b-2 border-surface-container-highest pb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">rule</span>
              3. Gummy Progress Bars
            </h2>
            <div className="space-y-4 max-w-md">
              <div className="space-y-1">
                <span className="text-xs font-bold text-on-surface-variant">Primary Green (75% Complete)</span>
                <ProgressBar value={75} color="primary" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-on-surface-variant">Secondary Blue (40% Complete)</span>
                <ProgressBar value={40} color="secondary" />
              </div>
            </div>
          </section>

          {/* Section 5: Mascot */}
          <section className="space-y-6">
            <h2 className="font-display text-xl font-bold border-b-2 border-surface-container-highest pb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">face</span>
              4. Animated Mascot Expressions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card variant="surface" className="p-4 flex flex-col items-center justify-center bg-white h-72">
                <span className="text-xs font-bold text-on-surface-variant mb-4 uppercase">Standard Happy</span>
                <Mascot expression="happy" size="md" speechBubble="Halo!" />
              </Card>
              <Card variant="surface" className="p-4 flex flex-col items-center justify-center bg-white h-72">
                <span className="text-xs font-bold text-on-surface-variant mb-4 uppercase">Streaks & Cheer</span>
                <Mascot expression="cheer" size="md" />
              </Card>
              <Card variant="surface" className="p-4 flex flex-col items-center justify-center bg-white h-72">
                <span className="text-xs font-bold text-on-surface-variant mb-4 uppercase">Quiz Intro / Smart</span>
                <Mascot expression="smart" size="md" speechBubble="Kamu Pasti Bisa!" />
              </Card>
              <Card variant="surface" className="p-4 flex flex-col items-center justify-center bg-white h-72">
                <span className="text-xs font-bold text-on-surface-variant mb-4 uppercase">Graduation Owl</span>
                <Mascot expression="grad" size="md" />
              </Card>
            </div>
          </section>
        </main>
      ) : (
        /* Comparisons Page */
        <main className="max-w-7xl mx-auto px-6 py-8 flex gap-6">
          {/* Sidebar selector */}
          <div className="w-80 flex-shrink-0 space-y-4">
            <Card variant="surface" className="p-4 bg-white shadow-sm space-y-2">
              <h3 className="font-display font-bold text-sm text-on-surface-variant border-b border-surface-container pb-2">
                SELECT PAGE
              </h3>
              <div className="flex flex-col gap-1">
                {mockups.map((m, index) => (
                  <button
                    key={m.name}
                    onClick={() => setSelectedMockup(index)}
                    className={`text-left text-xs font-bold p-3.5 rounded-lg border-b-2 cursor-pointer transition-all ${
                      selectedMockup === index
                        ? "bg-primary-container text-white border-primary"
                        : "bg-surface-container text-on-surface-variant border-surface-dim hover:bg-surface-container-high"
                    }`}
                  >
                    {m.name}
                  </button>
                ))}
              </div>
            </Card>

            <Card variant="surface" className="p-4 bg-white shadow-sm space-y-2">
              <h3 className="font-display font-bold text-sm text-on-surface-variant border-b border-surface-container pb-2">
                DISPLAY MODE
              </h3>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setComparisonMode("side-by-side")}
                  className={`text-left text-xs font-bold p-2.5 rounded-lg border-b-2 cursor-pointer transition-all ${
                    comparisonMode === "side-by-side"
                      ? "bg-secondary text-white border-on-secondary-fixed-variant"
                      : "bg-surface-container text-on-surface-variant border-surface-dim"
                  }`}
                >
                  Side-By-Side View
                </button>
                <button
                  onClick={() => setComparisonMode("react")}
                  className={`text-left text-xs font-bold p-2.5 rounded-lg border-b-2 cursor-pointer transition-all ${
                    comparisonMode === "react"
                      ? "bg-secondary text-white border-on-secondary-fixed-variant"
                      : "bg-surface-container text-on-surface-variant border-surface-dim"
                  }`}
                >
                  Next.js React Sandbox
                </button>
                <button
                  onClick={() => setComparisonMode("mockup")}
                  className={`text-left text-xs font-bold p-2.5 rounded-lg border-b-2 cursor-pointer transition-all ${
                    comparisonMode === "mockup"
                      ? "bg-secondary text-white border-on-secondary-fixed-variant"
                      : "bg-surface-container text-on-surface-variant border-surface-dim"
                  }`}
                >
                  Original Design Mockup
                </button>
              </div>
            </Card>
          </div>

          {/* Sandbox & Image comparison canvas */}
          <div className="flex-grow space-y-6">
            <div>
              <h2 className="font-display text-2xl font-extrabold text-on-surface">
                {mockups[selectedMockup].name}
              </h2>
              <p className="text-on-surface-variant text-sm font-medium">
                {mockups[selectedMockup].description}
              </p>
            </div>

            {comparisonMode === "side-by-side" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                <div className="space-y-2">
                  <h4 className="font-label text-xs font-bold text-primary uppercase tracking-widest text-center border-b border-primary-container/20 pb-2">
                    Next.js React Screen
                  </h4>
                  <div className="relative border-4 border-dashed border-primary-container/30 rounded-2xl min-h-[700px] overflow-hidden bg-background">
                    <SelectedComponent />
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-label text-xs font-bold text-secondary uppercase tracking-widest text-center border-b border-secondary-container/20 pb-2">
                    Original UI Design Mockup
                  </h4>
                  <div className="border-4 border-dashed border-secondary-container/30 rounded-2xl overflow-hidden bg-black flex items-center justify-center min-h-[700px]">
                    <img
                      src={mockups[selectedMockup].image}
                      alt="Design screenshot"
                      className="max-w-full h-auto object-contain max-h-[85vh]"
                    />
                  </div>
                </div>
              </div>
            )}

            {comparisonMode === "react" && (
              <div className="relative border-4 border-dashed border-primary-container/30 rounded-2xl min-h-[800px] bg-background">
                <SelectedComponent />
              </div>
            )}

            {comparisonMode === "mockup" && (
              <div className="border-4 border-dashed border-secondary-container/30 rounded-2xl overflow-hidden bg-black flex items-center justify-center min-h-[800px]">
                <img
                  src={mockups[selectedMockup].image}
                  alt="Design screenshot"
                  className="max-w-full h-auto object-contain max-h-[90vh]"
                />
              </div>
            )}
          </div>
        </main>
      )}
    </div>
  );
}
