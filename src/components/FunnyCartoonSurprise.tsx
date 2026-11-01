"use client";

import React, { useState, useEffect, useRef } from "react";
import { Sparkles, RefreshCw, Share2, ArrowLeft, Volume2, VolumeX, FastForward } from "lucide-react";
import { soundManager } from "@/utils/audioSynth";
import { GlowingDiya } from "./GlowingDiya";

interface FunnyCartoonSurpriseProps {
  personName: string;
  onBackToPosters: () => void;
}

type SceneNumber = 1 | 2 | 3 | 4 | 5 | 6;

export function FunnyCartoonSurprise({
  personName,
  onBackToPosters,
}: FunnyCartoonSurpriseProps) {
  const [scene, setScene] = useState<SceneNumber>(1);
  const [isMuted, setIsMuted] = useState(soundManager.getMuted());
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Scene Progression Timeline
  useEffect(() => {
    // Scene 1: Enters with giant rocket (lasts 3.5s)
    if (scene === 1) {
      timerRef.current = setTimeout(() => {
        setScene(2);
      }, 3500);
    }
    // Scene 2: Confidently places and lights fuse (lasts 3.2s)
    else if (scene === 2) {
      soundManager.playFuseSizzle(2800);
      timerRef.current = setTimeout(() => {
        setScene(3);
      }, 3200);
    }
    // Scene 3: Rocket points in funny direction, panic & comical dash (lasts 3.0s)
    else if (scene === 3) {
      soundManager.playComicalRun();
      timerRef.current = setTimeout(() => {
        setScene(4);
      }, 3000);
    }
    // Scene 4: Rocket wild flight & huge golden fireworks (lasts 3.6s)
    else if (scene === 4) {
      soundManager.playRocketWhoosh();
      setTimeout(() => soundManager.playFireworkBang(), 1400);
      timerRef.current = setTimeout(() => {
        setScene(5);
      }, 3600);
    }
    // Scene 5: Character returns confused & cool with confetti (lasts 2.8s)
    else if (scene === 5) {
      soundManager.playTadaFanfare();
      timerRef.current = setTimeout(() => {
        setScene(6);
      }, 2800);
    }
    // Scene 6: Grand animated punchline
    else if (scene === 6) {
      soundManager.playTadaFanfare();
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [scene]);

  const toggleSound = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundManager.setMuted(next);
    if (!next) soundManager.playTadaFanfare();
  };

  const skipToEnd = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setScene(6);
    soundManager.playTadaFanfare();
  };

  const restartCelebration = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setScene(1);
  };

  const shareTheLaugh = async () => {
    const punchline = `😂 "YOUR DIWALI IS OFFICIALLY FULL POWER!" — Even the fireworks couldn't handle ${personName}'s style!\n\n✨ Celebrate with AI Diwali Studio presented by Shivam!`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "FULL POWER DIWALI!",
          text: punchline,
          url: window.location.href,
        });
        return;
      } catch {
        // fallback
      }
    }

    navigator.clipboard.writeText(punchline);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between p-4 sm:p-8 bg-gradient-to-b from-[#150408] via-[#090205] to-[#030102] overflow-hidden select-none">
      {/* Floating Sparkles & Fireworks Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,200,0,0.12)_0%,transparent_60%)] pointer-events-none" />

      {/* Top Floating Controls */}
      <div className="relative z-30 max-w-5xl mx-auto w-full flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: "4s" }} />
          <span>Wait! One Last Diwali Surprise...</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-stone-900/70 border border-amber-500/30 text-amber-200 backdrop-blur-md hover:border-amber-400/60 transition-colors cursor-pointer"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-amber-400/60" />
                <span className="hidden sm:inline">Muted</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span className="hidden sm:inline text-amber-300">Sound On</span>
              </>
            )}
          </button>

          {/* Skip Button */}
          {scene < 6 && (
            <button
              onClick={skipToEnd}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-stone-900/70 border border-amber-500/30 text-amber-300 hover:text-amber-100 hover:border-amber-400/60 transition-colors cursor-pointer"
            >
              <span>Skip</span>
              <FastForward className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Center Stage: The Cartoon Animation Theater */}
      <div className="relative z-20 max-w-4xl mx-auto my-auto w-full flex flex-col items-center justify-center min-h-[440px]">
        {/* ============================================================ */}
        {/* SCENE 1: Character enters carrying a giant Diwali rocket */}
        {/* ============================================================ */}
        {scene === 1 && (
          <div className="flex flex-col items-center text-center animate-fade-in">
            <div className="text-sm font-serif uppercase tracking-widest text-amber-300 mb-6 bg-amber-500/10 px-4 py-1 rounded-full border border-amber-500/20">
              Act I: The Master Plan
            </div>

            {/* Character & Giant Rocket SVG */}
            <div className="relative w-72 h-80 flex items-center justify-center animate-bounce" style={{ animationDuration: "2s" }}>
              <svg viewBox="0 0 240 240" className="w-full h-full drop-shadow-2xl">
                {/* Traditional Kurta Body */}
                <ellipse cx="100" cy="150" rx="36" ry="46" fill="#f59e0b" />
                {/* Maroon Nehru Jacket */}
                <path d="M78 120 Q100 128 122 120 L122 186 Q100 190 78 186 Z" fill="#881337" />
                {/* Golden Buttons */}
                <circle cx="100" cy="138" r="2.5" fill="#fde047" />
                <circle cx="100" cy="152" r="2.5" fill="#fde047" />
                <circle cx="100" cy="166" r="2.5" fill="#fde047" />

                {/* Dhoti Legs */}
                <path d="M78 186 L74 220 L96 220 L98 186 Z" fill="#fef08a" />
                <path d="M122 186 L126 220 L104 220 L102 186 Z" fill="#fef08a" />
                {/* Traditional Mojari Shoes */}
                <ellipse cx="85" cy="222" rx="14" ry="5" fill="#92400e" />
                <ellipse cx="115" cy="222" rx="14" ry="5" fill="#92400e" />

                {/* Character Cute Head */}
                <ellipse cx="100" cy="80" rx="28" ry="30" fill="#fbcfe8" />
                {/* Cheerful Eyes */}
                <ellipse cx="90" cy="76" rx="5" ry="7" fill="#18181b" />
                <ellipse cx="110" cy="76" rx="5" ry="7" fill="#18181b" />
                <circle cx="92" cy="74" r="2" fill="#ffffff" />
                <circle cx="112" cy="74" r="2" fill="#ffffff" />
                {/* Rosy Cheeks */}
                <ellipse cx="82" cy="86" rx="6" ry="4" fill="#fb7185" opacity="0.6" />
                <ellipse cx="118" cy="86" rx="6" ry="4" fill="#fb7185" opacity="0.6" />
                {/* Confident Grin */}
                <path d="M90 92 Q100 102 110 92" stroke="#9f1239" strokeWidth="3" fill="none" strokeLinecap="round" />

                {/* Royal Turban (Pagri) */}
                <path d="M68 70 Q100 38 132 70 Q100 52 68 70 Z" fill="#dc2626" />
                <path d="M76 60 Q100 46 124 60 Z" fill="#f59e0b" />
                <circle cx="100" cy="56" r="5" fill="#fbbf24" />

                {/* Comically Giant Rocket in arms */}
                <g transform="rotate(-25 150 140)">
                  {/* Rocket Body */}
                  <rect x="130" y="50" width="36" height="110" rx="6" fill="#dc2626" />
                  {/* Decorative Gold Zig-Zags */}
                  <path d="M130 80 L148 70 L166 80 L148 90 Z" fill="#fbbf24" />
                  <path d="M130 115 L148 105 L166 115 L148 125 Z" fill="#fbbf24" />
                  {/* Rocket Cone */}
                  <polygon points="130,50 166,50 148,10" fill="#f59e0b" />
                  {/* Rocket Wooden Stick */}
                  <rect x="145" y="160" width="6" height="85" fill="#78350f" />
                  {/* Fuse String */}
                  <path d="M148 10 Q160 0 165 -15" stroke="#e5e7eb" strokeWidth="3" fill="none" strokeLinecap="round" />
                  {/* Label: 9000W */}
                  <text x="135" y="145" fill="#ffffff" fontSize="9" fontWeight="bold">9000W</text>
                </g>

                {/* Arms Holding Rocket */}
                <path d="M70 140 Q100 160 145 140" stroke="#f59e0b" strokeWidth="12" fill="none" strokeLinecap="round" />
              </svg>
            </div>

            <h3 className="text-2xl font-bold gold-gradient-text mt-4 font-serif">
              "Behold! The Legendary 9000W Super-Patakha!"
            </h3>
            <p className="text-amber-200/70 text-sm mt-1">
              {personName} is about to witness supreme festive fireworks...
            </p>
          </div>
        )}

        {/* ============================================================ */}
        {/* SCENE 2: Confidently places rocket on ground and lights it */}
        {/* ============================================================ */}
        {scene === 2 && (
          <div className="flex flex-col items-center text-center animate-fade-in">
            <div className="text-sm font-serif uppercase tracking-widest text-amber-300 mb-6 bg-amber-500/10 px-4 py-1 rounded-full border border-amber-500/20">
              Act II: Igniting The Fuse
            </div>

            <div className="relative w-80 h-80 flex items-center justify-center">
              <svg viewBox="0 0 280 240" className="w-full h-full drop-shadow-2xl">
                {/* Earthen Flowerpot Bottle Stand */}
                <path d="M170 170 L205 170 L215 220 L160 220 Z" fill="#9a3412" />

                {/* Rocket Placed in Stand */}
                <g>
                  <rect x="175" y="55" width="28" height="95" rx="5" fill="#dc2626" />
                  <polygon points="175,55 203,55 189,20" fill="#f59e0b" />
                  <rect x="186" y="150" width="6" height="60" fill="#78350f" />
                  {/* Sizzling Fuse Sparkle */}
                  <path d="M189 20 Q175 10 165 18" stroke="#cbd5e1" strokeWidth="2.5" fill="none" />
                  <circle cx="165" cy="18" r="7" fill="#fbbf24" className="animate-ping" />
                  <circle cx="165" cy="18" r="4" fill="#ffffff" />
                </g>

                {/* Character Bending Forward with Matchstick */}
                <g transform="translate(-10, 0)">
                  <ellipse cx="100" cy="155" rx="32" ry="40" fill="#f59e0b" />
                  <ellipse cx="100" cy="85" rx="26" ry="28" fill="#fbcfe8" />
                  {/* Winking Cool Face */}
                  <ellipse cx="92" cy="82" rx="4" ry="6" fill="#18181b" />
                  <path d="M106 82 Q112 80 118 84" stroke="#18181b" strokeWidth="3" fill="none" />
                  <path d="M92 98 Q102 108 112 98" stroke="#9f1239" strokeWidth="3" fill="none" />
                  {/* Turban */}
                  <path d="M72 75 Q100 48 128 75 Q100 58 72 75 Z" fill="#dc2626" />
                  {/* Arm holding match */}
                  <path d="M115 140 Q145 130 160 30" stroke="#f59e0b" strokeWidth="9" fill="none" strokeLinecap="round" />
                  <circle cx="162" cy="24" r="5" fill="#ef4444" />
                </g>
              </svg>
            </div>

            <h3 className="text-2xl font-bold gold-gradient-text mt-4 font-serif">
              "Three... Two... One... Stand back in awe!"
            </h3>
            <p className="text-amber-300 text-xs font-mono mt-1 animate-pulse">
              *pssssssshhhttt* • Fuse burning smoothly...
            </p>
          </div>
        )}

        {/* ============================================================ */}
        {/* SCENE 3: Rocket twists sideways! Shock & Comical Dash! */}
        {/* ============================================================ */}
        {scene === 3 && (
          <div className="flex flex-col items-center text-center animate-fade-in w-full">
            <div className="text-sm font-serif uppercase tracking-widest text-red-400 mb-6 bg-red-500/15 px-4 py-1 rounded-full border border-red-500/30">
              Act III: Houston, We Have A Problem! 😂
            </div>

            <div className="relative w-full max-w-lg h-72 flex items-center justify-between px-4">
              {/* Crooked Rocket Tilting Horizontally */}
              <div className="transform rotate-75 animate-pulse">
                <svg viewBox="0 0 120 160" className="w-32 h-40 drop-shadow-xl">
                  <rect x="40" y="40" width="32" height="90" rx="5" fill="#dc2626" />
                  <polygon points="40,40 72,40 56,10" fill="#f59e0b" />
                  <circle cx="56" cy="8" r="10" fill="#f97316" className="animate-ping" />
                  {/* Smoke sputtering out */}
                  <circle cx="56" cy="140" r="12" fill="#64748b" opacity="0.7" />
                  <circle cx="50" cy="155" r="8" fill="#94a3b8" opacity="0.6" />
                </svg>
              </div>

              {/* Character Shocked & Running Away Comically */}
              <div className="transform translate-x-12 animate-bounce">
                <svg viewBox="0 0 180 200" className="w-44 h-52 drop-shadow-xl">
                  {/* Bulging Eyes in Classic Cartoon Shock */}
                  <ellipse cx="70" cy="55" rx="12" ry="18" fill="#ffffff" stroke="#18181b" strokeWidth="2" />
                  <ellipse cx="105" cy="55" rx="12" ry="18" fill="#ffffff" stroke="#18181b" strokeWidth="2" />
                  <circle cx="70" cy="55" r="4" fill="#18181b" />
                  <circle cx="105" cy="55" r="4" fill="#18181b" />
                  {/* Huge Open Mouth Gasp "O" */}
                  <ellipse cx="88" cy="85" rx="12" ry="16" fill="#18181b" />
                  <ellipse cx="88" cy="94" rx="8" ry="5" fill="#f43f5e" />
                  {/* Sweat Droplet popping */}
                  <path d="M125 45 Q135 55 125 65 Q115 55 125 45 Z" fill="#38bdf8" />

                  {/* Cartoon Running Blur Legs (Wheel effect) */}
                  <ellipse cx="88" cy="165" rx="35" ry="16" fill="none" stroke="#f59e0b" strokeWidth="6" strokeDasharray="12 6" className="animate-spin" />
                  {/* Arms Flailing Up in Air */}
                  <path d="M60 110 L30 65" stroke="#f59e0b" strokeWidth="10" strokeLinecap="round" />
                  <path d="M115 110 L145 65" stroke="#f59e0b" strokeWidth="10" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-red-400 mt-2 font-serif">
              "WAIT NO! NOT IN THAT DIRECTION!!" 😱🏃💨
            </h3>
            <p className="text-amber-200/80 text-sm mt-1">
              Tactical retreat initiated at lightning speed...
            </p>
          </div>
        )}

        {/* ============================================================ */}
        {/* SCENE 4: Rocket takes off & explodes into golden fireworks */}
        {/* ============================================================ */}
        {scene === 4 && (
          <div className="flex flex-col items-center text-center animate-fade-in w-full">
            <div className="text-sm font-serif uppercase tracking-widest text-amber-300 mb-6 bg-amber-500/15 px-4 py-1 rounded-full border border-amber-500/30">
              Act IV: The Cosmic Detonation 🎆
            </div>

            {/* Giant Exploding Golden Fireworks Display */}
            <div className="relative w-80 h-72 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/30 via-red-500/20 to-amber-500/30 blur-3xl animate-ping" />

              <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_50px_rgba(255,215,0,0.9)] animate-spin" style={{ animationDuration: "14s" }}>
                {/* 16 Golden Sparkle Rays */}
                {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((angle, i) => (
                  <line
                    key={i}
                    x1="100"
                    y1="100"
                    x2={100 + Math.cos((angle * Math.PI) / 180) * 85}
                    y2={100 + Math.sin((angle * Math.PI) / 180) * 85}
                    stroke={i % 2 === 0 ? "#ffd700" : "#ff6b1a"}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeDasharray="10 5"
                  />
                ))}
                {/* Center Core Flash */}
                <circle cx="100" cy="100" r="28" fill="#ffffff" />
                <circle cx="100" cy="100" r="42" fill="#ffd700" opacity="0.6" />
              </svg>
            </div>

            <h3 className="text-3xl sm:text-4xl font-extrabold gold-gradient-text mt-2 font-serif">
              *BOOOOOOOOOOOM!!* ✨💥
            </h3>
            <p className="text-amber-200/90 text-sm mt-1">
              Golden stardust showers across the galaxy!
            </p>
          </div>
        )}

        {/* ============================================================ */}
        {/* SCENE 5: Character returns confused & cool with confetti */}
        {/* ============================================================ */}
        {scene === 5 && (
          <div className="flex flex-col items-center text-center animate-fade-in">
            <div className="text-sm font-serif uppercase tracking-widest text-amber-300 mb-6 bg-amber-500/15 px-4 py-1 rounded-full border border-amber-500/30">
              Act V: Still Standing Like A Boss 😎
            </div>

            {/* Character Returning with Cool Broken Sunglasses & Soot Smudges */}
            <div className="relative w-72 h-80 flex items-center justify-center">
              <svg viewBox="0 0 220 240" className="w-full h-full drop-shadow-2xl">
                {/* Kurta with funny cartoon soot smudges */}
                <ellipse cx="110" cy="155" rx="36" ry="46" fill="#f59e0b" />
                {/* Soot patches */}
                <ellipse cx="95" cy="145" rx="10" ry="6" fill="#27272a" opacity="0.75" />
                <ellipse cx="125" cy="165" rx="14" ry="7" fill="#27272a" opacity="0.75" />

                {/* Head with soot cheeks */}
                <ellipse cx="110" cy="85" rx="28" ry="30" fill="#fbcfe8" />
                <ellipse cx="95" cy="95" rx="8" ry="4" fill="#27272a" opacity="0.6" />
                <ellipse cx="125" cy="95" rx="8" ry="4" fill="#27272a" opacity="0.6" />

                {/* Crooked Cool Dude Sunglasses */}
                <g transform="rotate(-6 110 80)">
                  <rect x="82" y="72" width="24" height="16" rx="4" fill="#09090b" stroke="#f59e0b" strokeWidth="2" />
                  <rect x="114" y="72" width="24" height="16" rx="4" fill="#09090b" stroke="#f59e0b" strokeWidth="2" />
                  <line x1="106" y1="80" x2="114" y2="80" stroke="#f59e0b" strokeWidth="2" />
                  {/* Star sparkle on lens */}
                  <polygon points="94,76 96,80 100,80 97,83 98,87 94,84 90,87 91,83 88,80 92,80" fill="#ffffff" />
                </g>

                {/* Sheepish Smirk */}
                <path d="M102 104 Q114 112 124 104" stroke="#9f1239" strokeWidth="3" fill="none" strokeLinecap="round" />

                {/* Turban Slightly Askew */}
                <g transform="rotate(8 110 65)">
                  <path d="M78 68 Q110 38 142 68 Q110 52 78 68 Z" fill="#dc2626" />
                </g>

                {/* Holding a Tiny Sparkler (Phuljhadi) */}
                <line x1="145" y1="140" x2="175" y2="90" stroke="#71717a" strokeWidth="3" />
                <circle cx="175" cy="90" r="10" fill="#fde047" className="animate-ping" />
                <circle cx="175" cy="90" r="4" fill="#ffffff" />
              </svg>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold gold-gradient-text mt-2 font-serif">
              "Totally planned that. Not nervous at all." 😎
            </h3>
            <p className="text-amber-200/80 text-sm mt-1">
              Diwali level: 1000% unlocked!
            </p>
          </div>
        )}

        {/* ============================================================ */}
        {/* SCENE 6: GRAND FINALE PUNCHLINE */}
        {/* ============================================================ */}
        {scene === 6 && (
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto animate-fade-in p-6 sm:p-10 rounded-3xl festive-glass-card border-2 border-amber-400 shadow-[0_0_80px_rgba(255,215,0,0.3)]">
            {/* Flanking Festive Diyas */}
            <div className="flex items-center justify-center gap-6 mb-4">
              <GlowingDiya size="md" interactive={true} />
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-3xl shadow-[0_0_25px_rgba(255,215,0,0.4)]">
                🚀
              </div>
              <GlowingDiya size="md" interactive={true} />
            </div>

            {/* Exactly Specified Punchline: "YOUR DIWALI IS OFFICIALLY FULL POWER! 😂" */}
            <h2 className="text-3xl sm:text-5xl font-black fire-gradient-text tracking-tight font-serif mb-4 leading-tight">
              YOUR DIWALI IS OFFICIALLY FULL POWER! 😂
            </h2>

            {/* Exactly Specified Subtitle: "Even the fireworks couldn't handle your style!" */}
            <p className="text-lg sm:text-2xl text-[#fcedcf] font-semibold mb-3">
              Even the fireworks couldn't handle your style!
            </p>

            <p className="text-amber-200/75 text-sm sm:text-base mb-8 max-w-md mx-auto">
              Wishing <span className="text-amber-300 font-bold">{personName}</span> and everyone you love an explosive festival of joy, endless laughter, and boundless prosperity!
            </p>

            {/* Required Action Buttons:
                1. Celebrate Again
                2. Share the Laugh
                3. Back to My Posters
            */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
              {/* Celebrate Again */}
              <button
                onClick={restartCelebration}
                className="w-full sm:w-auto btn-gold-glow px-6 py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <RefreshCw className="w-4 h-4 text-stone-950" />
                <span>Celebrate Again</span>
              </button>

              {/* Share the Laugh */}
              <button
                onClick={shareTheLaugh}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-stone-950 font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,80,0,0.4)] transition-all cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>{copied ? "Punchline Copied!" : "Share the Laugh"}</span>
              </button>

              {/* Back to My Posters */}
              <button
                onClick={onBackToPosters}
                className="w-full sm:w-auto btn-secondary-festive px-6 py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 text-amber-300" />
                <span>Back to My Posters</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Scene Step Indicator */}
      <div className="relative z-20 max-w-md mx-auto w-full pt-4 flex items-center justify-center gap-2">
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <button
            key={num}
            onClick={() => {
              if (timerRef.current) clearTimeout(timerRef.current);
              setScene(num as SceneNumber);
            }}
            className={`h-1.5 rounded-full transition-all cursor-pointer ${
              scene === num
                ? "w-8 bg-amber-400 shadow-[0_0_8px_rgba(255,215,0,0.8)]"
                : "w-2 bg-stone-700 hover:bg-stone-500"
            }`}
            title={`Jump to Scene ${num}`}
          />
        ))}
      </div>
    </div>
  );
}
