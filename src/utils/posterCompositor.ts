import { PosterStyleId } from "@/types/diwali";

export interface ComposeOptions {
  userPhotoUrl: string;
  styleId: PosterStyleId;
  personName: string;
  customMessage: string;
  familyOrOrgName?: string;
  aspectRatio?: "3:4" | "9:16";
  aiBackgroundUrl?: string; // Optional AI generated background/portrait from API
}

// Utility: Load Image helper
export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = src;
  });
}

// Helper: Word wrap text on canvas
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines: number = 3
): number {
  const words = text.split(" ");
  let line = "";
  let currentY = y;
  let linesCount = 0;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, currentY);
      line = words[n] + " ";
      currentY += lineHeight;
      linesCount++;
      if (linesCount >= maxLines - 1 && n < words.length - 1) {
        // truncate with ellipsis if needed
        line += "...";
        ctx.fillText(line, x, currentY);
        return currentY;
      }
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, currentY);
  return currentY;
}

// Draw Ornate Corner Mandala
function drawCornerOrnament(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, angle: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  ctx.strokeStyle = "rgba(245, 192, 66, 0.75)";
  ctx.fillStyle = "rgba(245, 192, 66, 0.25)";
  ctx.lineWidth = 2.5;

  // Outer corner flourish
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(size, 0);
  ctx.lineTo(size * 0.7, size * 0.3);
  ctx.lineTo(size * 0.3, size * 0.7);
  ctx.lineTo(0, size);
  ctx.closePath();
  ctx.stroke();

  // Mini Lotus petals
  ctx.beginPath();
  ctx.arc(size * 0.35, size * 0.35, size * 0.18, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fill();

  ctx.restore();
}

// Draw Glowing Diya Illustration
function drawGlowingDiya(ctx: CanvasRenderingContext2D, x: number, y: number, scale: number = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  // Outer ambient glow
  const glowGrad = ctx.createRadialGradient(0, -25, 5, 0, -25, 90);
  glowGrad.addColorStop(0, "rgba(255, 200, 50, 0.85)");
  glowGrad.addColorStop(0.3, "rgba(255, 120, 20, 0.45)");
  glowGrad.addColorStop(1, "rgba(255, 60, 0, 0)");
  ctx.fillStyle = glowGrad;
  ctx.beginPath();
  ctx.arc(0, -25, 90, 0, Math.PI * 2);
  ctx.fill();

  // Clay Diya Base
  ctx.fillStyle = "#c86428";
  ctx.beginPath();
  ctx.moveTo(-45, 0);
  ctx.bezierCurveTo(-45, 26, 45, 26, 45, 0);
  ctx.bezierCurveTo(25, 10, -25, 10, -45, 0);
  ctx.fill();

  // Diya rim
  ctx.strokeStyle = "#e59835";
  ctx.lineWidth = 3;
  ctx.stroke();

  // Diya oil pool
  ctx.fillStyle = "#ffaa22";
  ctx.beginPath();
  ctx.ellipse(0, 2, 38, 7, 0, 0, Math.PI * 2);
  ctx.fill();

  // Diya Flame
  const flameGrad = ctx.createRadialGradient(0, -22, 2, 0, -20, 32);
  flameGrad.addColorStop(0, "#ffffff");
  flameGrad.addColorStop(0.2, "#fff070");
  flameGrad.addColorStop(0.6, "#ff9500");
  flameGrad.addColorStop(1, "rgba(255, 50, 0, 0)");

  ctx.fillStyle = flameGrad;
  ctx.beginPath();
  ctx.moveTo(0, -52);
  ctx.bezierCurveTo(-15, -30, -12, -8, 0, 0);
  ctx.bezierCurveTo(12, -8, 15, -30, 0, -52);
  ctx.fill();

  ctx.restore();
}

// Master Poster Composition Function
export async function composeFestivePoster(options: ComposeOptions): Promise<string> {
  const {
    userPhotoUrl,
    styleId,
    personName,
    customMessage,
    familyOrOrgName,
    aspectRatio = "3:4",
    aiBackgroundUrl,
  } = options;

  // Standard HD Poster resolution
  const width = 1200;
  const height = aspectRatio === "9:16" ? 2133 : 1600;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not initialize 2D canvas context");

  // Load User Photo
  const userImg = await loadImage(userPhotoUrl);

  // Load AI background if provided, else procedurally generate backdrop
  let aiBgImg: HTMLImageElement | null = null;
  if (aiBackgroundUrl) {
    try {
      aiBgImg = await loadImage(aiBackgroundUrl);
    } catch {
      aiBgImg = null;
    }
  }

  // 1. BACKDROP PAINTING
  if (aiBgImg) {
    // Render AI generated backdrop
    ctx.drawImage(aiBgImg, 0, 0, width, height);
    // Add subtle contrast veil
    ctx.fillStyle = "rgba(6, 4, 4, 0.25)";
    ctx.fillRect(0, 0, width, height);
  } else {
    // High-End Procedural Themed Festive Background
    paintThemedBackground(ctx, width, height, styleId);
  }

  // 2. USER PORTRAIT INTEGRATION
  const photoW = width * 0.62;
  const photoH = height * 0.46;
  const photoX = (width - photoW) / 2;
  const photoY = height * 0.16;

  // Background glow behind portrait
  const portraitGlow = ctx.createRadialGradient(
    width / 2,
    photoY + photoH / 2,
    photoW * 0.2,
    width / 2,
    photoY + photoH / 2,
    photoW * 0.75
  );
  portraitGlow.addColorStop(0, "rgba(245, 192, 66, 0.45)");
  portraitGlow.addColorStop(0.7, "rgba(255, 107, 26, 0.2)");
  portraitGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = portraitGlow;
  ctx.fillRect(photoX - 100, photoY - 100, photoW + 200, photoH + 200);

  // Render User Photo in Royal Arch / Oval Mask
  ctx.save();
  ctx.beginPath();
  const radius = 32;
  // Ornate arched window frame
  ctx.moveTo(photoX, photoY + radius + 60);
  ctx.quadraticCurveTo(photoX, photoY, photoX + photoW / 2, photoY - 30);
  ctx.quadraticCurveTo(photoX + photoW, photoY, photoX + photoW, photoY + radius + 60);
  ctx.lineTo(photoX + photoW, photoY + photoH - radius);
  ctx.quadraticCurveTo(photoX + photoW, photoY + photoH, photoX + photoW - radius, photoY + photoH);
  ctx.lineTo(photoX + radius, photoY + photoH);
  ctx.quadraticCurveTo(photoX, photoY + photoH, photoX, photoY + photoH - radius);
  ctx.closePath();
  ctx.clip();

  // Draw user image centered & cover-fit
  const imgRatio = userImg.width / userImg.height;
  const frameRatio = photoW / photoH;
  let sWidth = userImg.width;
  let sHeight = userImg.height;
  let sx = 0;
  let sy = 0;

  if (imgRatio > frameRatio) {
    sWidth = userImg.height * frameRatio;
    sx = (userImg.width - sWidth) / 2;
  } else {
    sHeight = userImg.width / frameRatio;
    sy = (userImg.height - sHeight) / 2;
  }

  ctx.drawImage(userImg, sx, sy, sWidth, sHeight, photoX, photoY - 30, photoW, photoH + 30);

  // Apply warm festive golden rim filter over portrait
  const warmFilter = ctx.createLinearGradient(photoX, photoY, photoX, photoY + photoH);
  warmFilter.addColorStop(0, "rgba(255, 215, 0, 0.12)");
  warmFilter.addColorStop(0.7, "rgba(0, 0, 0, 0)");
  warmFilter.addColorStop(1, "rgba(22, 6, 8, 0.45)");
  ctx.fillStyle = warmFilter;
  ctx.fillRect(photoX, photoY - 30, photoW, photoH + 30);

  ctx.restore();

  // Royal Golden Arch Frame around portrait
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(photoX, photoY + radius + 60);
  ctx.quadraticCurveTo(photoX, photoY, photoX + photoW / 2, photoY - 30);
  ctx.quadraticCurveTo(photoX + photoW, photoY, photoX + photoW, photoY + radius + 60);
  ctx.lineTo(photoX + photoW, photoY + photoH - radius);
  ctx.quadraticCurveTo(photoX + photoW, photoY + photoH, photoX + photoW - radius, photoY + photoH);
  ctx.lineTo(photoX + radius, photoY + photoH);
  ctx.quadraticCurveTo(photoX, photoY + photoH, photoX, photoY + photoH - radius);
  ctx.closePath();

  ctx.strokeStyle = "rgba(245, 192, 66, 0.9)";
  ctx.lineWidth = 6;
  ctx.shadowColor = "rgba(255, 215, 0, 0.6)";
  ctx.shadowBlur = 18;
  ctx.stroke();

  // Inner subtle border
  ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
  ctx.lineWidth = 1.5;
  ctx.shadowBlur = 0;
  ctx.stroke();
  ctx.restore();

  // 3. POSTER BORDER & CORNER ORNAMENTS
  const margin = 44;
  ctx.save();
  ctx.strokeStyle = "rgba(212, 175, 55, 0.75)";
  ctx.lineWidth = 3;
  ctx.strokeRect(margin, margin, width - margin * 2, height - margin * 2);

  // Secondary inner thin border
  ctx.strokeStyle = "rgba(245, 192, 66, 0.35)";
  ctx.lineWidth = 1;
  ctx.strokeRect(margin + 12, margin + 12, width - (margin + 12) * 2, height - (margin + 12) * 2);

  // 4 Corner Ornaments
  drawCornerOrnament(ctx, margin + 12, margin + 12, 65, 0);
  drawCornerOrnament(ctx, width - margin - 12, margin + 12, 65, Math.PI / 2);
  drawCornerOrnament(ctx, width - margin - 12, height - margin - 12, 65, Math.PI);
  drawCornerOrnament(ctx, margin + 12, height - margin - 12, 65, -Math.PI / 2);
  ctx.restore();

  // 4. TOP FESTIVE BANNER
  ctx.save();
  ctx.textAlign = "center";

  // Sanskrit / Hindi Auspicious invocation
  ctx.font = "600 24px 'Cinzel', serif, Georgia";
  ctx.fillStyle = "rgba(245, 192, 66, 0.85)";
  ctx.letterSpacing = "6px";
  ctx.fillText("✨ ॐ शुभ दीपावली ॐ ✨", width / 2, margin + 48);

  // Main Festive Title
  ctx.font = "bold 52px 'Cinzel', serif, Georgia";
  const titleGrad = ctx.createLinearGradient(width / 2 - 250, 0, width / 2 + 250, 0);
  titleGrad.addColorStop(0, "#fff5cf");
  titleGrad.addColorStop(0.35, "#ffd700");
  titleGrad.addColorStop(0.7, "#f5c042");
  titleGrad.addColorStop(1, "#c8961c");
  ctx.fillStyle = titleGrad;
  ctx.shadowColor = "rgba(255, 215, 0, 0.5)";
  ctx.shadowBlur = 20;
  ctx.fillText("HAPPY DIWALI", width / 2, margin + 112);
  ctx.restore();

  // 5. LOWER TYPOGRAPHY SECTION
  const textStartY = photoY + photoH + 60;
  ctx.save();
  ctx.textAlign = "center";

  // Person's Name in Golden Calligraphy Style
  ctx.font = "bold 58px 'Playfair Display', serif, Georgia";
  const nameGrad = ctx.createLinearGradient(width / 2 - 300, 0, width / 2 + 300, 0);
  nameGrad.addColorStop(0, "#ffffff");
  nameGrad.addColorStop(0.5, "#ffd700");
  nameGrad.addColorStop(1, "#f5c042");
  ctx.fillStyle = nameGrad;
  ctx.shadowColor = "rgba(255, 180, 40, 0.6)";
  ctx.shadowBlur = 16;
  ctx.fillText(personName.toUpperCase(), width / 2, textStartY);

  // Decorative divider below name
  ctx.strokeStyle = "rgba(245, 192, 66, 0.6)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(width / 2 - 140, textStartY + 20);
  ctx.lineTo(width / 2 + 140, textStartY + 20);
  ctx.stroke();

  // Small center diamond
  ctx.fillStyle = "#ffd700";
  ctx.beginPath();
  ctx.arc(width / 2, textStartY + 20, 5, 0, Math.PI * 2);
  ctx.fill();

  // Custom Diwali Greeting Message
  ctx.font = "italic 32px 'Georgia', serif";
  ctx.fillStyle = "#fcedcf";
  ctx.shadowColor = "rgba(0, 0, 0, 0.9)";
  ctx.shadowBlur = 8;
  wrapText(ctx, `"${customMessage}"`, width / 2, textStartY + 75, width * 0.78, 44, 3);

  // Optional Family or Organization Name
  if (familyOrOrgName && familyOrOrgName.trim().length > 0) {
    ctx.font = "600 28px 'Cinzel', serif, Georgia";
    ctx.fillStyle = "rgba(245, 192, 66, 0.95)";
    ctx.shadowBlur = 6;
    ctx.fillText(`— With Warm Regards from ${familyOrOrgName.trim()} —`, width / 2, textStartY + 185);
  }

  // Draw Bottom Center Glowing Diya
  const diyaY = height - margin - 85;
  drawGlowingDiya(ctx, width / 2, diyaY, 1.2);

  // Brand Attribution Seal
  ctx.font = "500 16px system-ui, sans-serif";
  ctx.fillStyle = "rgba(245, 192, 66, 0.65)";
  ctx.letterSpacing = "2px";
  ctx.shadowBlur = 0;
  ctx.fillText("AI DIWALI STUDIO  •  PRESENTED BY AADRUT", width / 2, height - margin - 18);
  ctx.restore();

  return canvas.toDataURL("image/jpeg", 0.94);
}

// Procedural Themed Background Painter
function paintThemedBackground(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  styleId: PosterStyleId
) {
  // Base gradient based on theme
  const bg = ctx.createLinearGradient(0, 0, width, height);

  switch (styleId) {
    case "cinematic-gold":
      bg.addColorStop(0, "#1c1103");
      bg.addColorStop(0.4, "#2d1a04");
      bg.addColorStop(0.8, "#3e2406");
      bg.addColorStop(1, "#0d0801");
      break;
    case "royal-diwali":
      bg.addColorStop(0, "#2b040e");
      bg.addColorStop(0.5, "#480917");
      bg.addColorStop(1, "#150207");
      break;
    case "traditional-indian":
      bg.addColorStop(0, "#2b1003");
      bg.addColorStop(0.5, "#421804");
      bg.addColorStop(1, "#180801");
      break;
    case "luxury-festive":
      bg.addColorStop(0, "#08080a");
      bg.addColorStop(0.5, "#16151c");
      bg.addColorStop(1, "#050506");
      break;
    case "modern-celebration":
      bg.addColorStop(0, "#0f0c24");
      bg.addColorStop(0.5, "#1f1845");
      bg.addColorStop(1, "#070512");
      break;
    case "futuristic-diwali":
      bg.addColorStop(0, "#031018");
      bg.addColorStop(0.5, "#082535");
      bg.addColorStop(1, "#02070a");
      break;
    case "professional-diwali":
      bg.addColorStop(0, "#10131a");
      bg.addColorStop(0.5, "#1b212e");
      bg.addColorStop(1, "#090a0f");
      break;
    case "creative-funny-diwali":
      bg.addColorStop(0, "#2b061c");
      bg.addColorStop(0.5, "#480e30");
      bg.addColorStop(1, "#14020c");
      break;
  }

  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  // Add decorative particles, bokeh, or motifs
  ctx.save();
  for (let i = 0; i < 90; i++) {
    const px = Math.random() * width;
    const py = Math.random() * height;
    const pSize = Math.random() * 4 + 1;
    const alpha = Math.random() * 0.45 + 0.1;

    ctx.fillStyle =
      styleId === "futuristic-diwali"
        ? `rgba(0, 240, 255, ${alpha})`
        : styleId === "royal-diwali"
        ? `rgba(245, 192, 66, ${alpha})`
        : `rgba(255, 215, 0, ${alpha})`;

    ctx.beginPath();
    ctx.arc(px, py, pSize, 0, Math.PI * 2);
    ctx.fill();
  }

  // Draw majestic palace archway silhouette in background
  ctx.strokeStyle = "rgba(245, 192, 66, 0.12)";
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.arc(width / 2, height * 0.38, width * 0.45, Math.PI, 0);
  ctx.stroke();

  ctx.restore();
}
