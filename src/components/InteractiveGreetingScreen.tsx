"use client";

import React, { useEffect, useRef, useState } from "react";
import { GeneratedPoster } from "@/types/diwali";
import { GlowingDiya } from "./GlowingDiya";
import { Sparkles, Share2, Download, ArrowRight, Volume2, VolumeX, Heart, PartyPopper } from "lucide-react";
import { soundManager } from "@/utils/audioSynth";

interface InteractiveGreetingScreenProps {
  poster: GeneratedPoster;
  onContinueToSurprise: () => void;
  onBackToPosters: () => void;
}

interface FireworkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
  decay: number;
}

export function InteractiveGreetingScreen({
  poster,
  onContinueToSurprise,
  onBackToPosters,
}: InteractiveGreetingScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<FireworkParticle[]>([]);
  const [isMuted, setIsMuted] = useState(soundManager.getMuted());
  const [diyasIgnited, setDiyasIgnited] = useState<number>(3);
  const [copied, setCopied] = useState<boolean>(false);

  // Initialize interactive fireworks canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Launch Firework Helper
    const createBurst = (x: number, y: number, colorOverride?: string) => {
      const colors = ["#ffd700", "#ff6b1a", "#ff1e56", "#00f0ff", "#ffffff", "#f5c042"];
      const baseColor = colorOverride || colors[Math.floor(Math.random() * colors.length)];
      const count = 55;

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 1.5;
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color: baseColor,
          size: Math.random() * 3 + 1.5,
          decay: Math.random() * 0.02 + 0.015,
        });
      }

      soundManager.playFireworkBang();
    };

    // Auto launch subtle ambient fireworks every few seconds
    const interval = setInterval(() => {
      const rx = Math.random() * (w * 0.7) + w * 0.15;
      const ry = Math.random() * (h * 0.4) + h * 0.1;
      createBurst(rx, ry);
    }, 2800);

    // Canvas render loop
    const render = () => {
      ctx.fillStyle = "rgba(6, 4, 4, 0.2)";
      ctx.fillRect(0, 0, w, h);

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04; // gravity
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.size * 2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    // Launch welcome burst
    setTimeout(() => {
      createBurst(w * 0.3, h * 0.25);
      createBurst(w * 0.7, h * 0.25);
    }, 600);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(interval);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Handle User Click anywhere to launch firework
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const colors = ["#ffd700", "#ff6b1a", "#ff2a6d", "#05d9e8", "#fff"];
    const baseColor = colors[Math.floor(Math.random() * colors.length)];
    const count = 60;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6 + 2;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color: baseColor,
        size: Math.random() * 3.5 + 1.5,
        decay: Math.random() * 0.02 + 0.015,
      });
    }

    soundManager.playFireworkBang();
  };

  const toggleSound = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundManager.setMuted(next);
    if (!next) soundManager.playTadaFanfare();
  };

  const shareGreeting = async () => {
    const shareText = `🪔 Wishing You and Your Family a Very Happy Diwali! 🪔\n\n— With warm regards from ${poster.personName}\n\n✨ Celebrate with AI Diwali Studio presented by Aadrut!`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Wishing You a Very Happy Diwali!",
          text: shareText,
          url: window.location.href,
        });
        return;
      } catch {
        // fallback
      }
    }

    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const downloadGreeting = () => {
    const link = document.createElement("a");
    link.href = poster.imageUrl;
    link.download = `Aadrut_Happy_Diwali_Greeting_${poster.personName.replace(/\s+/g, "_")}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      onClick={handleCanvasClick}
      className="relative min-h-screen w-full flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#18040a] via-[#080306] to-[#040102] overflow-x-hidden select-none cursor-crosshair"
      title="Click or tap anywhere to launch vibrant fireworks!"
    >
      {/* Interactive Fireworks Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0"
      />

      {/* Floating Sparkle Embers */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,215,0,0.12)_0%,transparent_60%)] pointer-events-none" />

      {/* Top Floating Bar */}
      <div className="relative z-10 max-w-5xl mx-auto w-full flex items-center justify-between">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onBackToPosters();
          }}
          className="text-xs sm:text-sm font-semibold text-amber-200/80 hover:text-amber-100 px-3 py-1.5 rounded-full bg-stone-900/60 border border-amber-500/30 backdrop-blur-md cursor-pointer transition-colors"
        >
          ← Back to Posters
        </button>

        <div className="flex items-center gap-2">
          {/* Audio Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSound();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-stone-900/60 border border-amber-500/30 text-amber-200 backdrop-blur-md cursor-pointer hover:border-amber-400/60"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-amber-400/60" />
                <span>Audio Muted</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span className="text-amber-300">Audio Active</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Centerpiece: Royal Illuminated Greeting Card */}
      <div className="relative z-10 max-w-3xl mx-auto my-auto w-full text-center py-6">
        {/* Top Auspicious Sanskrit Banner */}
        <div className="mb-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-amber-300/90 font-semibold font-serif">
          <span>✨</span>
          <span>दीपावली की हार्दिक शुभकामनाएँ</span>
          <span>✨</span>
        </div>

        {/* Grand Typography: Exactly "Wishing You and Your Family a Very Happy Diwali!" */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold gold-gradient-text font-serif tracking-tight leading-[1.15] mb-4 drop-shadow-[0_4px_25px_rgba(255,215,0,0.35)]">
          Wishing You and Your Family a Very Happy Diwali!
        </h2>

        {/* Personalized Name in Calligraphy Style */}
        <div className="mb-6">
          <span className="text-sm uppercase tracking-widest text-amber-300/80 font-serif block mb-1">
            With warmest festive greetings from
          </span>
          <span className="text-2xl sm:text-4xl font-extrabold text-[#fff5cf] font-serif tracking-wide border-b-2 border-amber-400/60 pb-1 inline-block drop-shadow-[0_2px_12px_rgba(255,215,0,0.4)]">
            {poster.personName}
          </span>
          {poster.familyOrOrgName && (
            <span className="text-xs sm:text-sm text-amber-300/80 block mt-1">
              & {poster.familyOrOrgName}
            </span>
          )}
        </div>

        {/* User Portrait Framed in Royal Golden Jharokha Arch */}
        <div className="relative inline-block mb-8">
          {/* Ambient Diya Glow Behind Arch */}
          <div className="absolute -inset-4 bg-gradient-to-t from-amber-500/40 via-red-500/20 to-transparent blur-2xl rounded-full pointer-events-none" />

          {/* Jharokha Frame */}
          <div className="relative w-56 h-72 sm:w-64 sm:h-80 rounded-t-full rounded-b-3xl border-4 border-amber-400 p-2 bg-stone-950/80 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_40px_rgba(255,215,0,0.4)] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={poster.imageUrl}
              alt="Illuminated portrait"
              className="w-full h-full object-cover rounded-t-full rounded-b-2xl"
            />
            {/* Soft Warm Radial Lighting Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-amber-950/60 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Flanking Interactive Diyas */}
          <div className="absolute -bottom-4 -left-8 transform -rotate-12">
            <GlowingDiya size="md" interactive={true} onIgnite={() => soundManager.playTadaFanfare()} />
          </div>
          <div className="absolute -bottom-4 -right-8 transform rotate-12">
            <GlowingDiya size="md" interactive={true} onIgnite={() => soundManager.playTadaFanfare()} />
          </div>
        </div>

        {/* Custom Message Quote */}
        <div className="max-w-xl mx-auto mb-8 px-4">
          <p className="text-base sm:text-lg text-amber-100/90 italic font-serif leading-relaxed drop-shadow">
            "{poster.customMessage}"
          </p>
        </div>

        {/* Interactive Fireworks Tip */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300/80 text-xs mb-8">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: "5s" }} />
          <span>Tap anywhere on the night sky to launch Diwali fireworks!</span>
        </div>

        {/* Action Buttons: Share Greeting, Download Greeting, Continue */}
        <div className="flex flex-wrap items-center justify-center gap-4 max-w-lg mx-auto">
          {/* Share Greeting */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              shareGreeting();
            }}
            className="btn-gold-glow px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base flex items-center gap-2 cursor-pointer shadow-lg"
          >
            <Share2 className="w-4 h-4 text-stone-950" />
            <span>{copied ? "Link Copied!" : "Share Greeting"}</span>
          </button>

          {/* Download Greeting */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              downloadGreeting();
            }}
            className="btn-secondary-festive px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span>Download Greeting</span>
          </button>

          {/* CONTINUE TO GRAND FINALE SURPRISE */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onContinueToSurprise();
            }}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-red-600 via-amber-500 to-red-600 text-stone-950 font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,100,0,0.5)] cursor-pointer hover:scale-105 transition-transform"
          >
            <PartyPopper className="w-4 h-4" />
            <span>Continue to Diwali Surprise! ✨</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="relative z-10 text-center text-xs text-amber-300/50 pt-4">
        AI DIWALI STUDIO • PRESENTED BY AADRUT
      </div>
    </div>
  );
}
