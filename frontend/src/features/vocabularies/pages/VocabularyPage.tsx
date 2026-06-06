"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Navbar } from "@/components/layout/Navbar";
import { SearchBar } from "../components/SearchBar";
import { WordSection } from "../components/WordSection";
import { wordsData } from "../constants/words";

export default function VocabularyPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [playingWord, setPlayingWord] = useState<string | null>(null);

  const handlePlayAudio = (word: string) => {
    setPlayingWord(word);
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    }
    setTimeout(() => setPlayingWord(null), 500);
  };

  const filteredWords = wordsData.filter(
    (w) =>
      w.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.indonesian.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const animalWords = filteredWords.filter((w) => w.category === "animals");
  const foodWords = filteredWords.filter((w) => w.category === "food");

  return (
    <>
      <Header title="Learnly" showBack={true} />
      <main className="pt-24 pb-32 max-w-[800px] mx-auto px-margin-mobile w-full flex-grow">
        {/* Header & Search */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-extrabold mb-2 text-on-surface">Word Bank</h1>
          <p className="text-on-surface-variant font-sans text-sm font-medium mb-6">
            Explore and practice new vocabulary!
          </p>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        {animalWords.length > 0 && (
          <WordSection
            title="Animals"
            icon="pets"
            iconColor="text-primary"
            badgeColor="bg-primary-container/20 text-primary"
            words={animalWords}
            playingWord={playingWord}
            onPlay={handlePlayAudio}
          />
        )}

        {foodWords.length > 0 && (
          <WordSection
            title="Food & Drinks"
            icon="restaurant"
            iconColor="text-tertiary"
            badgeColor="bg-tertiary-container/20 text-tertiary"
            words={foodWords}
            playingWord={playingWord}
            onPlay={handlePlayAudio}
          />
        )}
      </main>

      {/* FAB */}
      <button
        onClick={() => router.push("/quiz/prep")}
        className="fixed bottom-24 right-margin-mobile w-14 h-14 bg-primary-container text-white rounded-full flex items-center justify-center z-40 group cursor-pointer shadow-[0_4px_0_#1e5000] active:translate-y-1 active:shadow-[0_0px_0_#1e5000] transition-all"
      >
        <span className="material-symbols-outlined text-3xl">psychology</span>
        <span className="absolute right-full mr-4 bg-on-surface text-surface py-2 px-4 rounded-xl font-label text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Test My Vocabulary!
        </span>
      </button>

      <Navbar />
    </>
  );
}
