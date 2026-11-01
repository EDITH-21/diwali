"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-[#060404] text-[#fcedcf] p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
        <button
          onClick={() => reset()}
          className="btn-gold-glow px-4 py-2 rounded-lg text-sm"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
