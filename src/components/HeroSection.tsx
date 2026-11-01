"use client";

import React from "react";
import { Sparkles, ArrowRight, Compass, ShieldCheck, HeartHandshake } from "lucide-react";
import { GlowingDiya } from "./GlowingDiya";

interface HeroSectionProps {
  onStartClick: () => void;
  onExploreClick: () => void;
}

export function HeroSection({ onStartClick, onExploreClick }: HeroSectionProps) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden text-center px-4 sm:px-6 lg:px-8">
      {/* Radial festive lighting glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[360px] bg-gradient-to-b from-[#ffd700]/15 via-[#ff6b1a]/10 to-transparent blur-3xl pointer-events-none rounded-full" />

      {/* Center Top Glowing Diya Accent */}
      <div className="flex justify-center mb-6">
        <GlowingDiya size="lg" interactive={true} />
      </div>

      {/* Brand Tagline Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-gradient-to-r from-amber-950/40 via-red-950/30 to-amber-950/40 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(255,215,0,0.1)]">
        <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: "8s" }} />
        <span className="text-xs sm:text-sm font-medium tracking-wide text-amber-200">
          Presented by <span className="font-bold text-amber-300">Shivam</span> • Your Photo. Your Festive Story.
        </span>
      </div>

      {/* Hero Heading: Exact specification: "Make This Diwali Unforgettable." */}
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto leading-[1.1] mb-6">
        <span className="gold-gradient-text block">
          Make This Diwali
        </span>
        <span className="gold-gradient-subtle block mt-1">
          Unforgettable.
        </span>
      </h1>

      {/* Subtitle: Exact specification: "Turn your photograph into stunning personalized Diwali memories with AI." */}
      <p className="text-lg sm:text-xl md:text-2xl text-amber-100/80 max-w-2xl mx-auto font-light leading-relaxed mb-10">
        Turn your photograph into stunning personalized Diwali memories with AI.
      </p>

      {/* Primary Hero Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-14">
        <button
          onClick={onStartClick}
          className="w-full sm:w-auto btn-gold-glow px-8 py-4 rounded-xl text-base font-bold flex items-center justify-center gap-2.5 shadow-[0_10px_35px_rgba(224,170,40,0.4)] cursor-pointer group"
        >
          <span>Create My Diwali Collection</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={onExploreClick}
          className="w-full sm:w-auto btn-secondary-festive px-7 py-4 rounded-xl text-base font-semibold flex items-center justify-center gap-2 cursor-pointer"
        >
          <Compass className="w-5 h-5 text-amber-400" />
          <span>Explore Designs</span>
        </button>
      </div>

      {/* Trust & Privacy Highlights */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl mx-auto pt-6 border-t border-amber-500/15 text-xs sm:text-sm text-amber-200/70">
        <div className="flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>100% Private & Ephemeral</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>5–8 Studio Portraits</span>
        </div>
        <div className="col-span-2 sm:col-span-1 flex items-center justify-center gap-2">
          <HeartHandshake className="w-4 h-4 text-amber-300" />
          <span>Interactive Surprise Ending</span>
        </div>
      </div>
    </section>
  );
}
