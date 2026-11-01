"use client";

import React, { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { GlowingDiya } from "./GlowingDiya";

interface GenerationProgressProps {
  currentPosterIndex: number;
  totalPosters: number;
  currentStyleName: string;
}

const STAGES = [
  "Analyzing portrait features and lighting balance...",
  "Applying royal golden illumination and festive palettes...",
  "Weaving ornate palace arches and glowing earthen diyas...",
  "Rendering high-resolution personalized typography...",
  "Harmonizing festive bokeh and sacred mandalas...",
  "Polishing your master collection for export...",
];

export function GenerationProgress({
  currentPosterIndex,
  totalPosters,
  currentStyleName,
}: GenerationProgressProps) {
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStageIndex((prev) => (prev + 1) % STAGES.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const progressPercent = Math.min(
    100,
    Math.round(((currentPosterIndex + 0.5) / Math.max(1, totalPosters)) * 100)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in">
      <div className="w-full max-w-lg p-8 rounded-3xl festive-glass-card border-2 border-amber-400/40 text-center relative overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_50px_rgba(255,215,0,0.2)]">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-32 bg-gradient-to-b from-amber-400/25 to-transparent blur-2xl pointer-events-none" />

        {/* Diya Center Animation */}
        <div className="flex justify-center mb-6">
          <GlowingDiya size="xl" interactive={false} />
        </div>

        {/* Status Heading */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "3s" }} />
          <span>Aadrut AI Engine In Action</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold gold-gradient-text font-serif mb-2">
          Creating Your Diwali Story
        </h3>

        <p className="text-sm text-amber-200/90 font-medium mb-1">
          Rendering Poster {Math.min(totalPosters, currentPosterIndex + 1)} of {totalPosters}:{" "}
          <span className="text-amber-400 font-bold">{currentStyleName}</span>
        </p>

        {/* Dynamic Sub-Stage Message */}
        <p className="text-xs text-amber-100/60 h-8 flex items-center justify-center transition-all duration-300 font-light italic">
          "{STAGES[stageIndex]}"
        </p>

        {/* Progress Bar Container */}
        <div className="mt-6 mb-3">
          <div className="w-full h-3 rounded-full bg-stone-900 border border-amber-500/30 overflow-hidden p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 transition-all duration-500 shadow-[0_0_15px_rgba(255,215,0,0.8)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-amber-300/70 font-mono mt-2">
            <span>Harmonizing Sacred Light</span>
            <span>{progressPercent}% Complete</span>
          </div>
        </div>

        <div className="mt-4 text-[11px] text-amber-200/50">
          Crafting 1200×1600 studio resolution • Please hold on while diyas ignite
        </div>
      </div>
    </div>
  );
}
