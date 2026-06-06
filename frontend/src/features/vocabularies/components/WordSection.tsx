"use client";

import React from "react";
import { WordCard } from "./WordCard";
import { WordItem } from "../constants/words";

interface WordSectionProps {
  title: string;
  icon: string;
  iconColor: string;
  badgeColor: string;
  words: WordItem[];
  playingWord: string | null;
  onPlay: (word: string) => void;
}

export function WordSection({
  title, icon, iconColor, badgeColor, words, playingWord, onPlay,
}: WordSectionProps) {
  return (
    <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-lg font-bold flex items-center gap-2">
          <span className={`material-symbols-outlined ${iconColor}`}>{icon}</span>
          {title}
        </h2>
        <span className={`${badgeColor} px-3 py-1 rounded-full font-label text-xs font-bold`}>
          {words.length} Words
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {words.map((word) => (
          <WordCard key={word.english} word={word} playingWord={playingWord} onPlay={onPlay} />
        ))}
      </div>
    </div>
  );
}
