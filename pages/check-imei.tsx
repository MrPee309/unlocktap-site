"use client";

import dynamic from "next/dynamic";

// Dynamic import, ssr false pou ImeiChecker
const ImeiChecker = dynamic(() => import("../components/ImeiChecker"), { ssr: false });

export default function CheckImeiPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Check IMEI – UnlockTap</h1>
      <ImeiChecker />
    </main>
  );
}