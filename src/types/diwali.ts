export type PosterStyleId =
  | "cinematic-gold"
  | "royal-diwali"
  | "traditional-indian"
  | "luxury-festive"
  | "modern-celebration"
  | "futuristic-diwali"
  | "professional-diwali"
  | "creative-funny-diwali";

export interface DiwaliStyleConfig {
  id: PosterStyleId;
  name: string;
  tagline: string;
  description: string;
  badge: string;
  accentColor: string;
  bgGradient: string;
  themeNotes: string;
  samplePrompt: string;
}

export interface UserPersonalization {
  personName: string;
  customMessage: string;
  familyOrOrgName?: string;
  posterCount: 5 | 8;
  selectedStyles: PosterStyleId[];
}

export interface GeneratedPoster {
  id: string;
  styleId: PosterStyleId;
  styleName: string;
  imageUrl: string;
  personName: string;
  customMessage: string;
  familyOrOrgName?: string;
  timestamp: number;
}

export const DIWALI_STYLES: DiwaliStyleConfig[] = [
  {
    id: "cinematic-gold",
    name: "Cinematic Gold",
    tagline: "Golden Hour Festive Glow",
    description: "Dramatic cinematic rim-lighting, floating golden bokeh embers, and warm opulent palace palace aesthetic.",
    badge: "Most Popular",
    accentColor: "#ffd700",
    bgGradient: "linear-gradient(135deg, #1f1406 0%, #3d2605 50%, #0d0903 100%)",
    themeNotes: "Warm amber lighting, soft smoke, bokeh golden lights, grand architecture backdrop",
    samplePrompt: "Cinematic golden hour Diwali portrait, warm golden bokeh, majestic glowing diyas, opulent palace courtyard",
  },
  {
    id: "royal-diwali",
    name: "Royal Diwali",
    tagline: "Imperial Rajasthani Splendor",
    description: "Regal Mughal & Rajasthani palace archways, deep velvet maroons, peacock motifs, and ornate antique brass diyas.",
    badge: "Heritage",
    accentColor: "#f5c042",
    bgGradient: "linear-gradient(135deg, #2b050d 0%, #4a0d18 50%, #150207 100%)",
    themeNotes: "Mughal jharokha arches, royal velvet crimson, antique brass lamps, grand heritage",
    samplePrompt: "Royal Indian heritage portrait, velvet crimson background, ornate golden jharokha arch, antique diyas",
  },
  {
    id: "traditional-indian",
    name: "Traditional Indian",
    tagline: "Authentic Mitti ke Diye & Marigolds",
    description: "Rich garlands of fresh marigold flowers (genda phool), glowing earthen mitti ke diye, and vibrant floor rangoli.",
    badge: "Authentic",
    accentColor: "#ff8c38",
    bgGradient: "linear-gradient(135deg, #2a1102 0%, #451b05 50%, #150901 100%)",
    themeNotes: "Vibrant yellow-orange marigold malas, clay oil lamps, auspicious kumkum and haldi touches",
    samplePrompt: "Traditional authentic Indian Diwali setting, vibrant marigold floral garlands, authentic earthen clay lamps, colorful rangoli",
  },
  {
    id: "luxury-festive",
    name: "Luxury Festive",
    tagline: "High-Fashion Midnight & Champagne",
    description: "Minimalist haute-couture aesthetic with deep obsidian black, champagne gold sparkles, and sleek designer diya silhouettes.",
    badge: "Editorial",
    accentColor: "#e6c387",
    bgGradient: "linear-gradient(135deg, #0e0e12 0%, #1d1b24 50%, #08080a 100%)",
    themeNotes: "Vogue-style festive lighting, sleek metallic accents, champagne shimmer, ultra-modern luxury",
    samplePrompt: "Luxury high-fashion editorial Diwali portrait, champagne gold dust, minimalist designer diya, deep obsidian aesthetic",
  },
  {
    id: "modern-celebration",
    name: "Modern Celebration",
    tagline: "Sky Lanterns & Festive Joy",
    description: "Hundreds of glowing sky lanterns drifting into twilight skies with rooftop sparkler celebrations and family warmth.",
    badge: "Joyful",
    accentColor: "#ffaa33",
    bgGradient: "linear-gradient(135deg, #110e26 0%, #201742 50%, #090714 100%)",
    themeNotes: "Twilight night sky, floating lanterns, rooftop city sparkle, joyful festive atmosphere",
    samplePrompt: "Modern Diwali celebration, floating sky lanterns in twilight sky, joyous festive lights, warm celebratory atmosphere",
  },
  {
    id: "futuristic-diwali",
    name: "Futuristic Diwali",
    tagline: "Cyber-Vedic & Holographic Diya",
    description: "Neo-traditional cyberpunk aesthetic with glowing golden neon rangoli circuitry, holographic diyas, and luminescent sparkles.",
    badge: "Next-Gen",
    accentColor: "#00f0ff",
    bgGradient: "linear-gradient(135deg, #05141e 0%, #0d2838 50%, #02080d 100%)",
    themeNotes: "Holographic light mandalas, cyber golden circuits, futuristic neon diyas, high-tech festive aura",
    samplePrompt: "Futuristic sci-fi Diwali portrait, glowing holographic lotus diya, luminous golden neon circuits, cyber-vedic elegance",
  },
  {
    id: "professional-diwali",
    name: "Professional Diwali",
    tagline: "Refined Corporate & Executive",
    description: "Clean, elegant executive backdrop with tasteful warm lighting, subtle gold geometric accents, ideal for LinkedIn & clients.",
    badge: "Business",
    accentColor: "#d4af37",
    bgGradient: "linear-gradient(135deg, #12141a 0%, #1c222e 50%, #0b0d12 100%)",
    themeNotes: "Polished studio executive lighting, tasteful golden geometric framing, sophisticated festive greeting",
    samplePrompt: "Executive professional Diwali portrait, sophisticated festive studio lighting, refined golden geometric motifs",
  },
  {
    id: "creative-funny-diwali",
    name: "Creative Funny Diwali",
    tagline: "Patakha Energy & Comic Sparkles",
    description: "Energetic, quirky festive vibe with comic-style sparkles, cute animated diya sidekicks, and playful '1000W Patakha' humor.",
    badge: "Fun & Quirky",
    accentColor: "#ff4d6d",
    bgGradient: "linear-gradient(135deg, #260718 0%, #420f2c 50%, #12030b 100%)",
    themeNotes: "Comic-style energy bursts, playful sparklers, cute mini diya characters, joyous energetic mood",
    samplePrompt: "Playful energetic Diwali celebration portrait, festive comic sparkles, cute friendly glowing diyas, fun festive vibe",
  },
];

export const DEFAULT_MESSAGES = [
  "Wishing you a festival full of sweet memories, glowing lights, and endless prosperity!",
  "May the divine glow of Diwali fill your life with happiness, peace, and good health.",
  "May your year be as bright and vibrant as the Diwali night sky! Happy Diwali!",
  "Lighting up your feed with love, laughter, and festival cheer! Happy Diwali!",
  "May Goddess Lakshmi bless you with boundless success, wealth, and warmth this year.",
];
