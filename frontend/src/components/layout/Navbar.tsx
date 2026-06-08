"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Learn",
      icon: "school",
      href: "/",
      activeIconFill: true,
    },
    {
      label: "Leaderboard",
      icon: "emoji_events",
      href: "/leaderboard",
      activeIconFill: false,
    },
    {
      label: "Shop",
      icon: "shopping_bag",
      href: "/shop",
      activeIconFill: false,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full h-20 flex justify-around items-center px-4 pb-safe bg-surface-container-lowest border-t-4 border-surface-container-highest z-50">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        
        return (
          <Link
            key={item.label}
            href={item.href}
            className={`flex flex-col items-center justify-center rounded-xl px-4 py-1.5 active:scale-95 transition-transform duration-100 cursor-pointer ${
              isActive
                ? "text-primary bg-primary-container/20 font-label"
                : "text-on-surface-variant hover:text-primary transition-colors font-label"
            }`}
          >
            <span
              className="material-symbols-outlined"
              style={{
                fontVariationSettings: isActive && item.activeIconFill ? "'FILL' 1" : "'FILL' 0",
              }}
            >
              {item.icon}
            </span>
            <span className="text-xs font-bold mt-0.5">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
