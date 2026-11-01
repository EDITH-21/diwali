"use client";

import React from "react";
import { Sparkles, Shield, Image as ImageIcon, Flame, Smartphone, Laugh } from "lucide-react";
import { GlowingDiya } from "./GlowingDiya";

export function FeaturesSection() {
  const features = [
    {
      title: "Preserves Facial Identity",
      desc: "Thoughtfully blends your natural face with realistic festive golden rim lighting, bokeh embers, and palace aesthetics.",
      icon: ImageIcon,
    },
    {
      title: "8 Curated Indian Styles",
      desc: "From Royal Rajasthani jharokhas to Cyber-Vedic futuristic diyas and playful comic patakha themes.",
      icon: Sparkles,
    },
    {
      title: "Ultra-HD Studio Export",
      desc: "Crisp 1200×1600 output formatted perfectly for WhatsApp Status, Instagram Stories, and luxury photo prints.",
      icon: Smartphone,
    },
    {
      title: "Realistic Glowing Diyas",
      desc: "Physics-inspired clay diya flame flickers, radiating auspicious golden warmth throughout your collection.",
      icon: Flame,
    },
    {
      title: "Interactive Greeting Screen",
      desc: "Full-screen festive celebration with tap-to-ignite fireworks, golden dust particles, and royal calligraphy.",
      icon: Shield,
    },
    {
      title: "Hilarious Surprise Finale",
      desc: "An unforgettable comic cartoon sequence with animated sound effects that leaves everyone laughing!",
      icon: Laugh,
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-amber-500/15">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="flex items-center justify-center gap-2 mb-3">
          <GlowingDiya size="sm" />
          <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
            Uncompromising Excellence
          </span>
          <GlowingDiya size="sm" />
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold gold-gradient-text tracking-tight font-serif mb-4">
          Built For Premium Festivities
        </h2>
        <p className="text-amber-100/70 text-base sm:text-lg">
          Every detail engineered by Shivam to deliver an unforgettable creative experience for you and your family.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feat, i) => {
          const Icon = feat.icon;
          return (
            <div
              key={i}
              className="p-6 rounded-2xl bg-stone-950/60 border border-amber-500/20 hover:border-amber-400/50 transition-all hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-300 mb-4 group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-amber-100 mb-2 font-serif">
                {feat.title}
              </h3>
              <p className="text-xs sm:text-sm text-amber-200/70 leading-relaxed">
                {feat.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
