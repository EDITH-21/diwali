# AI Diwali Studio — Presented by Aadrut
> **"Your Photo. Your Festive Story."**

A festive, production-ready web application developed with **Next.js**, **React 19**, **TypeScript**, and **Tailwind CSS**. It allows users to upload a portrait photograph and transform it into 5–8 personalized, high-definition AI Diwali posters, followed by an interactive full-screen Diwali greeting and a hilarious surprise cartoon finale.

---

## ✨ Features

- **8 Curated Festive Styles:**
  1. *Cinematic Gold* — Golden hour festive rim lighting & palace embers.
  2. *Royal Diwali* — Rajasthani & Mughal royal archways with velvet crimson.
  3. *Traditional Indian* — Earthen *mitti ke diye*, marigold garlands & sacred rangoli.
  4. *Luxury Festive* — Haute-couture midnight black with champagne sparkles.
  5. *Modern Celebration* — Twilight night sky with floating lanterns and sparklers.
  6. *Futuristic Diwali* — Cyber-Vedic golden neon circuitry & holographic diyas.
  7. *Professional Diwali* — Refined corporate studio lighting for LinkedIn & clients.
  8. *Creative Funny Diwali* — Energetic *1000W Patakha* comic sparkles.
- **Collection Options:** Select between **5 Posters** or **8 Posters**.
- **Personalization:** Customized with your name, custom greeting message, and optional organization/family signature.
- **Ultra-HD Browser-Side Compositor:** High-resolution 1200×1600 output with gold foil calligraphy, borders, and glowing diyas.
- **Dual AI Engine Architecture:** Configurable backend API (`/api/generate-poster`) supporting Gemini, Hugging Face Flux, and OpenAI DALL-E, alongside an offline procedural Studio Compositor.
- **Interactive Greeting Screen:** Full-screen celebration with tap-to-ignite fireworks, golden dust particles, and interactive diyas.
- **Funny Cartoon Surprise:** A 6-scene animated cartoon featuring *Chintu* and the *9000W Super-Patakha*, complete with Web Audio API sound effects.
- **Sharing & Exporting:** One-click WhatsApp sharing, Instagram Story formatting, individual HD downloads, and batch **Download All (ZIP)**.
- **Privacy-First:** Ephemeral in-browser processing with zero permanent storage of user photographs.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (tested on Node v24)
- npm or pnpm

### Installation

```bash
git clone https://github.com/EDITH-21/diwali.git
cd diwali
npm install
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3005](http://localhost:3005) in your browser.

### Building for Production

```bash
npm run build
npm start
```

---

## 🔒 Environment Variables (Optional)

To enable external cloud AI models instead of the default offline Studio Compositor, add:

```env
GEMINI_API_KEY=your_key_here
# or
HUGGINGFACE_API_KEY=your_key_here
# or
OPENAI_API_KEY=your_key_here
```

---

## 📜 Brand Credit

Presented by **Aadrut**.  
Crafting elegant artificial intelligence, spatial computing, and digital festive artistry.
