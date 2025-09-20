// components/TopNav.tsx
import Link from "next/link";

export default function TopNav() {
  return (
    <nav className="w-full bg-white/90 backdrop-blur border-b border-slate-100 sticky top-0 z-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex h-14 items-center justify-between">
        <Link href="/" className="text-xl font-semibold tracking-tight">UnlockTap</Link>
        <div className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/#check" className="hover:text-slate-900 text-slate-600">Check IMEI</Link>
          <Link href="/order-unlock" className="hover:text-slate-900 text-slate-600">Order Unlock</Link>
          <Link href="/pricing" className="hover:text-slate-900 text-slate-600">Pricing</Link>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/login" className="text-slate-600 hover:text-slate-900">Login</Link>
          <Link href="/register" className="inline-flex items-center rounded-md bg-slate-900 px-3 py-1.5 text-white hover:bg-slate-800">Register</Link>
        </div>
      </div>
    </nav>
  );
}
