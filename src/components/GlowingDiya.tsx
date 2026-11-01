"use client";

import React, { useState } from "react";

interface GlowingDiyaProps {
  size?: "sm" | "md" | "lg" | "xl";
  interactive?: boolean;
  className?: string;
  onIgnite?: () => void;
}

export function GlowingDiya({
  size = "md",
  interactive = false,
  className = "",
  onIgnite,
}: GlowingDiyaProps) {
  const [lit, setLit] = useState(true);
  const [burst, setBurst] = useState(false);

  const sizeMap = {
    sm: { w: 42, h: 36, scale: 0.65 },
    md: { w: 68, h: 56, scale: 1 },
    lg: { w: 100, h: 84, scale: 1.5 },
    xl: { w: 140, h: 118, scale: 2.1 },
  };

  const { w, h } = sizeMap[size];

  const handleClick = () => {
    if (!interactive) return;
    setBurst(true);
    setLit(true);
    if (onIgnite) onIgnite();
    setTimeout(() => setBurst(false), 600);
  };

  return (
    <div
      onClick={handleClick}
      className={`relative inline-flex flex-col items-center justify-center select-none ${
        interactive ? "cursor-pointer group" : ""
      } ${className}`}
      style={{ width: `${w}px`, height: `${h}px` }}
      title={interactive ? "Click to kindle diya flame!" : undefined}
    >
      {/* Outer ambient glow halo */}
      {lit && (
        <div
          className={`absolute -top-4 rounded-full pointer-events-none transition-all duration-300 ${
            burst ? "scale-150 opacity-100" : "scale-100 opacity-80"
          }`}
          style={{
            width: `${w * 1.5}px`,
            height: `${h * 1.4}px`,
            background:
              "radial-gradient(circle, rgba(255, 180, 40, 0.45) 0%, rgba(255, 90, 0, 0.15) 50%, transparent 75%)",
            filter: "blur(8px)",
          }}
        />
      )}

      {/* Realistic Diya SVG with Animated Flame */}
      <svg
        viewBox="0 0 100 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
      >
        <defs>
          {/* Flame Gradient */}
          <radialGradient id="flameInner" cx="50%" cy="60%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="25%" stopColor="#fff385" />
            <stop offset="65%" stopColor="#ff9100" />
            <stop offset="100%" stopColor="#ff3c00" stopOpacity="0.8" />
          </radialGradient>

          {/* Diya Clay Gradient */}
          <linearGradient id="clayBase" x1="0" y1="0" x2="0" y2="100%">
            <stop offset="0%" stopColor="#df7a36" />
            <stop offset="40%" stopColor="#a84716" />
            <stop offset="100%" stopColor="#632507" />
          </linearGradient>

          {/* Gold Filigree Diya Rim */}
          <linearGradient id="goldRim" x1="0" y1="0" x2="100%" y2="0">
            <stop offset="0%" stopColor="#ffd700" />
            <stop offset="50%" stopColor="#fff2a8" />
            <stop offset="100%" stopColor="#d4af37" />
          </linearGradient>
        </defs>

        {/* 1. Animated Flickering Flame */}
        {lit && (
          <g className="diya-flame-animated origin-bottom">
            {/* Outer Flame Glow */}
            <path
              d="M50 4 C40 22 36 34 50 48 C64 34 60 22 50 4 Z"
              fill="url(#flameInner)"
              opacity="0.95"
            />
            {/* Hot White Core */}
            <path
              d="M50 18 C46 28 44 34 50 44 C56 34 54 28 50 18 Z"
              fill="#ffffff"
              opacity="0.9"
            />
          </g>
        )}

        {/* 2. Diya Wick */}
        <path
          d="M50 44 Q51 47 50 50"
          stroke="#421a08"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* 3. Clay Diya Body */}
        <path
          d="M15 50 C15 70 85 70 85 50 C70 56 30 56 15 50 Z"
          fill="url(#clayBase)"
        />

        {/* 4. Ornate Gold Rim */}
        <ellipse
          cx="50"
          cy="50"
          rx="35"
          ry="6"
          fill="url(#goldRim)"
          opacity="0.9"
        />

        {/* 5. Ghee / Oil Pool */}
        <ellipse
          cx="50"
          cy="51"
          rx="28"
          ry="3.8"
          fill="#ffaa1a"
          opacity="0.85"
        />

        {/* 6. Traditional Base Footing */}
        <path
          d="M38 68 L62 68 L66 73 L34 73 Z"
          fill="#5a2106"
        />
      </svg>

      {/* Sparkle ring on interactive tap */}
      {burst && (
        <span className="absolute -top-6 text-amber-300 text-xs font-semibold animate-ping">
          ✨ Shubh Deepawali! ✨
        </span>
      )}
    </div>
  );
}
