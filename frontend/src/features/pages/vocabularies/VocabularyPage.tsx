"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Navbar } from "@/components/layout/Navbar";
import { SearchBar } from "@/features/vocabularies/components/SearchBar";
import { WordSection } from "@/features/vocabularies/components/WordSection";
import { getVocabularies, Vocabulary } from "@/features/vocabularies/api/vocabularies";

export default function VocabularyPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [playingWord, setPlayingWord] = useState<string | null>(null);
  const [vocabularies, setVocabularies] = useState<Vocabulary[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVocabs = async () => {
      try {
        setIsLoading(true);
        const data = await getVocabularies();
        setVocabularies(data);
      } catch (err) {
        console.error("Gagal memuat kosakata:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVocabs();
  }, []);

  const handlePlayAudio = (word: string, voicePath?: string | null) => {
    setPlayingWord(word);
    if (voicePath) {
      const audioUrl = voicePath.startsWith("http") ? voicePath : `http://localhost:5000${voicePath}`;
      const audio = new Audio(audioUrl);
      audio.play().catch((err) => {
        console.error("Gagal memutar audio dari server:", err);
        fallbackTTS(word);
      });
    } else {
      fallbackTTS(word);
    }
    setTimeout(() => setPlayingWord(null), 500);
  };

  const fallbackTTS = (word: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    }
  };

  const getCategory = (english: string) => {
    const eng = english.toLowerCase();
    const animalNames = ["elephant", "tiger", "owl", "rabbit", "cat", "dog", "bird", "fish", "duck", "monkey", "lion", "giraffe", "gajah", "harimau", "burung hantu", "kelinci", "kucing", "anjing", "burung", "ikan", "bebek", "monyet", "singa", "jerapah"];
    const foodNames = ["apple", "bread", "banana", "orange", "watermelon", "grape", "noodle", "fried chicken", "fried rice", "milk", "tea", "juice", "ice cream", "apel", "roti", "pisang", "jeruk", "semangka", "anggur", "mie", "ayam goreng", "nasi goreng", "susu", "teh", "jus", "es krim"];
    
    if (animalNames.some(name => eng.includes(name))) return "animals";
    if (foodNames.some(name => eng.includes(name))) return "food";
    return "general";
  };

  const mappedWords = useMemo(() => {
    return vocabularies.map((v) => ({
      english: v.english,
      indonesian: v.indonesian,
      image: v.image_path ? `http://localhost:5000${v.image_path}` : `https://api.dicebear.com/7.x/identicon/svg?seed=${v.english}`,
      voicePath: v.voice_path,
      category: getCategory(v.english),
    }));
  }, [vocabularies]);

  const filteredWords = useMemo(() => {
    return mappedWords.filter(
      (w) =>
        w.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.indonesian.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [mappedWords, searchQuery]);

  const animalWords = useMemo(() => filteredWords.filter((w) => w.category === "animals"), [filteredWords]);
  const foodWords = useMemo(() => filteredWords.filter((w) => w.category === "food"), [filteredWords]);
  const generalWords = useMemo(() => filteredWords.filter((w) => w.category === "general"), [filteredWords]);

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

        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {!isLoading && filteredWords.length === 0 && (
          <div className="text-center py-12 text-on-surface-variant font-medium">
            Tidak ada kosakata yang ditemukan.
          </div>
        )}

        {!isLoading && animalWords.length > 0 && (
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

        {!isLoading && foodWords.length > 0 && (
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

        {!isLoading && generalWords.length > 0 && (
          <WordSection
            title="General Words"
            icon="menu_book"
            iconColor="text-secondary"
            badgeColor="bg-secondary-container/20 text-secondary"
            words={generalWords}
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
