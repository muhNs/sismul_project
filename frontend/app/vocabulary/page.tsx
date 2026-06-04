"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Navbar } from "@/components/layout/Navbar";
import { Card } from "@/components/ui/Card";

interface WordItem {
  english: string;
  indonesian: string;
  image: string;
  category: "animals" | "food";
  highlighted?: boolean;
}

export default function VocabularyPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [playingWord, setPlayingWord] = useState<string | null>(null);

  const words: WordItem[] = [
    {
      english: "Elephant",
      indonesian: "Gajah",
      category: "animals",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCsTPplKGIf2hnVGrNj2FVlkLihn8QBPXzCrBXuecBRMKaxUEBRpMlvkNxdJ8zwD94trDWj3OtRMaBL5v3F7oCmDwL3-OOJl2QAOVvgeU9RvPy7Q_6Eh38-eKB_GeahmNkMlh3c1s_pkP8uzYzZ0cx_6JrC4HEGTbzZ_93_3WyRjgmv4UL_7cFGSdie6SHr2vy4ESjFSH9n34CAahK9bPI5GmwFttnfkHm2uQ5d5cYWd9eiKhFF6fXrEqZbzdhH7bSgoY8br1hM6JE",
    },
    {
      english: "Tiger",
      indonesian: "Harimau",
      category: "animals",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDazu3A7g6hpjkSJhzKdJCKCnqoiij8lvdGZWh3pDxDFKkmSfHL-kKKK0To9lbqRQ2LxMy5OjdIf2nx6mN0CCjVbHClXJj1F4JQojTu7xPsImGp4_inZ1M4d_RGwh6gw9ZGDTR30E0yQjmsyO8Afni0jynPFBDOy6thtEX8dWyvBRsoT8N1EgaoVPrKUENVBWQFZlvnmNbtJLBQ9s3HfMT7yu6itQQOTLBldE-Fb8iz2ObZWIOwdm5Xaaz84iCrNe8OrFJkW4u2c9E",
    },
    {
      english: "Owl",
      indonesian: "Burung Hantu",
      category: "animals",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDh3-lf8GXwOkuSuxJMBlgqnpaDsYsC0QydfEf96VmHga6MgHQ_DcZWia5hOno-6_4h0wJrS1vQWQj9vzzcOaUFGmIZ5_Xf9-st9wYA9qzg7FVWvlnxqqK76tyPxAN2gY2rTT85U6I9Jj01ImDSN6stHLrCAFdyKOy16Y9Uoz6RJOlT9c7AH0hk24fRYrUZ_WdBDhrdQ4HXxzihc225NbfE4E7Lfc7w5VDwMhRYD3exoS1BU0BqBrV9o1FR9brWyKxx77abFYdFAiQ",
      highlighted: true,
    },
    {
      english: "Rabbit",
      indonesian: "Kelinci",
      category: "animals",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA78ceBrgBLCuF1DszwV1Gk3EPHtOCbEemn3Dg7NRfq1oB3wrL3aI03goKfkRUS_mg160USm2bsDyyhxnxdVFhbykbx4WJx7JztEjRKLxCt1Nkzdsam0emiQV6flNLlfiwcLGJ3VVqNLDyxerppj3Yi1ucsAcebNaaxKj71TI37d306AmNxdrbWR1vDLDa1uwmNa9Q_sG_rdlF984xRSgivAz14OF07B-70FG-u1H4Q03ZNIKcvacJQrEsJmEd0FdH6mt6ZaDqvnJw",
    },
    {
      english: "Apple",
      indonesian: "Apel",
      category: "food",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDWik5nXVvd4r3SlZKQy4ByjJYCZsLw9NCeXpbkgKGovI0_Vci_bXvjjtSz5ab8LSB6NtP1cl4ureFkjoDgO9QKeGvutycvXY-baQ5wv3aX4MCorEJ5zDO9F58DHCfKmn8ZZGgb2wRYE97fQxJagYiw8hYPFkkNP9uHvZXyaXuWJ6hTxqEtwEIjE-N9mCZk2u0zekpEq3jkkdjBx2-5KBsMuUK2tlE7lifrZDoCPCC-exStlULOctqzE0BKl2JwyydrW6RsTl5rQp4",
    },
    {
      english: "Bread",
      indonesian: "Roti",
      category: "food",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC5HqHAaZNLTfclUGp_6vJlXmDj3Hwmwghc28-nmrv36aY2Bmj1BjlGLdtDdwgFwwRt7HA1kN1XvrGYUo0Ygxgptks2SfrwpnklUUbm-WWn3Sn9O6SHThupJX6mFO24_TBus8vR8ZAXBt7qihTzFTOOWE_mNuYlHcXjiL0O6HS8T2adc8Azg2OUj78T9dfnZ6at0gZaJf2chbuWHKX-J3egeLIhO-uHTk1DYTchfpz7qhYacowZQZ8PEBjlrcXcQHPf19upEByhXL8",
    },
  ];

  const handlePlayAudio = (word: string) => {
    setPlayingWord(word);
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    }
    setTimeout(() => {
      setPlayingWord(null);
    }, 500);
  };

  const filteredWords = words.filter(
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
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-secondary">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search words..."
              className="w-full pl-12 pr-4 py-4 bg-surface-container-low border-2 border-surface-container-highest rounded-2xl focus:outline-none focus:border-secondary focus:border-4 transition-all font-sans text-sm font-medium"
            />
          </div>
        </div>

        {/* Animals section */}
        {animalWords.length > 0 && (
          <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">pets</span>
                Animals
              </h2>
              <span className="bg-primary-container/20 text-primary px-3 py-1 rounded-full font-label text-xs font-bold">
                {animalWords.length} Words
              </span>
            </div>
            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {animalWords.map((word) => (
                <Card
                  key={word.english}
                  variant="surface"
                  className={`p-4 flex gap-4 items-center bg-white shadow-[0_4px_0_#e3e2e2] ${
                    word.highlighted ? "ring-2 ring-primary-container ring-offset-2" : ""
                  }`}
                >
                  <div className="w-20 h-20 bg-surface-container rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      alt={word.english}
                      className="w-full h-full object-cover"
                      src={word.image}
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-display text-lg font-bold text-primary">{word.english}</p>
                        <p className="text-on-surface-variant text-sm font-sans font-medium">
                          {word.indonesian}
                        </p>
                      </div>
                      <button
                        onClick={() => handlePlayAudio(word.english)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                          playingWord === word.english
                            ? "bg-primary-container text-white scale-110 shadow-md"
                            : "bg-secondary-container/20 text-secondary hover:bg-secondary-container/40"
                        }`}
                      >
                        <span className="material-symbols-outlined">volume_up</span>
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Food section */}
        {foodWords.length > 0 && (
          <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary">restaurant</span>
                Food &amp; Drinks
              </h2>
              <span className="bg-tertiary-container/20 text-tertiary px-3 py-1 rounded-full font-label text-xs font-bold">
                {foodWords.length} Words
              </span>
            </div>
            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {foodWords.map((word) => (
                <Card
                  key={word.english}
                  variant="surface"
                  className="p-4 flex gap-4 items-center bg-white shadow-[0_4px_0_#e3e2e2]"
                >
                  <div className="w-20 h-20 bg-surface-container rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      alt={word.english}
                      className="w-full h-full object-cover"
                      src={word.image}
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-display text-lg font-bold text-primary">{word.english}</p>
                        <p className="text-on-surface-variant text-sm font-sans font-medium">
                          {word.indonesian}
                        </p>
                      </div>
                      <button
                        onClick={() => handlePlayAudio(word.english)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                          playingWord === word.english
                            ? "bg-primary-container text-white scale-110 shadow-md"
                            : "bg-secondary-container/20 text-secondary hover:bg-secondary-container/40"
                        }`}
                      >
                        <span className="material-symbols-outlined">volume_up</span>
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* FAB for Review Quiz */}
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
