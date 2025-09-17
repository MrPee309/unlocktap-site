// components/AnnouncementBar.tsx
"use client";
import { useEffect, useState } from "react";

const MESSAGES = [
  "🔥 20% OFF sou premye 100 verifikasyon IMEI!",
  "⚡ API vit: Check IMEI an mwens pase 2s.",
  "🎯 Order Unlock disponib pou gwo operatè yo.",
];

export default function AnnouncementBar() {
  const [i, setI] = useState(0);
  const [open, setOpen] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || !open) return;
    const id = setInterval(() => setI((v) => (v + 1) % MESSAGES.length), 3000);
    return () => clearInterval(id);
  }, [paused, open]);

  if (!open) return null;

  return (
    <div
      className="sticky top-0 z-50 w-full bg-blue-600 text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 text-sm">
        <div className="truncate">{MESSAGES[i]}</div>
        <button
          aria-label="Close"
          className="rounded px-2 py-1 text-white/80 hover:text-white"
          onClick={() => setOpen(false)}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
