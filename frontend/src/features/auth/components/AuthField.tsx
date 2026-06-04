"use client";

import React from "react";

interface AuthFieldProps {
  id: string;
  label: string;
  icon: string;
  type: string;
  placeholder: string;
  focused: boolean;
  onFocus: () => void;
  onBlur: () => void;
}

export function AuthField({
  id,
  label,
  icon,
  type,
  placeholder,
  focused,
  onFocus,
  onBlur,
}: AuthFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        style={{
          display: "block",
          fontSize: 13,
          fontWeight: 700,
          color: "#1a1c1c",
          marginBottom: 6,
          marginLeft: 4,
        }}
      >
        {label}
      </label>
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          transition: "transform 0.2s",
          transform: focused ? "scale(1.01)" : "scale(1)",
        }}
      >
        <span
          className="material-symbols-outlined"
          style={{
            position: "absolute",
            left: 14,
            top: "50%",
            transform: "translateY(-50%)",
            color: "#6f7b64",
            fontSize: 20,
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          {icon}
        </span>
        <input
          id={id}
          name={id}
          type={type}
          required
          placeholder={placeholder}
          onFocus={onFocus}
          onBlur={onBlur}
          style={{
            width: "100%",
            paddingTop: 14,
            paddingBottom: 14,
            paddingLeft: 48,
            paddingRight: 16,
            backgroundColor: "#ffffff",
            border: `2px solid ${focused ? "#2b6c00" : "#e3e2e2"}`,
            borderBottom: `4px solid ${focused ? "#2b6c00" : "#e3e2e2"}`,
            borderRadius: 12,
            fontSize: 14,
            fontWeight: 500,
            color: "#1a1c1c",
            outline: "none",
            boxSizing: "border-box",
            transition: "border-color 0.2s",
          }}
        />
      </div>
    </div>
  );
}
