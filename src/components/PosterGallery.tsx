"use client";

import React, { useState } from "react";
import { GeneratedPoster, PosterStyleId, DIWALI_STYLES } from "@/types/diwali";
import {
  Download,
  Share2,
  RefreshCw,
  Sparkles,
  Maximize2,
  ArrowRight,
  Check,
  X,
  FileArchive,
  Send,
  Sliders,
} from "lucide-react";
import { createZipBlob, dataUrlToUint8Array } from "@/utils/zipPacker";
import { composeFestivePoster } from "@/utils/posterCompositor";

interface PosterGalleryProps {
  posters: GeneratedPoster[];
  userPhotoUrl: string;
  onRegeneratePoster: (styleId: PosterStyleId) => Promise<void>;
  onCreateAnother: () => void;
  onProceedToGreeting: () => void;
}

export function PosterGallery({
  posters,
  userPhotoUrl,
  onRegeneratePoster,
  onCreateAnother,
  onProceedToGreeting,
}: PosterGalleryProps) {
  const [selectedPoster, setSelectedPoster] = useState<GeneratedPoster | null>(null);
  const [downloadingZip, setDownloadingZip] = useState(false);
  const [regeneratingId, setRegeneratingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Download Single Poster Helper
  const downloadSingle = (poster: GeneratedPoster) => {
    const link = document.createElement("a");
    link.href = poster.imageUrl;
    const cleanName = (poster.personName || "Diwali").replace(/\s+/g, "_");
    link.download = `Aadrut_AI_Diwali_${poster.styleId}_${cleanName}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Download All as ZIP
  const handleDownloadAllZip = async () => {
    try {
      setDownloadingZip(true);
      const zipFiles = posters.map((poster, index) => {
        const cleanName = (poster.personName || "Diwali").replace(/\s+/g, "_");
        const filename = `${index + 1}_${poster.styleId}_${cleanName}.jpg`;
        const data = dataUrlToUint8Array(poster.imageUrl);
        return { filename, data };
      });

      const zipBlob = createZipBlob(zipFiles);
      const url = URL.createObjectURL(zipBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Aadrut_Diwali_Studio_Posters_${Date.now()}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("ZIP creation failed:", err);
      // Fallback: sequential download
      posters.forEach((p, i) => {
        setTimeout(() => downloadSingle(p), i * 300);
      });
    } finally {
      setDownloadingZip(false);
    }
  };

  // Share on WhatsApp
  const shareOnWhatsApp = (poster: GeneratedPoster) => {
    const text = encodeURIComponent(
      `🪔 *Happy Diwali from ${poster.personName}!* 🪔\n\n"${poster.customMessage}"\n\n✨ Created with *AI Diwali Studio* presented by Aadrut. Create your personalized Diwali collection now!`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  // Web Share or Clipboard Fallback
  const handleGenericShare = async (poster: GeneratedPoster) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Happy Diwali from ${poster.personName}`,
          text: `"${poster.customMessage}" — Created with AI Diwali Studio presented by Aadrut`,
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback to copy link
      }
    }

    navigator.clipboard.writeText(
      `🪔 Happy Diwali from ${poster.personName}! "${poster.customMessage}" — Created with AI Diwali Studio presented by Aadrut.`
    );
    setCopiedId(poster.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Handle Regenerate
  const handleRegenerate = async (poster: GeneratedPoster) => {
    setRegeneratingId(poster.id);
    try {
      await onRegeneratePoster(poster.styleId);
    } finally {
      setRegeneratingId(null);
    }
  };

  return (
    <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Gallery Action Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-amber-500/20">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-3">
            <Check className="w-3.5 h-3.5" />
            <span>{posters.length} Posters Generated In Studio HD</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold gold-gradient-text font-serif">
            Your Diwali Poster Collection
          </h2>
          <p className="text-amber-100/70 text-sm sm:text-base mt-1">
            Personalized for <span className="text-amber-300 font-semibold">{posters[0]?.personName}</span> • Ready for Instagram, WhatsApp & Printing
          </p>
        </div>

        {/* Global Gallery Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleDownloadAllZip}
            disabled={downloadingZip}
            className="btn-gold-glow px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer shadow-lg"
          >
            <FileArchive className="w-4 h-4 text-stone-950" />
            <span>{downloadingZip ? "Packing ZIP..." : "Download All Posters (ZIP)"}</span>
          </button>

          <button
            onClick={onCreateAnother}
            className="btn-secondary-festive px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-amber-300" />
            <span>Create Another</span>
          </button>
        </div>
      </div>

      {/* Poster Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
        {posters.map((poster) => {
          const style = DIWALI_STYLES.find((s) => s.id === poster.styleId);
          const isRegenerating = regeneratingId === poster.id;

          return (
            <div
              key={poster.id}
              className="festive-glass-card festive-glass-card-hover rounded-2xl overflow-hidden flex flex-col justify-between group border border-amber-500/25"
            >
              {/* Poster Image Container */}
              <div
                className="relative aspect-[3/4] bg-stone-950 cursor-pointer overflow-hidden"
                onClick={() => setSelectedPoster(poster)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={poster.imageUrl}
                  alt={`${poster.styleName} Diwali Poster`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Top Badge Overlay */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-amber-400/30 text-[10px] font-bold text-amber-300 uppercase tracking-wider">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>{poster.styleName}</span>
                </div>

                {/* Quick Expand Button Hover */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPoster(poster);
                  }}
                  className="absolute top-3 right-3 p-2 rounded-lg bg-black/60 hover:bg-black/90 text-amber-200 border border-amber-400/30 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="View full size"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Card Footer Info & Actions */}
              <div className="p-4 bg-stone-950/80 border-t border-amber-500/20">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-bold text-amber-100 leading-tight">
                      {poster.styleName}
                    </h3>
                    <p className="text-[11px] text-amber-300/70 truncate max-w-[170px]">
                      {style?.tagline || "Custom Diwali Poster"}
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-amber-400/60 uppercase">
                    1200×1600
                  </span>
                </div>

                {/* Action Buttons Row */}
                <div className="grid grid-cols-3 gap-2">
                  {/* Download */}
                  <button
                    onClick={() => downloadSingle(poster)}
                    className="py-2 rounded-lg bg-amber-500/15 hover:bg-amber-500/30 border border-amber-400/30 text-amber-200 text-xs font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer"
                    title="Download High-Res JPG"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-300" />
                    <span>Save</span>
                  </button>

                  {/* WhatsApp Share */}
                  <button
                    onClick={() => shareOnWhatsApp(poster)}
                    className="py-2 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer"
                    title="Share on WhatsApp"
                  >
                    <Send className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp</span>
                  </button>

                  {/* Regenerate */}
                  <button
                    onClick={() => handleRegenerate(poster)}
                    disabled={isRegenerating}
                    className="py-2 rounded-lg bg-stone-900 hover:bg-stone-800 border border-amber-500/20 text-amber-200/80 hover:text-amber-100 text-xs font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer"
                    title="Regenerate this style"
                  >
                    <RefreshCw
                      className={`w-3.5 h-3.5 text-amber-400 ${
                        isRegenerating ? "animate-spin" : ""
                      }`}
                    />
                    <span>{isRegenerating ? "..." : "Redo"}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Prominent Next Action: Section 7 "Create Your Special Diwali Greeting" */}
      <div className="p-8 sm:p-12 rounded-3xl festive-glass-card border-2 border-amber-400/50 text-center relative overflow-hidden shadow-[0_20px_60px_rgba(255,215,0,0.15)]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-400/15 via-red-500/10 to-transparent blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-widest mb-4">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Next Special Experience</span>
        </div>

        <h3 className="text-3xl sm:text-5xl font-extrabold gold-gradient-text font-serif mb-4">
          Create Your Special Diwali Greeting
        </h3>

        <p className="text-amber-100/80 text-base sm:text-lg max-w-2xl mx-auto mb-8 font-light leading-relaxed">
          Step into a full-screen interactive Diwali greeting with your illuminated portrait, glowing diyas you can touch, and night-sky fireworks!
        </p>

        <button
          onClick={onProceedToGreeting}
          className="btn-gold-glow px-10 py-4 rounded-2xl text-lg font-bold inline-flex items-center gap-3 shadow-[0_12px_40px_rgba(224,170,40,0.5)] cursor-pointer group"
        >
          <span>Open Interactive Diwali Greeting</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
        </button>
      </div>

      {/* Full-Size Poster Preview Modal */}
      {selectedPoster && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fade-in"
          onClick={() => setSelectedPoster(null)}
        >
          <div
            className="relative max-w-2xl w-full max-h-[92vh] flex flex-col items-center bg-stone-950 rounded-2xl border border-amber-500/40 p-4 sm:p-6 overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Modal Button */}
            <button
              onClick={() => setSelectedPoster(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-900/80 text-amber-300 hover:bg-stone-800 border border-amber-500/30 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Poster Image */}
            <div className="w-full max-w-md aspect-[3/4] rounded-xl overflow-hidden border-2 border-amber-400/50 shadow-[0_15px_40px_rgba(0,0,0,0.9)] mb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedPoster.imageUrl}
                alt="Full size poster"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Modal Actions */}
            <div className="w-full max-w-md flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => downloadSingle(selectedPoster)}
                className="flex-1 btn-gold-glow py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-stone-950" />
                <span>Download Ultra-HD</span>
              </button>

              <button
                onClick={() => shareOnWhatsApp(selectedPoster)}
                className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Share WhatsApp</span>
              </button>

              <button
                onClick={() => handleGenericShare(selectedPoster)}
                className="py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-200 border border-amber-500/30 text-sm font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-amber-400" />
                <span>{copiedId === selectedPoster.id ? "Copied!" : "Share Link"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
