import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Diwali Studio — Presented by Aadrut | Your Photo. Your Festive Story.",
  description: "Transform your photograph into 5–8 stunning personalized AI Diwali posters and experience an interactive Diwali greeting with festive surprises. Powered by Aadrut.",
  keywords: ["AI Diwali Studio", "Aadrut", "Diwali Posters", "Personalized Diwali Greetings", "Festive AI Art", "Happy Diwali 2026"],
  authors: [{ name: "Aadrut" }],
  openGraph: {
    title: "AI Diwali Studio — Presented by Aadrut",
    description: "Make this Diwali unforgettable. Turn your photograph into stunning personalized festive memories with AI.",
    siteName: "AI Diwali Studio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#060404] text-[#fcedcf] antialiased selection:bg-[#d4af37]/30 selection:text-[#ffd700]">
        {children}
      </body>
    </html>
  );
}
