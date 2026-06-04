"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { WordItem } from "../constants/words";

interface WordCardProps {
  word: WordItem;
  playingWord: string | null;
  onPlay: (word: string) => void;
}

export function WordCard({ word, playingWord, onPlay }: WordCardProps) {
  return (
    <Card
      variant="surface"
      className={`p-4 flex gap-4 items-center bg-white shadow-[0_4px_0_#e3e2e2] ${
        word.highlighted ? "ring-2 ring-primary-container ring-offset-2" : ""
      }`}
    >
      <div className="w-20 h-20 bg-surface-container rounded-xl overflow-hidden flex-shrink-0">
        <img alt={word.english} className="w-full h-full object-cover" src={word.image} />
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-display text-lg font-bold text-primary">{word.english}</p>
            <p className="text-on-surface-variant text-sm font-sans font-medium">{word.indonesian}</p>
          </div>
          <button
            onClick={() => onPlay(word.english)}
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
  );
}
