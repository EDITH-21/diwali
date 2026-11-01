"use client";

import React from "react";
import { Flame, Sparkles, Heart } from "lucide-react";
import { GlowingDiya } from "./GlowingDiya";

export function Footer() {
  return (
    <footer className="relative bg-[#040203] border-t border-amber-500/20 pt-16 pb-12 overflow-hidden text-center sm:text-left">
      {/* Background radial gold glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-gradient-to-t from-amber-500/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-amber-500/15">
          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center">
                <Flame className="w-4 h-4 text-amber-400" />
              </div>
              <span className="text-xs uppercase tracking-[0.25em] text-amber-300 font-bold">
                Aadrut Presents
              </span>
            </div>

            <h3 className="text-2xl font-black gold-gradient-text tracking-tight font-serif">
              AI DIWALI STUDIO
            </h3>
            <p className="text-amber-200/75 text-sm max-w-sm mt-1">
              "Your Photo. Your Festive Story."
            </p>
            <p className="text-xs text-amber-400/60 mt-1 italic">
              Crafting unforgettable personalized Diwali memories with creative technology.
            </p>
          </div>

          {/* Center Diya Emblem */}
          <div className="flex flex-col items-center">
            <GlowingDiya size="md" interactive={true} />
            <span className="text-[11px] text-amber-400/80 font-serif tracking-widest uppercase mt-2">
              ✨ शुभ दीपावली ✨
            </span>
          </div>

          {/* Quick links & Brand Credit */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-300 mb-2">
              Creative Technology By
            </span>
            <div className="text-xl font-bold text-amber-100 font-serif">
              AADRUT
            </div>
            <p className="text-xs text-amber-200/60 max-w-xs mt-1">
              Pioneering elegant artificial intelligence, spatial design, and festive digital artistry.
            </p>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-amber-300/60">
          <p>© {new Date().getFullYear()} Aadrut presents AI Diwali Studio. All rights reserved.</p>

          <div className="flex items-center gap-1 text-amber-400/80">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 mx-1" />
            <span>for families worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
