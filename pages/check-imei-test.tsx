"use client";

import dynamic from "next/dynamic";

// Dynamic import pou ImeiChecker (client-side only)
const ImeiChecker = dynamic(() => import("../components/ImeiChecker"), { ssr: false });

export default function CheckImeiTestPage() {
  return <ImeiChecker />;
}