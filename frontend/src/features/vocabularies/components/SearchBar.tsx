"use client";

import React from "react";

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative group">
      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-secondary">
        search
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search words..."
        className="w-full pl-12 pr-4 py-4 bg-surface-container-low border-2 border-surface-container-highest rounded-2xl focus:outline-none focus:border-secondary focus:border-4 transition-all font-sans text-sm font-medium"
      />
    </div>
  );
}
