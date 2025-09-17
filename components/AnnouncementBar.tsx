// components/AnnouncementBar.tsx
"use client";
import { useEffect, useState } from "react";

/**
 * Non-closable announcement bar (always visible),
 * messages are in English, auto-rotating, pause on hover.
 */
const MESSAGES = [
  "🔥 20% OFF for the first 100 IMEI checks!",
  "⚡ Super fast API — IMEI results in under 2 seconds.",
  "✅ Carrier unlock ordering now available for major networks.",
];

export default function AnnouncementBar() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((v) => (v + 1) % MESSAGES.length), 3000);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <div
      className="sticky top-0 z-50 w-full bg-blue-600 text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
      aria-label="Site announcements"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-center px-4 py-2 text-sm">
        <div className="truncate">{MESSAGES[i]}</div>
      </div>
    </div>
  );
}
