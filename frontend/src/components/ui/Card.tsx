"use client";

import React from "react";

interface CardProps {
  children: React.ReactNode;
  variant?: "green" | "blue" | "orange" | "surface";
  clickable?: boolean;
  onClick?: () => void;
  className?: string;
  href?: string;
  as?: "div" | "button" | "a";
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = "surface",
  clickable = false,
  onClick,
  className = "",
  href,
  as = "div",
}) => {
  const Component = as === "a" && href ? "a" : clickable ? "button" : "div";

  const baseStyle = "bg-white rounded-xl border-2 border-surface-container-highest transition-all relative overflow-hidden text-left";

  const variantStyles = {
    green: "clay-border-green shadow-[0_4px_0_#1e5000] active:shadow-[0_0px_0_#1e5000] hover:bg-primary-container/5",
    blue: "clay-border-blue shadow-[0_4px_0_#004666] active:shadow-[0_0px_0_#004666] hover:bg-secondary-container/5",
    orange: "clay-border-orange shadow-[0_4px_0_#6a3b00] active:shadow-[0_0px_0_#6a3b00] hover:bg-tertiary-container/5",
    surface: "clay-border-surface shadow-[0_4px_0_#dadada] active:shadow-[0_0px_0_#dadada]",
  };

  const clickableStyle = clickable
    ? "cursor-pointer active:translate-y-1 select-none"
    : "";

  const extraProps = clickable && Component === "button" ? { type: "button" as const } : {};

  return (
    <Component
      onClick={onClick}
      href={href}
      className={`${baseStyle} ${variantStyles[variant]} ${clickableStyle} ${className}`}
      {...extraProps}
    >
      {children}
    </Component>
  );
};
