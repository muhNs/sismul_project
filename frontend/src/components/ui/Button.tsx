"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "outline";
  gummy?: boolean;
  size?: "sm" | "md" | "lg";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  gummy = true,
  size = "md",
  className = "",
  ...props
}) => {
  const baseStyle =
    "rounded-xl font-label uppercase tracking-wider relative transition-all duration-75 active:translate-y-1 outline-none select-none flex items-center justify-center gap-2 cursor-pointer";

  const sizeStyles = {
    sm: "py-2 px-3 text-xs w-auto",
    md: "py-4 px-6 text-sm w-full",
    lg: "py-5 px-8 text-base w-full",
  };

  const variantStyles = {
    primary:
      "bg-primary-container text-white border-2 border-primary-container shadow-[0_4px_0_#1e5000] active:shadow-[0_0px_0_#1e5000]",
    secondary:
      "bg-secondary-container text-white border-2 border-secondary-container shadow-[0_4px_0_#004666] active:shadow-[0_0px_0_#004666]",
    tertiary:
      "bg-tertiary-container text-white border-2 border-tertiary-container shadow-[0_4px_0_#6a3b00] active:shadow-[0_0px_0_#6a3b00]",
    outline:
      "bg-white text-on-surface-variant border-2 border-surface-container-highest shadow-[0_4px_0_#e3e2e2] active:shadow-[0_0px_0_#e3e2e2] hover:bg-surface-container-low",
  };

  const gummyStyle = gummy ? "gummy-shine" : "";

  return (
    <button
      className={`${baseStyle} ${sizeStyles[size]} ${variantStyles[variant]} ${gummyStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
