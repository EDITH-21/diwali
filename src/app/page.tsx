"use client";

export const dynamic = "force-dynamic";

import React, { useState, useRef } from "react";
import {
  PosterStyleId,
  DIWALI_STYLES,
  UserPersonalization,
  GeneratedPoster,
} from "@/types/diwali";
import { Navbar } from "@/components/Navbar";
import { ParticleBackground } from "@/components/ParticleBackground";
import { HeroSection } from "@/components/HeroSection";
import { SamplePosterGallery } from "@/components/SamplePosterGallery";
import { HowItWorks } from "@/components/HowItWorks";
import { FeaturesSection } from "@/components/FeaturesSection";
import { PrivacySection } from "@/components/PrivacySection";
import { Footer } from "@/components/Footer";
import { PhotoUpload } from "@/components/PhotoUpload";
import { StyleSelector } from "@/components/StyleSelector";
import { GenerationProgress } from "@/components/GenerationProgress";
import { PosterGallery } from "@/components/PosterGallery";
import { InteractiveGreetingScreen } from "@/components/InteractiveGreetingScreen";
import { FunnyCartoonSurprise } from "@/components/FunnyCartoonSurprise";
import { composeFestivePoster } from "@/utils/posterCompositor";
import { Sparkles, ArrowLeft, AlertCircle } from "lucide-react";
import { soundManager } from "@/utils/audioSynth";

export default function HomePage() {
  // Navigation / View State
  // "home" -> "results" -> "greeting" -> "surprise"
  const [currentView, setCurrentView] = useState<
    "home" | "results" | "greeting" | "surprise"
  >("home");

  // Studio Flow State
  const [userPhotoUrl, setUserPhotoUrl] = useState<string | null>(null);
  const [permissionConfirmed, setPermissionConfirmed] = useState<boolean>(false);

  const [personalization, setPersonalization] = useState<UserPersonalization>({
    personName: "",
    customMessage:
      "May the divine glow of Diwali illuminate your life with joy, boundless wealth, and health!",
    familyOrOrgName: "",
    posterCount: 5,
    selectedStyles: DIWALI_STYLES.slice(0, 5).map((s) => s.id),
  });

  // Generation Loading State
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [genIndex, setGenIndex] = useState<number>(0);
  const [currentGenStyleName, setCurrentGenStyleName] = useState<string>("");
  const [genError, setGenError] = useState<string | null>(null);

  // Generated Posters Collection
  const [generatedPosters, setGeneratedPosters] = useState<GeneratedPoster[]>([]);

  // Studio Section Reference for Smooth Scroll
  const studioRef = useRef<HTMLDivElement | null>(null);
  const galleryRef = useRef<HTMLDivElement | null>(null);

  const scrollToStudio = () => {
    if (currentView !== "home") setCurrentView("home");
    setTimeout(() => {
      studioRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const scrollToSampleGallery = () => {
    if (currentView !== "home") setCurrentView("home");
    setTimeout(() => {
      const el = document.getElementById("sample-gallery");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleSelectSampleStyle = (styleId: PosterStyleId) => {
    // Add to selected if not already
    if (!personalization.selectedStyles.includes(styleId)) {
      setPersonalization((prev) => ({
        ...prev,
        selectedStyles: [styleId, ...prev.selectedStyles.slice(0, prev.posterCount - 1)],
      }));
    }
    scrollToStudio();
  };

  // Validation Check for Generation
  const canGenerate = Boolean(
    userPhotoUrl &&
      permissionConfirmed &&
      personalization.personName.trim().length > 0 &&
      personalization.customMessage.trim().length > 0 &&
      personalization.selectedStyles.length > 0 &&
      !isGenerating
  );

  // Master Generation Handler
  const handleGenerateCollection = async () => {
    if (!canGenerate || !userPhotoUrl) return;

    setIsGenerating(true);
    setGenError(null);
    const stylesToGenerate = personalization.selectedStyles.slice(
      0,
      personalization.posterCount
    );
    const results: GeneratedPoster[] = [];

    try {
      for (let i = 0; i < stylesToGenerate.length; i++) {
        const styleId = stylesToGenerate[i];
        const styleConfig =
          DIWALI_STYLES.find((s) => s.id === styleId) || DIWALI_STYLES[0];

        setGenIndex(i);
        setCurrentGenStyleName(styleConfig.name);

        // Call backend API route to check for configured cloud AI key (HF/Gemini/OpenAI)
        let aiBackgroundUrl: string | undefined;
        try {
          const apiRes = await fetch("/api/generate-poster", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userPhotoUrl,
              styleId,
              personName: personalization.personName,
              customMessage: personalization.customMessage,
              provider: "auto",
            }),
          });

          if (apiRes.ok) {
            const apiData = await apiRes.json();
            if (apiData.aiImageUrl) {
              aiBackgroundUrl = apiData.aiImageUrl;
            }
          }
        } catch {
          // If network / API route fails, continue with Studio Procedural Compositor
        }

        // Compose the final ultra-HD poster with user photo, frames, and typography
        const composedDataUrl = await composeFestivePoster({
          userPhotoUrl,
          styleId,
          personName: personalization.personName,
          customMessage: personalization.customMessage,
          familyOrOrgName: personalization.familyOrOrgName,
          aspectRatio: "3:4",
          aiBackgroundUrl,
        });

        results.push({
          id: `${styleId}-${Date.now()}-${i}`,
          styleId,
          styleName: styleConfig.name,
          imageUrl: composedDataUrl,
          personName: personalization.personName,
          customMessage: personalization.customMessage,
          familyOrOrgName: personalization.familyOrOrgName,
          timestamp: Date.now(),
        });
      }

      setGeneratedPosters(results);
      setIsGenerating(false);
      setCurrentView("results");
      soundManager.playTadaFanfare();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Poster generation error:", err);
      setGenError("An error occurred during poster rendering. Please try again.");
      setIsGenerating(false);
    }
  };

  // Single Poster Regenerate
  const handleRegeneratePoster = async (styleId: PosterStyleId) => {
    if (!userPhotoUrl) return;
    const styleConfig =
      DIWALI_STYLES.find((s) => s.id === styleId) || DIWALI_STYLES[0];

    const composedDataUrl = await composeFestivePoster({
      userPhotoUrl,
      styleId,
      personName: personalization.personName,
      customMessage: personalization.customMessage,
      familyOrOrgName: personalization.familyOrOrgName,
      aspectRatio: "3:4",
    });

    setGeneratedPosters((prev) =>
      prev.map((p) =>
        p.styleId === styleId
          ? {
              ...p,
              imageUrl: composedDataUrl,
              timestamp: Date.now(),
            }
          : p
      )
    );
  };

  return (
    <div className="relative min-h-screen text-[#fcedcf] bg-[#060404]">
      {/* Interactive Golden Particle Canvas Background */}
      <ParticleBackground />

      {/* Persistent Global Navbar */}
      <Navbar
        onStartClick={scrollToStudio}
        onExploreClick={scrollToSampleGallery}
      />

      {/* Main Views Routing */}
      {currentView === "home" && (
        <main className="relative z-10">
          {/* Section 2: Hero Section */}
          <HeroSection
            onStartClick={scrollToStudio}
            onExploreClick={scrollToSampleGallery}
          />

          {/* Section 3 & 4: Interactive Studio Creation Studio */}
          <section
            ref={studioRef}
            id="studio-creator"
            className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
          >
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>AI Diwali Studio Engine</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold gold-gradient-text font-serif tracking-tight mb-4">
                Create Your Diwali Collection
              </h2>
              <p className="text-amber-100/70 text-sm sm:text-base">
                Upload your photograph, customize your festive message, and let AI Diwali Studio generate 5 to 8 personalized master posters.
              </p>
            </div>

            {genError && (
              <div className="mb-6 p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-sm flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                <span>{genError}</span>
              </div>
            )}

            <div className="festive-glass-card rounded-3xl p-6 sm:p-10 border-2 border-amber-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)] space-y-12">
              {/* Step 1: Photo Upload */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-7 h-7 rounded-full bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center">
                    1
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-amber-100 font-serif">
                    Upload Your Portrait
                  </h3>
                </div>
                <PhotoUpload
                  onPhotoSelected={setUserPhotoUrl}
                  permissionConfirmed={permissionConfirmed}
                  onPermissionChange={setPermissionConfirmed}
                />
              </div>

              {/* Step 2: Design Styles & Personalization */}
              <div className="pt-6 border-t border-amber-500/20">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-7 h-7 rounded-full bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center">
                    2
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-amber-100 font-serif">
                    Select Styles & Greetings
                  </h3>
                </div>
                <StyleSelector
                  personalization={personalization}
                  onChange={setPersonalization}
                  onGenerate={handleGenerateCollection}
                  canGenerate={canGenerate}
                />
              </div>
            </div>
          </section>

          {/* Section 2: Sample Poster Gallery Showcase */}
          <SamplePosterGallery onSelectStyle={handleSelectSampleStyle} />

          {/* How It Works Section */}
          <HowItWorks />

          {/* Features Section */}
          <FeaturesSection />

          {/* Section 11: Privacy & Security */}
          <PrivacySection />

          {/* Footer with Aadrut branding */}
          <Footer />
        </main>
      )}

      {/* Generation Progress Modal */}
      {isGenerating && (
        <GenerationProgress
          currentPosterIndex={genIndex}
          totalPosters={personalization.selectedStyles.length}
          currentStyleName={currentGenStyleName}
        />
      )}

      {/* Section 6: Results Gallery View */}
      {currentView === "results" && (
        <main className="relative z-10 pt-20">
          <PosterGallery
            posters={generatedPosters}
            userPhotoUrl={userPhotoUrl || ""}
            onRegeneratePoster={handleRegeneratePoster}
            onCreateAnother={() => {
              setCurrentView("home");
              scrollToStudio();
            }}
            onProceedToGreeting={() => {
              setCurrentView("greeting");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
          <Footer />
        </main>
      )}

      {/* Section 7: Interactive Diwali Greeting Screen */}
      {currentView === "greeting" && (
        <main className="relative z-10">
          <InteractiveGreetingScreen
            poster={
              generatedPosters[0] || {
                id: "sample",
                styleId: "cinematic-gold",
                styleName: "Cinematic Gold",
                imageUrl: userPhotoUrl || "",
                personName: personalization.personName || "Valued Friend",
                customMessage: personalization.customMessage,
                timestamp: Date.now(),
              }
            }
            onContinueToSurprise={() => {
              setCurrentView("surprise");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onBackToPosters={() => {
              setCurrentView("results");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </main>
      )}

      {/* Section 8: Funny Cartoon Surprise (Grand Finale) */}
      {currentView === "surprise" && (
        <main className="relative z-10">
          <FunnyCartoonSurprise
            personName={personalization.personName || "Valued Friend"}
            onBackToPosters={() => {
              setCurrentView("results");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </main>
      )}
    </div>
  );
}
