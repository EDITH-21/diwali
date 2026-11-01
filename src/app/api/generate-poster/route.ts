import { NextRequest, NextResponse } from "next/server";
import { DIWALI_STYLES, PosterStyleId } from "@/types/diwali";

// Highly differentiated prompts tailored to each of the 8 distinct styles
const STYLE_PROMPTS: Record<PosterStyleId, string> = {
  "cinematic-gold":
    "Epic golden-hour Indian palace terrace, grand sandstone pillars, glowing brass urns, floating warm gold embers, majestic royal archway, 85mm cinematic photography, warm gold rim-lighting.",
  "royal-diwali":
    "Imperial Rajasthani Jharokha stone window with scalloped arches, deep crimson velvet background, peacock feather motifs, antique hanging brass temple bells, heritage Rajputana regal portrait.",
  "traditional-indian":
    "Authentic festive Indian courtyard draped with lush orange and yellow marigold flower garlands (genda phool), dozens of earthen clay mitti ke diye, colorful sacred mandala rangoli, warm natural festival glow.",
  "luxury-festive":
    "High-fashion Vogue editorial Diwali portrait, midnight obsidian black and champagne gold dust, sleek faceted geometric diamond framing, dramatic rim studio lighting, haute couture elegance.",
  "modern-celebration":
    "Twilight festival night sky with hundreds of floating glowing sky lanterns (kandils), vibrant handheld sparklers creating dynamic golden light trails, joyful celebration bokeh.",
  "futuristic-diwali":
    "Cyber-Vedic sci-fi Diwali portrait, glowing neon cyan and gold electric circuitry rangoli, holographic floating lotus diya, futuristic angular framing, cybernetic festive ambiance.",
  "professional-diwali":
    "Refined corporate executive Diwali celebration, deep slate navy textured studio backdrop with architectural brushed gold geometric lines, subtle micro-diyas, sophisticated elegance.",
  "creative-funny-diwali":
    "Energetic pop-art comic Diwali celebration, dynamic radial action sunburst rays, colorful flying confetti explosion, playful cartoon sparklers, 1000W patakha festive energy.",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userPhotoUrl, styleId, personName, customMessage, provider = "auto" } = body;

    // Input Validation
    if (!userPhotoUrl || typeof userPhotoUrl !== "string") {
      return NextResponse.json(
        { success: false, error: "Valid photograph is required." },
        { status: 400 }
      );
    }

    if (!personName || typeof personName !== "string" || personName.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Person's name is required." },
        { status: 400 }
      );
    }

    const style = DIWALI_STYLES.find((s) => s.id === styleId);
    if (!style) {
      return NextResponse.json(
        { success: false, error: `Invalid style selection: ${styleId}` },
        { status: 400 }
      );
    }

    // Check for configured AI Provider Keys in environment variables
    const geminiKey = process.env.GEMINI_API_KEY;
    const hfKey = process.env.HUGGINGFACE_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;
    const falKey = process.env.FAL_KEY;

    const hasApiKey = Boolean(geminiKey || hfKey || openaiKey || falKey);

    // If API key is available, call the configured AI provider
    if (hasApiKey && provider !== "demo") {
      try {
        const specificStylePrompt =
          STYLE_PROMPTS[styleId as PosterStyleId] || style.samplePrompt;
        const festivePrompt = `Ultra-realistic portrait of ${personName.trim()} celebrating Diwali. ${specificStylePrompt} 8k resolution, photorealistic, intricate festive details.`;

        // 1. Hugging Face Flux / SDXL
        if (hfKey) {
          const hfRes = await fetch(
            "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell",
            {
              headers: {
                Authorization: `Bearer ${hfKey}`,
                "Content-Type": "application/json",
              },
              method: "POST",
              body: JSON.stringify({ inputs: festivePrompt }),
            }
          );

          if (hfRes.ok) {
            const buffer = await hfRes.arrayBuffer();
            const base64 = Buffer.from(buffer).toString("base64");
            const mimeType = hfRes.headers.get("content-type") || "image/jpeg";
            const generatedDataUrl = `data:${mimeType};base64,${base64}`;

            return NextResponse.json({
              success: true,
              mode: "ai-live",
              provider: "huggingface-flux",
              aiImageUrl: generatedDataUrl,
              styleId,
              message: `Generated via AI provider with unique ${style.name} composition`,
            });
          }
        }

        // 2. OpenAI DALL-E 3
        if (openaiKey) {
          const oaiRes = await fetch("https://api.openai.com/v1/images/generations", {
            headers: {
              Authorization: `Bearer ${openaiKey}`,
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
              prompt: festivePrompt,
              model: "dall-e-3",
              n: 1,
              size: "1024x1792",
              response_format: "b64_json",
            }),
          });

          if (oaiRes.ok) {
            const oaiData = await oaiRes.json();
            const b64 = oaiData.data?.[0]?.b64_json;
            if (b64) {
              return NextResponse.json({
                success: true,
                mode: "ai-live",
                provider: "openai-dalle3",
                aiImageUrl: `data:image/png;base64,${b64}`,
                styleId,
                message: `Generated via DALL-E 3 with unique ${style.name} composition`,
              });
            }
          }
        }
      } catch (aiErr) {
        console.warn("AI Provider call failed, falling back to distinct Studio Compositor:", aiErr);
      }
    }

    // Working Demo Mode:
    // Every style has its own dedicated geometric architecture, photo enhancement shader,
    // and distinct festive ornaments rendered crisply at 1200x1600.
    return NextResponse.json({
      success: true,
      mode: "demo",
      provider: "studio-compositor",
      styleId,
      message: `Studio Compositor: Unique ${style.name} composition with tailored photo enhancement active.`,
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "Internal generation error";
    return NextResponse.json(
      { success: false, error: errMessage },
      { status: 500 }
    );
  }
}
