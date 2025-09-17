// components/TopNav.tsx
"use client";
import Link from "next/link";
import { useState } from "react";

export default function TopNav() {
  const [open, setOpen] = useState(false);
  const nav = [
    { href: "/check", label: "Check IMEI" },
    { href: "/order-unlock", label: "Order Unlock" },
    { href: "/pricing", label: "Pricing" },
  ];
  const auth = [
    { href: "/auth/login", label: "Login" },
    { href: "/auth/register", label: "Register" },
  ];
  return (
    <header className="sticky top-10 z-40 w-full border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="inline-flex items-center gap-2">
          <img src="/unlock-logo.svg" alt="UnlockTap.pro" className="h-7 w-auto" />
          <span className="sr-only">UnlockTap.pro</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {nav.map(i => (
            <Link key={i.href} href={i.href} className="text-sm text-gray-700 hover:text-gray-900">
              {i.label}
            </Link>
          ))}
          {auth.map(i => (
            <Link key={i.href} href={i.href} className="rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50">
              {i.label}
            </Link>
          ))}
        </nav>
        <button onClick={() => setOpen(v=>!v)} className="md:hidden rounded-md border px-3 py-2 text-sm">
          Menu ▾
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t bg-white">
          <nav className="mx-auto grid max-w-6xl gap-1 px-4 py-3">
            {[...nav, ...auth].map(i => (
              <Link key={i.href} href={i.href} onClick={() => setOpen(false)} className="rounded-md px-3 py-2 hover:bg-gray-50">
                {i.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
