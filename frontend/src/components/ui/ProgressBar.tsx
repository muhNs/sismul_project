"use client";

import React, { useEffect, useState } from "react";

interface ProgressBarProps {
  value: number; // 0 to 100
  color?: "primary" | "secondary";
  className?: string;
  animateOnInit?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  color = "primary",
  className = "",
  animateOnInit = true,
}) => {
  const [currentValue, setCurrentValue] = useState(animateOnInit ? 0 : value);

  useEffect(() => {
    if (animateOnInit) {
      const timer = setTimeout(() => {
        setCurrentValue(value);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setCurrentValue(value);
    }
  }, [value, animateOnInit]);

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
        style={{ width: `${currentValue}%` }}
      />
    </div>
  );
};
