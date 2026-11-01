import Link from "next/link";
import { Flame } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#060404] text-[#fcedcf] flex flex-col items-center justify-center p-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center mb-4">
        <Flame className="w-8 h-8 text-amber-400 animate-pulse" />
      </div>
      <h1 className="text-4xl font-extrabold gold-gradient-text font-serif mb-2">404</h1>
      <p className="text-amber-200/70 text-sm mb-6">Page not found</p>
      <Link href="/" className="btn-gold-glow px-6 py-2.5 rounded-xl text-sm font-semibold">
        Return Home
      </Link>
    </div>
  );
}
