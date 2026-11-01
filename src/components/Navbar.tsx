"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Volume2, VolumeX, Flame } from "lucide-react";
import { soundManager } from "@/utils/audioSynth";

interface NavbarProps {
  onStartClick?: () => void;
  onExploreClick?: () => void;
}

export function Navbar({ onStartClick, onExploreClick }: NavbarProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSound = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    soundManager.setMuted(nextState);
    if (!nextState) {
      soundManager.playTadaFanfare();
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0608]/90 backdrop-blur-md border-b border-[#d4af37]/20 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand identity: Aadrut presents AI Diwali Studio */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#ffd700]/20 to-[#b8860b]/10 border border-[#ffd700]/30 shadow-[0_0_15px_rgba(255,215,0,0.2)]">
            <Flame className="w-5 h-5 text-amber-400 drop-shadow-[0_0_8px_rgba(255,200,0,0.8)] animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-amber-400/80">
                Aadrut Presents
              </span>
              <span className="inline-block w-1 h-1 rounded-full bg-amber-400/60" />
              <span className="text-[10px] tracking-wider text-amber-200/60 uppercase font-medium">
                Festive Edition
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight gold-gradient-text">
              AI DIWALI STUDIO
            </h1>
          </div>
        </div>

        {/* Center Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-amber-100/75">
          <button
            onClick={onStartClick}
            className="hover:text-amber-300 transition-colors cursor-pointer"
          >
            Create Posters
          </button>
          <button
            onClick={onExploreClick}
            className="hover:text-amber-300 transition-colors cursor-pointer"
          >
            Design Styles
          </button>
          <a
            href="#how-it-works"
            className="hover:text-amber-300 transition-colors"
          >
            How It Works
          </a>
          <a
            href="#privacy-section"
            className="hover:text-amber-300 transition-colors"
          >
            Privacy
          </a>
        </nav>

        {/* Right CTA & Sound Controls */}
        <div className="flex items-center gap-3">
          {/* Audio toggle button */}
          <button
            onClick={toggleSound}
            aria-label={isMuted ? "Unmute festive sound effects" : "Mute audio"}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-amber-500/25 bg-amber-950/30 text-amber-200 hover:border-amber-400/50 hover:bg-amber-900/40 transition-all cursor-pointer"
            title={isMuted ? "Click to enable sound effects" : "Mute sound"}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-amber-400/70" />
                <span className="hidden sm:inline text-[11px]">Sound Off</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span className="hidden sm:inline text-[11px] text-amber-300">Sound On</span>
              </>
            )}
          </button>

          {/* Quick Create CTA */}
          <button
            onClick={onStartClick}
            className="btn-gold-glow px-4 py-1.5 sm:px-5 sm:py-2 rounded-full text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer font-semibold"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#1a0c02]" />
            <span>Create Posters</span>
          </button>
        </div>
      </div>
    </header>
  );
}
