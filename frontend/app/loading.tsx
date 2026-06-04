import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Simple bouncing dots or spinner */}
        <div className="flex gap-2">
          <div className="w-4 h-4 bg-primary-container rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
          <div className="w-4 h-4 bg-secondary-container rounded-full animate-bounce" style={{ animationDelay: "0.15s" }}></div>
          <div className="w-4 h-4 bg-tertiary-container rounded-full animate-bounce" style={{ animationDelay: "0.3s" }}></div>
        </div>
        <p className="font-label text-sm font-bold text-on-surface-variant animate-pulse">
          Memuat...
        </p>
      </div>
    </div>
  );
}
