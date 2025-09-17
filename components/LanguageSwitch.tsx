// components/LanguageSwitch.tsx
"use client";
import { useEffect, useState } from "react";

/**
 * Simple language switcher (client-side)
 * Saves choice to localStorage("lang") and reloads page.
 * You can later connect this with your i18n solution.
 */
const SUPPORTED = [
  { code: "en", label: "English" },
  { code: "ht", label: "Kreyòl" },
  { code: "fr", label: "Français" },
  // add more if needed
];

export default function LanguageSwitch() {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("lang") : null;
    if (saved) setLang(saved);
  }, []);

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const val = e.target.value;
    setLang(val);
    try { localStorage.setItem("lang", val); } catch {}
    // You can replace this with a router push if using next-intl/next-i18next
    window.location.reload();
  }

  return (
    <label className="inline-flex items-center gap-2 text-sm text-gray-700">
      <span className="sr-only">Language</span>
      <select
        value={lang}
        onChange={onChange}
        className="rounded-md border px-2 py-1.5 text-sm bg-white"
        aria-label="Change language"
      >
        {SUPPORTED.map(l => (
          <option key={l.code} value={l.code}>{l.label}</option>
        ))}
      </select>
    </label>
  );
}
