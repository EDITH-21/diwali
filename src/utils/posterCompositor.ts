import { PosterStyleId } from "@/types/diwali";

export interface ComposeOptions {
  userPhotoUrl: string;
  styleId: PosterStyleId;
  personName: string;
  customMessage: string;
  familyOrOrgName?: string;
  aspectRatio?: "3:4" | "9:16";
  aiBackgroundUrl?: string;
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

// Helper: Word wrap text
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
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line, x, currentY);
      line = words[n] + " ";
      currentY += lineHeight;
      linesCount++;
      if (linesCount >= maxLines - 1 && n < words.length - 1) {
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

// Helper: Render Enhanced Photo with style-specific filters & lighting
function renderEnhancedUserPhoto(
  ctx: CanvasRenderingContext2D,
  userImg: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number,
  styleId: PosterStyleId
) {
  // Crop & cover calculations
  const imgRatio = userImg.width / userImg.height;
  const frameRatio = w / h;
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

  // Draw base photo
  ctx.drawImage(userImg, sx, sy, sWidth, sHeight, x, y, w, h);

  // Apply style-specific tonal enhancement & lighting overlay
  ctx.save();
  switch (styleId) {
    case "cinematic-gold": {
      // Golden hour warm bloom & dramatic rim lighting
      const grad = ctx.createRadialGradient(x + w * 0.5, y + h * 0.4, w * 0.1, x + w * 0.5, y + h * 0.5, w * 0.7);
      grad.addColorStop(0, "rgba(255, 220, 120, 0.22)");
      grad.addColorStop(0.6, "rgba(255, 170, 40, 0.12)");
      grad.addColorStop(1, "rgba(40, 15, 5, 0.45)");
      ctx.fillStyle = grad;
      ctx.fillRect(x, y, w, h);

      // Gold rim light flare on bottom-right
      const rim = ctx.createLinearGradient(x, y, x + w, y + h);
      rim.addColorStop(0, "rgba(255, 235, 150, 0.25)");
      rim.addColorStop(0.5, "transparent");
      rim.addColorStop(1, "rgba(212, 175, 55, 0.35)");
      ctx.fillStyle = rim;
      ctx.fillRect(x, y, w, h);
      break;
    }

    case "royal-diwali": {
      // Regal Mughal velvet crimson & antique gold saturation
      const grad = ctx.createLinearGradient(x, y, x, y + h);
      grad.addColorStop(0, "rgba(245, 192, 66, 0.18)");
      grad.addColorStop(0.6, "transparent");
      grad.addColorStop(1, "rgba(80, 10, 25, 0.55)");
      ctx.fillStyle = grad;
      ctx.fillRect(x, y, w, h);

      // Antique vignette
      const vig = ctx.createRadialGradient(x + w / 2, y + h / 2, w * 0.3, x + w / 2, y + h / 2, w * 0.7);
      vig.addColorStop(0, "transparent");
      vig.addColorStop(1, "rgba(30, 2, 8, 0.65)");
      ctx.fillStyle = vig;
      ctx.fillRect(x, y, w, h);
      break;
    }

    case "traditional-indian": {
      // Rich auspicious warmth (Kumkum & Haldi tones)
      const grad = ctx.createRadialGradient(x + w / 2, y + h * 0.35, w * 0.15, x + w / 2, y + h * 0.5, w * 0.75);
      grad.addColorStop(0, "rgba(255, 230, 150, 0.25)");
      grad.addColorStop(0.5, "rgba(255, 120, 20, 0.18)");
      grad.addColorStop(1, "rgba(60, 20, 5, 0.5)");
      ctx.fillStyle = grad;
      ctx.fillRect(x, y, w, h);
      break;
    }

    case "luxury-festive": {
      // High-fashion editorial contrast: obsidian shadows + champagne highlights
      const grad = ctx.createLinearGradient(x, y, x + w, y + h);
      grad.addColorStop(0, "rgba(255, 245, 210, 0.28)");
      grad.addColorStop(0.4, "transparent");
      grad.addColorStop(1, "rgba(10, 8, 12, 0.65)");
      ctx.fillStyle = grad;
      ctx.fillRect(x, y, w, h);

      // Sleek diagonal sheen
      const sheen = ctx.createLinearGradient(x, y, x + w, y);
      sheen.addColorStop(0, "rgba(212, 175, 55, 0.15)");
      sheen.addColorStop(0.5, "transparent");
      sheen.addColorStop(1, "rgba(212, 175, 55, 0.15)");
      ctx.fillStyle = sheen;
      ctx.fillRect(x, y, w, h);
      break;
    }

    case "modern-celebration": {
      // Twilight sky lighting with warm lantern spark reflections
      const grad = ctx.createLinearGradient(x, y, x, y + h);
      grad.addColorStop(0, "rgba(120, 100, 220, 0.18)");
      grad.addColorStop(0.5, "transparent");
      grad.addColorStop(1, "rgba(255, 120, 40, 0.4)");
      ctx.fillStyle = grad;
      ctx.fillRect(x, y, w, h);
      break;
    }

    case "futuristic-diwali": {
      // Cyber-Vedic luminescent neon cyan & golden laser rim
      const grad = ctx.createRadialGradient(x + w / 2, y + h / 2, w * 0.2, x + w / 2, y + h / 2, w * 0.75);
      grad.addColorStop(0, "rgba(0, 240, 255, 0.12)");
      grad.addColorStop(0.7, "transparent");
      grad.addColorStop(1, "rgba(2, 18, 28, 0.7)");
      ctx.fillStyle = grad;
      ctx.fillRect(x, y, w, h);

      // Cyber laser rim line
      ctx.strokeStyle = "rgba(0, 240, 255, 0.5)";
      ctx.lineWidth = 3;
      ctx.strokeRect(x + 4, y + 4, w - 8, h - 8);
      break;
    }

    case "professional-diwali": {
      // Soft executive studio key-light & balanced skin tone clarity
      const grad = ctx.createRadialGradient(x + w * 0.45, y + h * 0.35, w * 0.15, x + w * 0.5, y + h * 0.5, w * 0.7);
      grad.addColorStop(0, "rgba(255, 250, 230, 0.15)");
      grad.addColorStop(0.7, "transparent");
      grad.addColorStop(1, "rgba(12, 16, 24, 0.45)");
      ctx.fillStyle = grad;
      ctx.fillRect(x, y, w, h);
      break;
    }

    case "creative-funny-diwali": {
      // Energetic pop-art boost with vivid festive saturation
      const grad = ctx.createRadialGradient(x + w / 2, y + h / 2, w * 0.2, x + w / 2, y + h / 2, w * 0.75);
      grad.addColorStop(0, "rgba(255, 220, 0, 0.2)");
      grad.addColorStop(0.6, "rgba(255, 50, 100, 0.12)");
      grad.addColorStop(1, "rgba(30, 5, 20, 0.4)");
      ctx.fillStyle = grad;
      ctx.fillRect(x, y, w, h);
      break;
    }
  }
  ctx.restore();
}

// -------------------------------------------------------------
// 1. STYLE: CINEMATIC GOLD
// Grand palace pavilion, golden pillars, heavy floating embers, opulent sunburst arch
// -------------------------------------------------------------
function renderCinematicGold(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  userImg: HTMLImageElement,
  name: string,
  msg: string,
  org?: string
) {
  // Deep warm palace backdrop
  const bg = ctx.createLinearGradient(0, 0, width, height);
  bg.addColorStop(0, "#190e03");
  bg.addColorStop(0.4, "#2c1804");
  bg.addColorStop(0.75, "#3d2206");
  bg.addColorStop(1, "#0f0802");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  // Grand Palace Pillars on Left & Right
  const pillarW = 85;
  const pillarGrad = ctx.createLinearGradient(0, 0, pillarW, 0);
  pillarGrad.addColorStop(0, "rgba(212, 175, 55, 0.1)");
  pillarGrad.addColorStop(0.5, "rgba(245, 192, 66, 0.35)");
  pillarGrad.addColorStop(1, "rgba(100, 70, 15, 0.2)");

  ctx.fillStyle = pillarGrad;
  ctx.fillRect(40, 60, pillarW, height - 120);
  ctx.fillRect(width - 40 - pillarW, 60, pillarW, height - 120);

  // Fluted pillar lines
  ctx.strokeStyle = "rgba(255, 215, 0, 0.25)";
  ctx.lineWidth = 1.5;
  for (let i = 1; i <= 3; i++) {
    ctx.beginPath();
    ctx.moveTo(40 + i * 20, 80);
    ctx.lineTo(40 + i * 20, height - 80);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(width - 40 - pillarW + i * 20, 80);
    ctx.lineTo(width - 40 - pillarW + i * 20, height - 80);
    ctx.stroke();
  }

  // Floating Golden Bokeh Embers
  for (let i = 0; i < 85; i++) {
    const ex = Math.random() * width;
    const ey = Math.random() * height;
    const er = Math.random() * 5 + 1.5;
    const alpha = Math.random() * 0.6 + 0.15;
    ctx.fillStyle = `rgba(255, 215, 0, ${alpha})`;
    ctx.shadowColor = "#ffd700";
    ctx.shadowBlur = er * 2.5;
    ctx.beginPath();
    ctx.arc(ex, ey, er, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.shadowBlur = 0;

  // Portrait Arch Frame (Mughal Pointed Arch)
  const pw = width * 0.58;
  const ph = height * 0.44;
  const px = (width - pw) / 2;
  const py = height * 0.15;

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(px, py + 80);
  ctx.quadraticCurveTo(px + pw * 0.25, py - 30, px + pw * 0.5, py - 60); // Peak
  ctx.quadraticCurveTo(px + pw * 0.75, py - 30, px + pw, py + 80);
  ctx.lineTo(px + pw, py + ph);
  ctx.lineTo(px, py + ph);
  ctx.closePath();
  ctx.clip();

  renderEnhancedUserPhoto(ctx, userImg, px, py - 60, pw, ph + 60, "cinematic-gold");
  ctx.restore();

  // Grand Gold Border on Arch
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(px, py + 80);
  ctx.quadraticCurveTo(px + pw * 0.25, py - 30, px + pw * 0.5, py - 60);
  ctx.quadraticCurveTo(px + pw * 0.75, py - 30, px + pw, py + 80);
  ctx.lineTo(px + pw, py + ph);
  ctx.lineTo(px, py + ph);
  ctx.closePath();
  ctx.strokeStyle = "rgba(255, 215, 0, 0.95)";
  ctx.lineWidth = 7;
  ctx.shadowColor = "rgba(255, 200, 0, 0.8)";
  ctx.shadowBlur = 24;
  ctx.stroke();
  ctx.restore();

  // Top Sunburst & Header
  ctx.save();
  ctx.textAlign = "center";
  ctx.font = "600 22px 'Cinzel', serif, Georgia";
  ctx.fillStyle = "rgba(245, 192, 66, 0.9)";
  ctx.letterSpacing = "6px";
  ctx.fillText("✨ CINEMATIC GOLD EDITION ✨", width / 2, 85);

  ctx.font = "bold 54px 'Cinzel', serif, Georgia";
  const titleGrad = ctx.createLinearGradient(width / 2 - 250, 0, width / 2 + 250, 0);
  titleGrad.addColorStop(0, "#ffffff");
  titleGrad.addColorStop(0.5, "#ffd700");
  titleGrad.addColorStop(1, "#f5a31a");
  ctx.fillStyle = titleGrad;
  ctx.shadowColor = "rgba(255, 215, 0, 0.6)";
  ctx.shadowBlur = 18;
  ctx.fillText("SHUBH DEEPAVALI", width / 2, 145);
  ctx.restore();

  // Bottom Typography
  const textY = py + ph + 65;
  ctx.save();
  ctx.textAlign = "center";
  ctx.font = "bold 56px 'Playfair Display', serif, Georgia";
  ctx.fillStyle = "#fff5cf";
  ctx.shadowColor = "rgba(255, 180, 40, 0.7)";
  ctx.shadowBlur = 16;
  ctx.fillText(name.toUpperCase(), width / 2, textY);

  ctx.font = "italic 30px 'Georgia', serif";
  ctx.fillStyle = "#fcedcf";
  ctx.shadowBlur = 6;
  wrapText(ctx, `"${msg}"`, width / 2, textY + 68, width * 0.76, 42, 3);

  if (org) {
    ctx.font = "600 26px 'Cinzel', serif, Georgia";
    ctx.fillStyle = "rgba(255, 215, 0, 0.9)";
    ctx.fillText(`— With Warm Regards From ${org} —`, width / 2, textY + 175);
  }

  // Double Outer Gold Border
  ctx.strokeStyle = "rgba(212, 175, 55, 0.8)";
  ctx.lineWidth = 3;
  ctx.strokeRect(36, 36, width - 72, height - 72);
  ctx.restore();
}

// -------------------------------------------------------------
// 2. STYLE: ROYAL DIWALI
// Scalloped Rajasthani Jharokha, deep velvet crimson, peacock motif & brass bells
// -------------------------------------------------------------
function renderRoyalDiwali(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  userImg: HTMLImageElement,
  name: string,
  msg: string,
  org?: string
) {
  // Rich Imperial Velvet Crimson Background
  const bg = ctx.createRadialGradient(width / 2, height * 0.4, 80, width / 2, height / 2, width * 0.9);
  bg.addColorStop(0, "#4a0614");
  bg.addColorStop(0.5, "#2d030c");
  bg.addColorStop(1, "#140105");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  // Traditional Stone Jali (Lattice) Background Texture
  ctx.save();
  ctx.strokeStyle = "rgba(212, 175, 55, 0.08)";
  ctx.lineWidth = 1;
  const jaliStep = 45;
  for (let x = 0; x < width; x += jaliStep) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + height, height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x - height, height);
    ctx.stroke();
  }
  ctx.restore();

  // Multi-Scalloped Rajasthani Jharokha Arch
  const pw = width * 0.62;
  const ph = height * 0.44;
  const px = (width - pw) / 2;
  const py = height * 0.17;

  ctx.save();
  ctx.beginPath();
  // 5 Scallop traditional Indian window
  ctx.moveTo(px, py + 100);
  ctx.arc(px + pw * 0.12, py + 40, 40, Math.PI, Math.PI * 1.5);
  ctx.arc(px + pw * 0.32, py + 10, 45, Math.PI * 1.3, Math.PI * 1.8);
  ctx.arc(px + pw * 0.5, py - 10, 45, Math.PI * 1.2, Math.PI * 1.8); // Center top
  ctx.arc(px + pw * 0.68, py + 10, 45, Math.PI * 1.2, Math.PI * 1.7);
  ctx.arc(px + pw * 0.88, py + 40, 40, Math.PI * 1.5, 0);
  ctx.lineTo(px + pw, py + ph);
  ctx.lineTo(px, py + ph);
  ctx.closePath();
  ctx.clip();

  renderEnhancedUserPhoto(ctx, userImg, px, py - 40, pw, ph + 40, "royal-diwali");
  ctx.restore();

  // Ornate Jharokha Border with Brass Filigree
  ctx.save();
  ctx.strokeStyle = "rgba(245, 192, 66, 0.95)";
  ctx.lineWidth = 6;
  ctx.shadowColor = "rgba(255, 190, 40, 0.7)";
  ctx.shadowBlur = 18;
  ctx.beginPath();
  ctx.moveTo(px, py + 100);
  ctx.arc(px + pw * 0.12, py + 40, 40, Math.PI, Math.PI * 1.5);
  ctx.arc(px + pw * 0.32, py + 10, 45, Math.PI * 1.3, Math.PI * 1.8);
  ctx.arc(px + pw * 0.5, py - 10, 45, Math.PI * 1.2, Math.PI * 1.8);
  ctx.arc(px + pw * 0.68, py + 10, 45, Math.PI * 1.2, Math.PI * 1.7);
  ctx.arc(px + pw * 0.88, py + 40, 40, Math.PI * 1.5, 0);
  ctx.lineTo(px + pw, py + ph);
  ctx.lineTo(px, py + ph);
  ctx.closePath();
  ctx.stroke();
  ctx.restore();

  // Hanging Brass Diyas with Chains on both sides
  [px - 35, px + pw + 35].forEach((lampX) => {
    ctx.strokeStyle = "rgba(245, 192, 66, 0.6)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(lampX, 0);
    ctx.lineTo(lampX, py + 160);
    ctx.stroke();

    // Brass diya bell
    ctx.fillStyle = "#e5a93c";
    ctx.beginPath();
    ctx.arc(lampX, py + 175, 18, 0, Math.PI * 2);
    ctx.fill();

    // Flame
    ctx.fillStyle = "#fff070";
    ctx.beginPath();
    ctx.arc(lampX, py + 165, 8, 0, Math.PI * 2);
    ctx.fill();
  });

  // Royal Crest & Calligraphy
  ctx.save();
  ctx.textAlign = "center";
  ctx.font = "700 20px 'Cinzel', serif, Georgia";
  ctx.fillStyle = "rgba(245, 192, 66, 0.85)";
  ctx.letterSpacing = "6px";
  ctx.fillText("👑 IMPERIAL RAJPUTANA HERITAGE 👑", width / 2, 75);

  ctx.font = "bold 50px 'Cinzel', serif, Georgia";
  const rTitleGrad = ctx.createLinearGradient(width / 2 - 250, 0, width / 2 + 250, 0);
  rTitleGrad.addColorStop(0, "#fff2b3");
  rTitleGrad.addColorStop(0.5, "#f5c042");
  rTitleGrad.addColorStop(1, "#b38114");
  ctx.fillStyle = rTitleGrad;
  ctx.shadowColor = "rgba(245, 192, 66, 0.5)";
  ctx.shadowBlur = 15;
  ctx.fillText("ROYAL DIWALI GREETINGS", width / 2, 130);

  const textY = py + ph + 65;
  ctx.font = "bold 54px 'Playfair Display', serif, Georgia";
  ctx.fillStyle = "#fff5cf";
  ctx.fillText(name.toUpperCase(), width / 2, textY);

  ctx.font = "italic 30px 'Georgia', serif";
  ctx.fillStyle = "#fed7aa";
  wrapText(ctx, `"${msg}"`, width / 2, textY + 65, width * 0.78, 42, 3);

  if (org) {
    ctx.font = "600 24px 'Cinzel', serif, Georgia";
    ctx.fillStyle = "#ffd700";
    ctx.fillText(`Presented with Royal Honor by ${org}`, width / 2, textY + 175);
  }

  // Royal Filigree Outer Border
  ctx.strokeStyle = "rgba(245, 192, 66, 0.85)";
  ctx.lineWidth = 4;
  ctx.strokeRect(36, 36, width - 72, height - 72);
  ctx.restore();
}

// -------------------------------------------------------------
// 3. STYLE: TRADITIONAL INDIAN
// Cascading marigold (genda phool) malas, authentic mitti ke diye, sacred floor rangoli
// -------------------------------------------------------------
function renderTraditionalIndian(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  userImg: HTMLImageElement,
  name: string,
  msg: string,
  org?: string
) {
  // Warm terracotta & saffron atmosphere
  const bg = ctx.createLinearGradient(0, 0, width, height);
  bg.addColorStop(0, "#2c0e02");
  bg.addColorStop(0.4, "#451904");
  bg.addColorStop(0.8, "#5c2408");
  bg.addColorStop(1, "#1c0901");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  // Sacred Floor Rangoli at the bottom center
  const rangoliY = height - 120;
  ctx.save();
  ctx.strokeStyle = "rgba(255, 180, 50, 0.35)";
  ctx.lineWidth = 3;
  for (let r = 50; r <= 220; r += 40) {
    ctx.beginPath();
    ctx.arc(width / 2, rangoliY, r, 0, Math.PI * 2);
    ctx.stroke();
  }
  // Rangoli petals
  for (let a = 0; a < Math.PI * 2; a += Math.PI / 8) {
    const rx = width / 2 + Math.cos(a) * 160;
    const ry = rangoliY + Math.sin(a) * 160;
    ctx.fillStyle = a % 2 === 0 ? "#ff8800" : "#ffd700";
    ctx.beginPath();
    ctx.arc(rx, ry, 10, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  // Cascading Marigold Garlands (Genda Phool Malas) on Left, Right & Top
  const drawMarigoldFlower = (fx: number, fy: number, size: number) => {
    ctx.fillStyle = Math.random() > 0.4 ? "#ff7700" : "#ffbb00";
    ctx.beginPath();
    ctx.arc(fx, fy, size, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#ffdd44";
    ctx.beginPath();
    ctx.arc(fx, fy, size * 0.5, 0, Math.PI * 2);
    ctx.fill();
  };

  // Top Garland Arch
  for (let gx = 60; gx <= width - 60; gx += 26) {
    const gy = 55 + Math.sin((gx / width) * Math.PI) * 25;
    drawMarigoldFlower(gx, gy, 14);
  }

  // Left & Right Hanging Garlands
  for (let gy = 80; gy <= height - 140; gy += 28) {
    drawMarigoldFlower(65, gy, 14);
    drawMarigoldFlower(width - 65, gy, 14);
  }

  // Central Portrait Frame with Authentic Toran Arch
  const pw = width * 0.58;
  const ph = height * 0.44;
  const px = (width - pw) / 2;
  const py = height * 0.16;

  ctx.save();
  ctx.beginPath();
  ctx.arc(width / 2, py + pw * 0.5, pw * 0.5, Math.PI, 0); // Top semicircle
  ctx.lineTo(px + pw, py + ph);
  ctx.lineTo(px, py + ph);
  ctx.closePath();
  ctx.clip();

  renderEnhancedUserPhoto(ctx, userImg, px, py, pw, ph, "traditional-indian");
  ctx.restore();

  // Marigold & Terracotta Frame
  ctx.save();
  ctx.beginPath();
  ctx.arc(width / 2, py + pw * 0.5, pw * 0.5, Math.PI, 0);
  ctx.lineTo(px + pw, py + ph);
  ctx.lineTo(px, py + ph);
  ctx.closePath();
  ctx.strokeStyle = "#e57a2c";
  ctx.lineWidth = 6;
  ctx.stroke();

  ctx.strokeStyle = "#ffd700";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();

  // Traditional Devanagari Auspicious Header
  ctx.save();
  ctx.textAlign = "center";
  ctx.font = "bold 56px 'Georgia', serif";
  const tGrad = ctx.createLinearGradient(width / 2 - 200, 0, width / 2 + 200, 0);
  tGrad.addColorStop(0, "#ffe082");
  tGrad.addColorStop(0.5, "#ff9800");
  tGrad.addColorStop(1, "#f57c00");
  ctx.fillStyle = tGrad;
  ctx.fillText("शुभ दीपावली", width / 2, 130);

  // Lower Text
  const textY = py + ph + 65;
  ctx.font = "bold 52px 'Playfair Display', serif, Georgia";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(name.toUpperCase(), width / 2, textY);

  ctx.font = "italic 30px 'Georgia', serif";
  ctx.fillStyle = "#ffe0b2";
  wrapText(ctx, `"${msg}"`, width / 2, textY + 65, width * 0.78, 42, 3);

  if (org) {
    ctx.font = "600 24px 'Georgia', serif";
    ctx.fillStyle = "#ffb74d";
    ctx.fillText(`— सप्रेम भेंट: ${org} —`, width / 2, textY + 175);
  }
  ctx.restore();
}

// -------------------------------------------------------------
// 4. STYLE: LUXURY FESTIVE
// High-fashion Vogue/editorial aesthetic, midnight obsidian, champagne sparkles, sleek geometry
// -------------------------------------------------------------
function renderLuxuryFestive(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  userImg: HTMLImageElement,
  name: string,
  msg: string,
  org?: string
) {
  // Midnight Obsidian Black
  ctx.fillStyle = "#070709";
  ctx.fillRect(0, 0, width, height);

  // Subtle Champagne Dust Gradient
  const luxGrad = ctx.createRadialGradient(width / 2, height * 0.35, 50, width / 2, height / 2, width * 0.85);
  luxGrad.addColorStop(0, "rgba(230, 195, 135, 0.15)");
  luxGrad.addColorStop(0.5, "rgba(35, 30, 42, 0.2)");
  luxGrad.addColorStop(1, "transparent");
  ctx.fillStyle = luxGrad;
  ctx.fillRect(0, 0, width, height);

  // Delicate Champagne Sparkles
  for (let i = 0; i < 90; i++) {
    const sx = Math.random() * width;
    const sy = Math.random() * height;
    const r = Math.random() * 2 + 0.5;
    ctx.fillStyle = Math.random() > 0.5 ? "rgba(255, 240, 210, 0.8)" : "rgba(212, 175, 55, 0.5)";
    ctx.beginPath();
    ctx.arc(sx, sy, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Sleek Faceted Diamond / Hexagonal Frame
  const pw = width * 0.56;
  const ph = height * 0.44;
  const cx = width / 2;
  const cy = height * 0.36;

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(cx - pw / 2 + 40, cy - ph / 2);
  ctx.lineTo(cx + pw / 2 - 40, cy - ph / 2);
  ctx.lineTo(cx + pw / 2, cy - ph / 2 + 40);
  ctx.lineTo(cx + pw / 2, cy + ph / 2 - 40);
  ctx.lineTo(cx + pw / 2 - 40, cy + ph / 2);
  ctx.lineTo(cx - pw / 2 + 40, cy + ph / 2);
  ctx.lineTo(cx - pw / 2, cy + ph / 2 - 40);
  ctx.lineTo(cx - pw / 2, cy - ph / 2 + 40);
  ctx.closePath();
  ctx.clip();

  renderEnhancedUserPhoto(ctx, userImg, cx - pw / 2, cy - ph / 2, pw, ph, "luxury-festive");
  ctx.restore();

  // Razor-Thin Champagne Gold Frame
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(cx - pw / 2 + 40, cy - ph / 2);
  ctx.lineTo(cx + pw / 2 - 40, cy - ph / 2);
  ctx.lineTo(cx + pw / 2, cy - ph / 2 + 40);
  ctx.lineTo(cx + pw / 2, cy + ph / 2 - 40);
  ctx.lineTo(cx + pw / 2 - 40, cy + ph / 2);
  ctx.lineTo(cx - pw / 2 + 40, cy + ph / 2);
  ctx.lineTo(cx - pw / 2, cy + ph / 2 - 40);
  ctx.lineTo(cx - pw / 2, cy - ph / 2 + 40);
  ctx.closePath();
  ctx.strokeStyle = "rgba(235, 205, 150, 0.9)";
  ctx.lineWidth = 3;
  ctx.stroke();

  // Floating Corner Accents
  ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
  ctx.lineWidth = 1;
  ctx.strokeRect(cx - pw / 2 - 12, cy - ph / 2 - 12, pw + 24, ph + 24);
  ctx.restore();

  // Haute-Couture Spaced Typography
  ctx.save();
  ctx.textAlign = "center";
  ctx.font = "300 18px 'Helvetica Neue', sans-serif";
  ctx.fillStyle = "rgba(235, 205, 150, 0.95)";
  ctx.letterSpacing = "10px";
  ctx.fillText("HAUTE JOAILLERIE • FESTIVE 2026", width / 2, 75);

  ctx.font = "bold 58px 'Playfair Display', serif";
  const luxTGrad = ctx.createLinearGradient(width / 2 - 200, 0, width / 2 + 200, 0);
  luxTGrad.addColorStop(0, "#ffffff");
  luxTGrad.addColorStop(0.5, "#e6c387");
  luxTGrad.addColorStop(1, "#c29b53");
  ctx.fillStyle = luxTGrad;
  ctx.fillText("L U X U R Y   D I W A L I", width / 2, 135);

  const textY = cy + ph / 2 + 70;
  ctx.font = "bold 48px 'Playfair Display', serif";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(name.toUpperCase(), width / 2, textY);

  ctx.font = "300 24px 'Helvetica Neue', serif";
  ctx.fillStyle = "#d1c7bd";
  wrapText(ctx, `"${msg}"`, width / 2, textY + 60, width * 0.72, 38, 3);

  if (org) {
    ctx.font = "400 20px 'Helvetica Neue', sans-serif";
    ctx.fillStyle = "#e6c387";
    ctx.letterSpacing = "4px";
    ctx.fillText(`CURATED BY ${org.toUpperCase()}`, width / 2, textY + 165);
  }
  ctx.restore();
}

// -------------------------------------------------------------
// 5. STYLE: MODERN CELEBRATION
// Twilight night sky, floating sky lanterns (kandils), sparkler light trails, joyful party energy
// -------------------------------------------------------------
function renderModernCelebration(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  userImg: HTMLImageElement,
  name: string,
  msg: string,
  org?: string
) {
  // Twilight Sky Gradient (Deep Indigo into Midnight Blue)
  const bg = ctx.createLinearGradient(0, 0, 0, height);
  bg.addColorStop(0, "#0b081e");
  bg.addColorStop(0.4, "#1a123d");
  bg.addColorStop(0.8, "#2d1645");
  bg.addColorStop(1, "#12051c");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  // Floating Sky Lanterns in background
  const drawLantern = (lx: number, ly: number, scale: number) => {
    ctx.save();
    ctx.translate(lx, ly);
    ctx.scale(scale, scale);
    // Outer flame glow
    const g = ctx.createRadialGradient(0, 0, 2, 0, 0, 30);
    g.addColorStop(0, "rgba(255, 230, 100, 0.9)");
    g.addColorStop(0.5, "rgba(255, 120, 20, 0.4)");
    g.addColorStop(1, "transparent");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(0, 0, 30, 0, Math.PI * 2);
    ctx.fill();

    // Paper lantern body
    ctx.fillStyle = "#ff8c1a";
    ctx.beginPath();
    ctx.moveTo(-10, -18);
    ctx.lineTo(10, -18);
    ctx.lineTo(14, 14);
    ctx.lineTo(-14, 14);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  };

  drawLantern(120, 160, 1.1);
  drawLantern(220, 240, 0.8);
  drawLantern(width - 150, 180, 1.2);
  drawLantern(width - 240, 260, 0.7);
  drawLantern(180, 80, 0.6);
  drawLantern(width - 190, 90, 0.6);

  // Circular Celebration Porthole Frame with Sparkling Light Ring
  const radius = width * 0.28;
  const cx = width / 2;
  const cy = height * 0.36;

  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.clip();

  renderEnhancedUserPhoto(ctx, userImg, cx - radius, cy - radius, radius * 2, radius * 2, "modern-celebration");
  ctx.restore();

  // Dynamic Sparkler (Phuljhadi) Ring around circle
  ctx.save();
  ctx.strokeStyle = "rgba(255, 200, 60, 0.9)";
  ctx.lineWidth = 5;
  ctx.shadowColor = "rgba(255, 220, 80, 0.8)";
  ctx.shadowBlur = 20;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.stroke();

  // Radiating sparkler bursts around ring
  for (let a = 0; a < Math.PI * 2; a += Math.PI / 16) {
    const r1 = radius + 4;
    const r2 = radius + Math.random() * 28 + 12;
    const sx1 = cx + Math.cos(a) * r1;
    const sy1 = cy + Math.sin(a) * r1;
    const sx2 = cx + Math.cos(a) * r2;
    const sy2 = cy + Math.sin(a) * r2;

    ctx.strokeStyle = Math.random() > 0.5 ? "#ffd700" : "#ff5722";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(sx1, sy1);
    ctx.lineTo(sx2, sy2);
    ctx.stroke();
  }
  ctx.restore();

  // Modern Typography
  ctx.save();
  ctx.textAlign = "center";
  ctx.font = "bold 20px system-ui, sans-serif";
  ctx.fillStyle = "#ffaa44";
  ctx.letterSpacing = "4px";
  ctx.fillText("LIGHTS • JOY • CELEBRATION", width / 2, 75);

  ctx.font = "black 56px system-ui, sans-serif";
  ctx.fillStyle = "#ffffff";
  ctx.shadowColor = "rgba(255, 160, 40, 0.6)";
  ctx.shadowBlur = 20;
  ctx.fillText("FESTIVE DIWALI NIGHTS", width / 2, 135);

  const textY = cy + radius + 75;
  ctx.font = "bold 52px system-ui, sans-serif";
  ctx.fillStyle = "#ffd54f";
  ctx.fillText(name.toUpperCase(), width / 2, textY);

  ctx.font = "italic 28px 'Georgia', serif";
  ctx.fillStyle = "#f3e5f5";
  wrapText(ctx, `"${msg}"`, width / 2, textY + 60, width * 0.78, 40, 3);

  if (org) {
    ctx.font = "600 22px system-ui, sans-serif";
    ctx.fillStyle = "#ffb74d";
    ctx.fillText(`Celebrated with love by ${org}`, width / 2, textY + 165);
  }
  ctx.restore();
}

// -------------------------------------------------------------
// 6. STYLE: FUTURISTIC DIWALI
// Cyber-Vedic aesthetic, holographic cyan & golden circuits, neon rangoli, cyber lotus diya
// -------------------------------------------------------------
function renderFuturisticDiwali(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  userImg: HTMLImageElement,
  name: string,
  msg: string,
  org?: string
) {
  // Deep Cybernetic Grid Background
  ctx.fillStyle = "#02070c";
  ctx.fillRect(0, 0, width, height);

  // Digital Golden & Cyan Circuit Traces
  ctx.save();
  ctx.strokeStyle = "rgba(0, 240, 255, 0.15)";
  ctx.lineWidth = 1.5;
  const grid = 60;
  for (let x = 0; x < width; x += grid) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += grid) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Glowing circuit nodes
  for (let i = 0; i < 24; i++) {
    const cx = (i * 123) % width;
    const cy = (i * 287) % height;
    ctx.fillStyle = i % 2 === 0 ? "#00f0ff" : "#ffd700";
    ctx.shadowColor = ctx.fillStyle;
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  // Angular Sci-Fi Chamfered Frame
  const pw = width * 0.6;
  const ph = height * 0.44;
  const px = (width - pw) / 2;
  const py = height * 0.16;
  const cut = 35;

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(px + cut, py);
  ctx.lineTo(px + pw - cut, py);
  ctx.lineTo(px + pw, py + cut);
  ctx.lineTo(px + pw, py + ph - cut);
  ctx.lineTo(px + pw - cut, py + ph);
  ctx.lineTo(px + cut, py + ph);
  ctx.lineTo(px, py + ph - cut);
  ctx.lineTo(px, py + cut);
  ctx.closePath();
  ctx.clip();

  renderEnhancedUserPhoto(ctx, userImg, px, py, pw, ph, "futuristic-diwali");
  ctx.restore();

  // Glowing Neon Cyan & Gold Laser Frame
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(px + cut, py);
  ctx.lineTo(px + pw - cut, py);
  ctx.lineTo(px + pw, py + cut);
  ctx.lineTo(px + pw, py + ph - cut);
  ctx.lineTo(px + pw - cut, py + ph);
  ctx.lineTo(px + cut, py + ph);
  ctx.lineTo(px, py + ph - cut);
  ctx.lineTo(px, py + cut);
  ctx.closePath();
  ctx.strokeStyle = "#00f0ff";
  ctx.lineWidth = 4;
  ctx.shadowColor = "#00f0ff";
  ctx.shadowBlur = 18;
  ctx.stroke();

  // Secondary Gold Tech Brackets
  ctx.strokeStyle = "#ffd700";
  ctx.lineWidth = 2;
  ctx.strokeRect(px - 14, py - 14, pw + 28, ph + 28);
  ctx.restore();

  // Cyber-Vedic Typography
  ctx.save();
  ctx.textAlign = "center";
  ctx.font = "bold 18px 'Courier New', monospace";
  ctx.fillStyle = "#00f0ff";
  ctx.letterSpacing = "8px";
  ctx.fillText("// PROTOCOL: CYBER-VEDIC LIGHT //", width / 2, 75);

  ctx.font = "900 54px system-ui, sans-serif";
  const futGrad = ctx.createLinearGradient(width / 2 - 250, 0, width / 2 + 250, 0);
  futGrad.addColorStop(0, "#00f0ff");
  futGrad.addColorStop(0.5, "#ffffff");
  futGrad.addColorStop(1, "#ffd700");
  ctx.fillStyle = futGrad;
  ctx.shadowColor = "#00f0ff";
  ctx.shadowBlur = 20;
  ctx.fillText("DIWALI 3.0", width / 2, 135);

  const textY = py + ph + 65;
  ctx.font = "900 52px system-ui, sans-serif";
  ctx.fillStyle = "#ffffff";
  ctx.shadowColor = "#ffd700";
  ctx.shadowBlur = 15;
  ctx.fillText(name.toUpperCase(), width / 2, textY);

  ctx.font = "400 24px 'Courier New', monospace";
  ctx.fillStyle = "#a5f3fc";
  wrapText(ctx, `> "${msg}"`, width / 2, textY + 60, width * 0.76, 38, 3);

  if (org) {
    ctx.font = "700 20px 'Courier New', monospace";
    ctx.fillStyle = "#facc15";
    ctx.fillText(`SYSTEM INITIATIVE // ${org.toUpperCase()}`, width / 2, textY + 165);
  }
  ctx.restore();
}

// -------------------------------------------------------------
// 7. STYLE: PROFESSIONAL DIWALI
// Sophisticated executive greeting, clean navy/slate, brushed gold geometric accents, LinkedIn/client ready
// -------------------------------------------------------------
function renderProfessionalDiwali(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  userImg: HTMLImageElement,
  name: string,
  msg: string,
  org?: string
) {
  // Deep Executive Slate Navy Background
  const bg = ctx.createLinearGradient(0, 0, width, height);
  bg.addColorStop(0, "#0c1017");
  bg.addColorStop(0.5, "#151b26");
  bg.addColorStop(1, "#0a0d13");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  // Clean Architectural Gold Lines
  ctx.save();
  ctx.strokeStyle = "rgba(212, 175, 55, 0.25)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(100, 160);
  ctx.lineTo(width - 100, 160);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(100, height - 120);
  ctx.lineTo(width - 100, height - 120);
  ctx.stroke();
  ctx.restore();

  // Crisp Executive Portrait Frame
  const pw = width * 0.54;
  const ph = height * 0.44;
  const px = (width - pw) / 2;
  const py = height * 0.18;

  ctx.save();
  ctx.beginPath();
  ctx.rect(px, py, pw, ph);
  ctx.clip();

  renderEnhancedUserPhoto(ctx, userImg, px, py, pw, ph, "professional-diwali");
  ctx.restore();

  // Double Brushed-Gold Border
  ctx.save();
  ctx.strokeStyle = "rgba(212, 175, 55, 0.85)";
  ctx.lineWidth = 3;
  ctx.strokeRect(px, py, pw, ph);

  ctx.strokeStyle = "rgba(212, 175, 55, 0.35)";
  ctx.lineWidth = 1;
  ctx.strokeRect(px - 10, py - 10, pw + 20, ph + 20);
  ctx.restore();

  // Executive Typography
  ctx.save();
  ctx.textAlign = "center";
  ctx.font = "600 18px system-ui, sans-serif";
  ctx.fillStyle = "rgba(212, 175, 55, 0.9)";
  ctx.letterSpacing = "6px";
  ctx.fillText("SEASON'S GREETINGS", width / 2, 85);

  ctx.font = "bold 52px 'Cinzel', serif, Georgia";
  ctx.fillStyle = "#ffffff";
  ctx.fillText("FESTIVE DIWALI WISHES", width / 2, 135);

  const textY = py + ph + 65;
  ctx.font = "bold 50px 'Playfair Display', serif";
  ctx.fillStyle = "#ffd700";
  ctx.fillText(name.toUpperCase(), width / 2, textY);

  ctx.font = "normal 28px system-ui, sans-serif";
  ctx.fillStyle = "#e2e8f0";
  wrapText(ctx, `"${msg}"`, width / 2, textY + 60, width * 0.74, 40, 3);

  if (org) {
    ctx.font = "600 24px system-ui, sans-serif";
    ctx.fillStyle = "#cbd5e1";
    ctx.fillText(`With Warmest Regards From ${org}`, width / 2, textY + 165);
  }

  // Refined Subtle Outer Frame
  ctx.strokeStyle = "rgba(212, 175, 55, 0.4)";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(45, 45, width - 90, height - 90);
  ctx.restore();
}

// -------------------------------------------------------------
// 8. STYLE: CREATIVE FUNNY DIWALI
// Comic book pop-art sunburst, "1000W PATAKHA!" comic badge, colorful confetti, playful cartoon diyas
// -------------------------------------------------------------
function renderCreativeFunnyDiwali(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  userImg: HTMLImageElement,
  name: string,
  msg: string,
  org?: string
) {
  // Vibrant Comic Magenta & Deep Plum Backdrop
  ctx.fillStyle = "#1e0413";
  ctx.fillRect(0, 0, width, height);

  // Comic Action Radial Sunburst Rays
  ctx.save();
  const cx = width / 2;
  const cy = height * 0.38;
  const rayCount = 28;
  for (let i = 0; i < rayCount; i++) {
    const angle1 = (i * 2 * Math.PI) / rayCount;
    const angle2 = ((i + 0.5) * 2 * Math.PI) / rayCount;

    ctx.fillStyle = i % 2 === 0 ? "rgba(255, 77, 109, 0.22)" : "rgba(255, 183, 3, 0.12)";
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(angle1) * width, cy + Math.sin(angle1) * width);
    ctx.lineTo(cx + Math.cos(angle2) * width, cy + Math.sin(angle2) * width);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();

  // Multi-colored Fun Festive Confetti
  for (let i = 0; i < 70; i++) {
    const kx = Math.random() * width;
    const ky = Math.random() * height;
    const colors = ["#ff4d6d", "#ffd166", "#06d6a0", "#118ab2", "#ff9f1c"];
    ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
    ctx.fillRect(kx, ky, 8, 8);
  }

  // Tilted Comic Action Frame for Portrait
  const pw = width * 0.58;
  const ph = height * 0.44;
  const px = (width - pw) / 2;
  const py = height * 0.16;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(-0.04); // Fun subtle comic tilt
  ctx.translate(-cx, -cy);

  // Portrait Drop Shadow
  ctx.fillStyle = "#000000";
  ctx.fillRect(px + 12, py + 12, pw, ph);

  // Clipped Portrait
  ctx.beginPath();
  ctx.rect(px, py, pw, ph);
  ctx.clip();
  renderEnhancedUserPhoto(ctx, userImg, px, py, pw, ph, "creative-funny-diwali");
  ctx.restore();

  // Thick Bold Comic Border
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(-0.04);
  ctx.translate(-cx, -cy);
  ctx.strokeStyle = "#ffd166";
  ctx.lineWidth = 8;
  ctx.strokeRect(px, py, pw, ph);
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 3;
  ctx.strokeRect(px, py, pw, ph);
  ctx.restore();

  // Comic Explosion Action Badge ("1000W PATAKHA!")
  ctx.save();
  const bx = px + pw - 20;
  const by = py + 30;
  ctx.translate(bx, by);
  ctx.rotate(0.18);

  ctx.fillStyle = "#ff0055";
  ctx.beginPath();
  const spikeCount = 14;
  for (let s = 0; s < spikeCount; s++) {
    const sa = (s * 2 * Math.PI) / spikeCount;
    const sr = s % 2 === 0 ? 55 : 36;
    const sx = Math.cos(sa) * sr;
    const sy = Math.sin(sa) * sr;
    if (s === 0) ctx.moveTo(sx, sy);
    else ctx.lineTo(sx, sy);
  }
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = "#ffffff";
  ctx.font = "900 16px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("1000W", 0, -4);
  ctx.font = "900 13px system-ui, sans-serif";
  ctx.fillText("PATAKHA!", 0, 14);
  ctx.restore();

  // Comic Typography
  ctx.save();
  ctx.textAlign = "center";
  ctx.font = "900 24px system-ui, sans-serif";
  ctx.fillStyle = "#ffd166";
  ctx.fillText("💥 BOOM! FULL POWER DIWALI 💥", width / 2, 75);

  const textY = py + ph + 65;
  ctx.font = "900 58px system-ui, sans-serif";
  ctx.fillStyle = "#ffffff";
  ctx.shadowColor = "#ff0055";
  ctx.shadowBlur = 18;
  ctx.fillText(name.toUpperCase(), width / 2, textY);

  ctx.font = "bold 30px system-ui, sans-serif";
  ctx.fillStyle = "#ffe066";
  wrapText(ctx, `"${msg}"`, width / 2, textY + 65, width * 0.78, 42, 3);

  if (org) {
    ctx.font = "bold 24px system-ui, sans-serif";
    ctx.fillStyle = "#06d6a0";
    ctx.fillText(`Certified Blast By ${org}! 🚀`, width / 2, textY + 175);
  }
  ctx.restore();
}

// -------------------------------------------------------------
// MASTER EXPORT COMPOSITOR
// -------------------------------------------------------------
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

  const width = 1200;
  const height = aspectRatio === "9:16" ? 2133 : 1600;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not initialize 2D canvas context");

  const userImg = await loadImage(userPhotoUrl);

  // If external AI background was provided from live API, draw it as base
  if (aiBackgroundUrl) {
    try {
      const aiImg = await loadImage(aiBackgroundUrl);
      ctx.drawImage(aiImg, 0, 0, width, height);
      // Soft ambient veil
      ctx.fillStyle = "rgba(6, 4, 4, 0.25)";
      ctx.fillRect(0, 0, width, height);
    } catch {
      // Fallback to procedural
    }
  }

  // Render dedicated distinct style
  switch (styleId) {
    case "cinematic-gold":
      renderCinematicGold(ctx, width, height, userImg, personName, customMessage, familyOrOrgName);
      break;
    case "royal-diwali":
      renderRoyalDiwali(ctx, width, height, userImg, personName, customMessage, familyOrOrgName);
      break;
    case "traditional-indian":
      renderTraditionalIndian(ctx, width, height, userImg, personName, customMessage, familyOrOrgName);
      break;
    case "luxury-festive":
      renderLuxuryFestive(ctx, width, height, userImg, personName, customMessage, familyOrOrgName);
      break;
    case "modern-celebration":
      renderModernCelebration(ctx, width, height, userImg, personName, customMessage, familyOrOrgName);
      break;
    case "futuristic-diwali":
      renderFuturisticDiwali(ctx, width, height, userImg, personName, customMessage, familyOrOrgName);
      break;
    case "professional-diwali":
      renderProfessionalDiwali(ctx, width, height, userImg, personName, customMessage, familyOrOrgName);
      break;
    case "creative-funny-diwali":
      renderCreativeFunnyDiwali(ctx, width, height, userImg, personName, customMessage, familyOrOrgName);
      break;
    default:
      renderCinematicGold(ctx, width, height, userImg, personName, customMessage, familyOrOrgName);
      break;
  }

  // Auspicious Brand Footer Tag
  ctx.save();
  ctx.textAlign = "center";
  ctx.font = "500 16px system-ui, sans-serif";
  ctx.fillStyle = "rgba(245, 192, 66, 0.65)";
  ctx.letterSpacing = "2px";
  ctx.fillText("AI DIWALI STUDIO  •  PRESENTED BY SHIVAM", width / 2, height - 24);
  ctx.restore();

  return canvas.toDataURL("image/jpeg", 0.94);
}
