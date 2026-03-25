"use client";

import dynamic from "next/dynamic";

const ImeiChecker = dynamic(() => import("../components/ImeiChecker"), { ssr: false });

export default function CheckImeiPage() {
  return (
    <main className="p-6">
      <h1>Check IMEI</h1>
      <ImeiChecker />
    </main>
  );
}
