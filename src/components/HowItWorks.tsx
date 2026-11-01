"use client";

import React from "react";
import { Upload, Sparkles, Gift } from "lucide-react";
import { GlowingDiya } from "./GlowingDiya";

export function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Upload Your Photograph",
      desc: "Choose a clear, well-lit photo of yourself, a loved one, or your family. Ephemerally processed with zero permanent storage.",
      icon: Upload,
      tag: "Easy & Private",
    },
    {
      num: "02",
      title: "Pick Styles & Personalize",
      desc: "Choose 5 or 8 curated Diwali styles — from Cinematic Gold to Royal Mughal Arches. Add your name and a heartfelt message.",
      icon: Sparkles,
      tag: "8 Festive Themes",
    },
    {
      num: "03",
      title: "Enjoy, Share & Laugh",
      desc: "Download full-resolution studio posters, experience the full-screen interactive greeting, and laugh with the surprise cartoon finale!",
      icon: Gift,
      tag: "Studio HD + Surprise",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="flex items-center justify-center gap-2 mb-3">
          <GlowingDiya size="sm" />
          <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
            Simple 3-Step Journey
          </span>
          <GlowingDiya size="sm" />
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold gold-gradient-text tracking-tight font-serif mb-4">
          How AI Diwali Studio Works
        </h2>
        <p className="text-amber-100/70 text-base sm:text-lg">
          Crafting breathtaking personalized Diwali posters in seconds with state-of-the-art festive creative technology.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              className="festive-glass-card rounded-2xl p-8 relative flex flex-col justify-between border border-amber-500/25 group hover:border-amber-400/50 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400/20 to-amber-950/40 border border-amber-400/30 flex items-center justify-center text-amber-300 shadow-[0_0_20px_rgba(255,215,0,0.2)] group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="text-4xl font-black text-amber-400/20 font-serif">
                    {step.num}
                  </span>
                </div>

                <div className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 uppercase tracking-wider mb-2">
                  {step.tag}
                </div>

                <h3 className="text-xl font-bold text-amber-100 mb-3 font-serif">
                  {step.title}
                </h3>
                <p className="text-amber-200/70 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-amber-500/15 flex items-center gap-2 text-xs text-amber-400/80 font-medium">
                <span>✦ Shivam Quality Guaranteed</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
