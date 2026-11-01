"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  alpha: number;
  maxAlpha: number;
  color: string;
  pulsing: boolean;
  pulseSpeed: number;
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Color palette of golden festive embers
    const colors = ["#ffd700", "#f5c042", "#ff9e1f", "#fff1b0", "#ff6b1a"];

    // Initialize 65 gentle golden particles
    const particleCount = Math.min(Math.floor((width * height) / 22000), 75);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const maxAlpha = Math.random() * 0.5 + 0.2;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.5 + 0.8,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: -Math.random() * 0.6 - 0.15, // Floating gently upward
        alpha: Math.random() * maxAlpha,
        maxAlpha: maxAlpha,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulsing: Math.random() > 0.5,
        pulseSpeed: Math.random() * 0.02 + 0.008,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around screen
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Alpha pulsing
        if (p.pulsing) {
          p.alpha += p.pulseSpeed;
          if (p.alpha >= p.maxAlpha || p.alpha <= 0.05) {
            p.pulseSpeed = -p.pulseSpeed;
          }
        }

        // Draw particle with soft glow
        ctx.save();
        ctx.globalAlpha = Math.max(0.05, Math.min(1, p.alpha));
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.size * 3;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70"
      aria-hidden="true"
    />
  );
}
