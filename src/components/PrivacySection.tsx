"use client";

import React from "react";
import { ShieldCheck, Lock, EyeOff, Trash2, Key } from "lucide-react";

export function PrivacySection() {
  const commitments = [
    {
      title: "Ephemeral In-Browser Processing",
      desc: "Your uploaded photographs are processed within your active browser session. We do not store or persist your photographs on any permanent database or cloud storage.",
      icon: EyeOff,
    },
    {
      title: "Zero Selling or Training",
      desc: "Your personal memories and portraits belong strictly to you. They are never sold, rented, or utilized for AI model training or third-party advertising.",
      icon: Lock,
    },
    {
      title: "Immediate Session Cleanup",
      desc: "When you close the tab or generate a new collection, all temporary image cache memory is released immediately.",
      icon: Trash2,
    },
    {
      title: "Secure Serverless Architecture",
      desc: "Any optional AI backend routing is strictly handled via encrypted server-side API handlers without exposing keys or user identifiers.",
      icon: Key,
    },
  ];

  return (
    <section id="privacy-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-amber-500/15">
      <div className="festive-glass-card rounded-3xl p-8 sm:p-14 border border-amber-500/30">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-4 h-4" />
            <span>Privacy First Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold gold-gradient-text font-serif mb-4">
            Your Privacy & Trust are Sacred
          </h2>
          <p className="text-amber-100/75 text-sm sm:text-base leading-relaxed">
            Diwali is a celebration of family, sacred joy, and goodwill. Aadrut respects your personal photographs with bank-grade privacy principles and zero invasive data collection.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {commitments.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-stone-950/60 border border-amber-500/20 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-amber-100 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-amber-200/70 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 pt-6 border-t border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-amber-300/60">
          <span>Compliant with modern privacy principles & zero permanent photo retention.</span>
          <span className="font-semibold text-amber-400">Architected with care by Aadrut</span>
        </div>
      </div>
    </section>
  );
}
