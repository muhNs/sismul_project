"use client";

import React from "react";

interface MascotProps {
  expression?: "happy" | "cheer" | "smart" | "grad";
  speechBubble?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export const Mascot: React.FC<MascotProps> = ({
  expression = "happy",
  speechBubble,
  size = "md",
  className = "",
}) => {
  // URLs from the original UIUX mockups
  const expressionUrls = {
    happy:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD30A-CsMsJs5ASw4s-5QvvbymzzCbEYiOiRSv7F7ld-5CJwG-aWRBc_qa00bQIAYzKTVviNfSZuHh6ZpUeE9reGsLtyegJ_2RdQx55ju00q3f687k5KYvbZffp8QlaE-qMC-mlSW8gtjxO60sDOZxcFoDZxKUEqMZCu78StSUomSo3WCCSDIooby2XUNk4dB_DD7KFiDW-5JesbUV2oBg8D35PQATItzMnR3hLCpfK1xt9XzRgSeSY_CX20_qe-FHCUjO9F28hhTA",
    cheer:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB_WzXxdPOQ-IMSY_T_mEEQMmOa5ze10_v7SlHhbJJCwrhkUmI24TfSjNNPXuQiZGIHINBWiDjgkOOuBd5X9yo97ujRjojcYcsYMopHTjbBeRZN0NLGcE8WqllRIZkjXNfimfRJSUGNn8MTddjnLjjWf76Km2jeBY8n_F3WF_C_h4YSOrl9YQcltQerhI66S54WWgClkwocGsRqQuo3_NNFtmTKOM-hqkn_LzgJgk81IIXpJwWhNX4B1anVlmP9nNrokYQVccqSxqQ",
    smart:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD6fXSv1D7rTkzTA1xnm-JKzpCG4n1-fNisZoVrYGEiwWj0LD-okV2Ka1MyoxiGIwb24cnHjSiSYFXJ8kgoxE9CIxwJtHBZA9dgC4IVOGjAEX5Jkb1mU_ATRzcbGQfmORbRV4InopKjRqReBC30QVEXTpAUJok7B4BVKwmyE-BbaP_Qc9qHphQ8xoxFKU4seodLYKQL7XkwOqJn-mULY7NO6Wceu6oKeV2iSngDhLuNN4mx3iGhust6FB5T218AsjjosfvsWE4jSbs",
    grad: "/owl-grad.png",
  };

  const sizeClasses = {
    sm: "w-24 h-24",
    md: "w-36 h-36",
    lg: "w-48 h-48",
    xl: "w-64 h-64",
  };

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      {/* Speech Bubble */}
      {speechBubble && (
        <div className="absolute -top-12 bg-tertiary-container text-on-tertiary font-label text-xs px-4 py-2 rounded-full tactile-card flex items-center gap-1 select-none z-10 whitespace-nowrap animate-bounce">
          <span className="material-symbols-outlined text-[16px]">star</span>
          <span>{speechBubble}</span>
        </div>
      )}

      {/* Floating Mascot Character */}
      <div className={`relative ${sizeClasses[size]} select-none`}>
        <img
          alt={`Learnly Mascot ${expression}`}
          className="w-full h-full object-contain"
          src={expressionUrls[expression]}
        />
      </div>
    </div>
  );
};
