"use client";

import React from "react";

interface ProgressBarProps {
  value: number; // 0 to 100
  color?: "primary" | "secondary";
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  color = "primary",
  className = "",
}) => {
  const colorClasses = {
    primary: "bg-primary-container",
    secondary: "bg-secondary-container",
  };

  return (
    <div
      className={`w-full bg-surface-container-highest h-4 rounded-full overflow-hidden relative shine-effect ${className}`}
    >
      <div
        className={`h-full ${colorClasses[color]} rounded-full transition-all duration-1000 ease-out`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
};
