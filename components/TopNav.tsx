import Link from "next/link";
import { useState } from "react";

export default function TopNav() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/pricing", label: "Pricing" },
    { href: "/docs", label: "Docs" },
  ];

  const authItems = [
    { href: "/auth/login", label: "Login" },
    { href: "/auth/register", label: "Register" },
  ];

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="inline-flex items-center gap-2">
          <img src="/logo.svg" alt="UnlockTap" className="h-7 w-auto" />
          <span className="sr-only">UnlockTap</span>
        </Link>

        {/* Desktop menu */}
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((i) => (
            <Link key={i.href} href={i.href} className="text-sm hover:underline">
              {i.label}
            </Link>
          ))}
          {authItems.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className="rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50"
            >
              {i.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden inline-flex items-center rounded-md border px-3 py-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Open menu"
        >
          Menu ▾
        </button>
      </div>

      {open && (
        <div className="border-t bg-white md:hidden">
          <nav className="mx-auto grid max-w-6xl gap-1 px-4 py-3">
            {[...navItems, ...authItems].map((i) => (
              <Link
                key={i.href}
                href={i.href}
                className="rounded-md px-3 py-2 hover:bg-gray-50"
                onClick={() => setOpen(false)}
              >
                {i.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
