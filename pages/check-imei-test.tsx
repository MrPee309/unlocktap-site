"use client";

import dynamic from "next/dynamic";

// Dynamic import pou component ki depann sou session
const CheckIMEIUnlockTap = dynamic(
  () => import("../components/CheckIMEIUnlockTap"),
  { ssr: false } // Pap eseye render sou server, totalman client-side
);

export default function CheckImeiTestPage() {
  return <CheckIMEIUnlockTap />;
}