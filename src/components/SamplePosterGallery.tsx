"use client";

import React, { useState } from "react";
import { DIWALI_STYLES, PosterStyleId } from "@/types/diwali";
import { Sparkles, ArrowRight, Eye, CheckCircle2 } from "lucide-react";
import { GlowingDiya } from "./GlowingDiya";

interface SamplePosterGalleryProps {
  onSelectStyle: (styleId: PosterStyleId) => void;
}

export function SamplePosterGallery({ onSelectStyle }: SamplePosterGalleryProps) {
  const [activeTab, setActiveTab] = useState<PosterStyleId>("cinematic-gold");

  const selectedStyle = DIWALI_STYLES.find((s) => s.id === activeTab) || DIWALI_STYLES[0];

  return (
    <section id="sample-gallery" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="flex items-center justify-center gap-2 mb-3">
          <GlowingDiya size="sm" />
          <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
            Curated Festive Collection
          </span>
          <GlowingDiya size="sm" />
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold gold-gradient-text tracking-tight mb-4">
          Eight Magnificent Diwali Styles
        </h2>
        <p className="text-amber-100/70 text-base sm:text-lg">
          Each style is crafted with cinematic Indian lighting, majestic heritage palettes, and intricate festive details.
        </p>
      </div>

      {/* Style Chips Selector (Horizontal scroll on mobile) */}
      <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
        {DIWALI_STYLES.map((style) => {
          const isActive = activeTab === style.id;
          return (
            <button
              key={style.id}
              onClick={() => setActiveTab(style.id)}
              className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                isActive
                  ? "bg-gradient-to-r from-amber-400 to-amber-600 text-stone-950 shadow-[0_0_20px_rgba(255,215,0,0.4)] scale-105"
                  : "bg-stone-900/80 border border-amber-500/20 text-amber-200/80 hover:border-amber-400/50 hover:text-amber-100"
              }`}
            >
              <span>{style.name}</span>
              {isActive && <CheckCircle2 className="w-3.5 h-3.5" />}
            </button>
          );
        })}
      </div>

      {/* Featured Style Highlight Card */}
      <div className="festive-glass-card rounded-2xl p-6 sm:p-10 mb-14 border border-amber-500/30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Visual Poster Mockup Preview */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              className="relative w-full max-w-[340px] aspect-[3/4] rounded-2xl p-5 border-2 border-amber-400/50 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(255,215,0,0.2)] flex flex-col justify-between overflow-hidden"
              style={{ background: selectedStyle.bgGradient }}
            >
              {/* Subtle ambient lighting inside card */}
              <div
                className="absolute inset-0 opacity-40 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 30%, ${selectedStyle.accentColor} 0%, transparent 60%)`,
                }}
              />

              {/* Top Banner inside card */}
              <div className="relative text-center">
                <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-amber-300/80 block">
                  ✨ शुभ दीपावली ✨
                </span>
                <span className="text-xl font-bold tracking-wider text-amber-200 font-serif block mt-0.5">
                  HAPPY DIWALI
                </span>
              </div>

              {/* Sample Portrait Window Silhouette */}
              <div className="relative my-auto flex flex-col items-center">
                <div className="w-40 h-48 rounded-t-full rounded-b-2xl border-2 border-amber-400/80 p-1 bg-black/40 shadow-inner flex flex-col items-center justify-center relative overflow-hidden">
                  <div
                    className="w-full h-full rounded-t-full rounded-b-xl flex flex-col items-center justify-center text-center p-3"
                    style={{
                      background: `linear-gradient(180deg, ${selectedStyle.accentColor}25 0%, rgba(0,0,0,0.7) 100%)`,
                    }}
                  >
                    <GlowingDiya size="sm" />
                    <span className="text-xs font-semibold text-amber-100 mt-2">
                      Your Photo Here
                    </span>
                    <span className="text-[10px] text-amber-300/70 font-mono mt-0.5">
                      {selectedStyle.name}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Typography inside card */}
              <div className="relative text-center border-t border-amber-400/30 pt-3">
                <span className="text-sm font-bold text-amber-200 uppercase font-serif tracking-wide block">
                  AARAV & PRIYA
                </span>
                <span className="text-[10px] text-amber-100/75 italic line-clamp-1 block mt-0.5">
                  "May divine light fill your life with boundless happiness!"
                </span>
                <span className="text-[9px] text-amber-400/60 uppercase tracking-widest block mt-2 font-mono">
                  Aadrut AI Studio
                </span>
              </div>
            </div>
          </div>

          {/* Right: Style Information & CTA */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-bold tracking-wider uppercase mb-3 w-fit">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{selectedStyle.badge}</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-extrabold text-amber-100 mb-2 font-serif">
              {selectedStyle.name}
            </h3>
            <p className="text-lg text-amber-300/90 font-medium mb-4">
              {selectedStyle.tagline}
            </p>
            <p className="text-amber-100/70 text-base leading-relaxed mb-6">
              {selectedStyle.description}
            </p>

            <div className="p-4 rounded-xl bg-stone-950/60 border border-amber-500/20 mb-8">
              <div className="text-xs uppercase font-semibold text-amber-400/80 tracking-wider mb-1">
                Festive Aesthetic Notes:
              </div>
              <p className="text-sm text-amber-200/80">
                {selectedStyle.themeNotes}
              </p>
            </div>

            <div>
              <button
                onClick={() => onSelectStyle(selectedStyle.id)}
                className="btn-gold-glow px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Select & Start With {selectedStyle.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of All 8 Styles Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {DIWALI_STYLES.map((style) => (
          <div
            key={style.id}
            onClick={() => setActiveTab(style.id)}
            className={`festive-glass-card rounded-xl p-4 border transition-all cursor-pointer text-left ${
              activeTab === style.id
                ? "border-amber-400 bg-amber-950/30 shadow-[0_0_20px_rgba(255,215,0,0.25)]"
                : "border-amber-500/20 hover:border-amber-400/60 hover:bg-stone-900/60"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400/90 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                {style.badge}
              </span>
              <Eye className="w-3.5 h-3.5 text-amber-400/60" />
            </div>
            <h4 className="text-base font-bold text-amber-200 mb-1">
              {style.name}
            </h4>
            <p className="text-xs text-amber-100/60 line-clamp-2">
              {style.tagline}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
