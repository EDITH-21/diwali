"use client";

import React, { useState } from "react";
import { DIWALI_STYLES, DEFAULT_MESSAGES, PosterStyleId, UserPersonalization } from "@/types/diwali";
import { Sparkles, Check, User, MessageSquare, Building2, Layers } from "lucide-react";

interface StyleSelectorProps {
  personalization: UserPersonalization;
  onChange: (updated: UserPersonalization) => void;
  onGenerate: () => void;
  canGenerate: boolean;
}

export function StyleSelector({
  personalization,
  onChange,
  onGenerate,
  canGenerate,
}: StyleSelectorProps) {
  const [selectedStyles, setSelectedStyles] = useState<PosterStyleId[]>(
    personalization.selectedStyles
  );

  const toggleStyle = (styleId: PosterStyleId) => {
    let next: PosterStyleId[];
    const isSelected = selectedStyles.includes(styleId);

    if (isSelected) {
      if (selectedStyles.length <= 1) return; // Must keep at least 1
      next = selectedStyles.filter((id) => id !== styleId);
    } else {
      if (selectedStyles.length >= personalization.posterCount) {
        // Replace oldest or shift
        next = [...selectedStyles.slice(1), styleId];
      } else {
        next = [...selectedStyles, styleId];
      }
    }

    setSelectedStyles(next);
    onChange({ ...personalization, selectedStyles: next });
  };

  const handleCountChange = (count: 5 | 8) => {
    let nextStyles: PosterStyleId[];
    if (count === 8) {
      // Select all 8 styles
      nextStyles = DIWALI_STYLES.map((s) => s.id);
    } else {
      // 5 styles
      nextStyles = DIWALI_STYLES.slice(0, 5).map((s) => s.id);
    }
    setSelectedStyles(nextStyles);
    onChange({
      ...personalization,
      posterCount: count,
      selectedStyles: nextStyles,
    });
  };

  return (
    <div className="w-full space-y-8">
      {/* 1. Collection Size Selection (5 vs 8 Posters) */}
      <div className="p-5 sm:p-6 rounded-2xl bg-stone-950/70 border border-amber-500/25">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-400" />
            <h3 className="text-base sm:text-lg font-bold text-amber-100 font-serif">
              Choose Collection Size
            </h3>
          </div>
          <span className="text-xs text-amber-300/80 font-mono">
            {selectedStyles.length} of {personalization.posterCount} Styles Selected
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* 5 Posters Option */}
          <button
            type="button"
            onClick={() => handleCountChange(5)}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
              personalization.posterCount === 5
                ? "border-amber-400 bg-amber-950/40 shadow-[0_0_20px_rgba(255,215,0,0.2)]"
                : "border-amber-500/20 bg-stone-900/40 hover:border-amber-400/50"
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-lg font-extrabold text-amber-200">5 Posters</span>
              {personalization.posterCount === 5 && (
                <span className="w-5 h-5 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center text-xs font-bold">
                  ✓
                </span>
              )}
            </div>
            <span className="text-xs text-amber-100/70">
              Essential Festive Pack • Top 5 trending styles
            </span>
          </button>

          {/* 8 Posters Option */}
          <button
            type="button"
            onClick={() => handleCountChange(8)}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden ${
              personalization.posterCount === 8
                ? "border-amber-400 bg-amber-950/40 shadow-[0_0_20px_rgba(255,215,0,0.2)]"
                : "border-amber-500/20 bg-stone-900/40 hover:border-amber-400/50"
            }`}
          >
            <div className="absolute -right-6 top-2 rotate-12 bg-amber-400 text-stone-950 text-[9px] font-bold px-6 py-0.5 shadow">
              FULL SUITE
            </div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-lg font-extrabold text-amber-200">8 Posters</span>
              {personalization.posterCount === 8 && (
                <span className="w-5 h-5 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center text-xs font-bold">
                  ✓
                </span>
              )}
            </div>
            <span className="text-xs text-amber-100/70">
              Grand Studio Pack • All 8 curated festive styles
            </span>
          </button>
        </div>
      </div>

      {/* 2. Style Selection Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-semibold text-amber-200 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Select Your Festive Styles ({selectedStyles.length}/{personalization.posterCount})</span>
          </label>
          <span className="text-xs text-amber-300/60">
            Click cards to toggle
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {DIWALI_STYLES.map((style) => {
            const isChecked = selectedStyles.includes(style.id);
            return (
              <div
                key={style.id}
                onClick={() => toggleStyle(style.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between relative group ${
                  isChecked
                    ? "border-amber-400 bg-amber-950/35 shadow-[0_0_15px_rgba(255,215,0,0.25)]"
                    : "border-amber-500/20 bg-stone-950/60 opacity-60 hover:opacity-90 hover:border-amber-400/40"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-400/10 border border-amber-400/20">
                    {style.badge}
                  </span>
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                      isChecked
                        ? "bg-amber-400 border-amber-400 text-stone-950"
                        : "border-amber-400/40"
                    }`}
                  >
                    {isChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-amber-100 mb-0.5 group-hover:text-amber-300 transition-colors">
                    {style.name}
                  </h4>
                  <p className="text-[11px] text-amber-200/65 line-clamp-2 leading-tight">
                    {style.tagline}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Personalization Form Fields */}
      <div className="p-5 sm:p-6 rounded-2xl bg-stone-950/70 border border-amber-500/25 space-y-5">
        <h3 className="text-base sm:text-lg font-bold text-amber-100 font-serif flex items-center gap-2">
          <User className="w-4 h-4 text-amber-400" />
          <span>Personalize Your Greetings</span>
        </h3>

        {/* Person's Name */}
        <div>
          <label className="block text-xs font-semibold text-amber-200 mb-1.5 uppercase tracking-wider">
            Your Name or Names <span className="text-amber-400">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={personalization.personName}
              onChange={(e) =>
                onChange({ ...personalization, personName: e.target.value })
              }
              placeholder="e.g. Aarav Sharma, The Kapoor Family, or Priya & Kabir"
              maxLength={40}
              className="w-full px-4 py-3 rounded-xl bg-stone-900/80 border border-amber-500/30 text-amber-100 placeholder:text-stone-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 text-sm"
            />
          </div>
          <span className="text-[11px] text-amber-300/50 mt-1 block">
            This name will be embossed in royal golden typography on each poster.
          </span>
        </div>

        {/* Custom Message */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-amber-200 uppercase tracking-wider flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
              <span>Diwali Message <span className="text-amber-400">*</span></span>
            </label>
            <span className="text-[10px] text-amber-300/60 font-mono">
              {personalization.customMessage.length}/140 chars
            </span>
          </div>

          <textarea
            rows={2}
            value={personalization.customMessage}
            onChange={(e) =>
              onChange({
                ...personalization,
                customMessage: e.target.value.slice(0, 140),
              })
            }
            placeholder="Write your heartfelt festive wish..."
            className="w-full px-4 py-3 rounded-xl bg-stone-900/80 border border-amber-500/30 text-amber-100 placeholder:text-stone-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 text-sm resize-none"
          />

          {/* Quick Message Inspiration Chips */}
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] uppercase font-bold text-amber-400/80 mr-1">
              Inspiration:
            </span>
            {DEFAULT_MESSAGES.map((msg, i) => (
              <button
                key={i}
                type="button"
                onClick={() =>
                  onChange({ ...personalization, customMessage: msg })
                }
                className="text-[10px] px-2.5 py-1 rounded-full bg-amber-950/40 border border-amber-500/20 text-amber-200/80 hover:text-amber-100 hover:border-amber-400/40 transition-colors cursor-pointer truncate max-w-[200px]"
                title={msg}
              >
                {msg.slice(0, 26)}...
              </button>
            ))}
          </div>
        </div>

        {/* Optional Organization or Family Name */}
        <div>
          <label className="block text-xs font-semibold text-amber-200 mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Optional Organization or Family Signature</span>
          </label>
          <input
            type="text"
            value={personalization.familyOrOrgName || ""}
            onChange={(e) =>
              onChange({
                ...personalization,
                familyOrOrgName: e.target.value,
              })
            }
            placeholder="e.g. Shivam & Family, The Sharma Residence, or Studio Labs"
            maxLength={50}
            className="w-full px-4 py-3 rounded-xl bg-stone-900/80 border border-amber-500/30 text-amber-100 placeholder:text-stone-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 text-sm"
          />
        </div>
      </div>

      {/* Primary Generation Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onGenerate}
          disabled={!canGenerate}
          className={`w-full py-4 rounded-xl font-extrabold text-base sm:text-lg flex items-center justify-center gap-2.5 transition-all shadow-[0_10px_35px_rgba(224,170,40,0.35)] cursor-pointer ${
            canGenerate
              ? "btn-gold-glow"
              : "bg-stone-800 text-stone-500 border border-stone-700 cursor-not-allowed opacity-60"
          }`}
        >
          <Sparkles className="w-5 h-5" />
          <span>Generate My {personalization.posterCount} Diwali Posters</span>
        </button>
      </div>
    </div>
  );
}
