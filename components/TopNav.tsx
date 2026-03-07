"use client";

import Link from "next/link";
import { useState } from "react";
import { User } from "lucide-react";

export default function TopNav() {
  const [open, setOpen] = useState(false);

  const isLoggedIn = false; 

  return (
    <header className="border-b bg-white px-4 py-3 flex justify-between items-center sticky top-0 z-50 backdrop-blur">

      {/* Left Menu */}
      <div className="flex gap-6 text-sm font-medium">
        <Link href="/">Home</Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="/order">Order Unlock</Link>
      </div>

      {/* Right Menu */}
      <div className="flex items-center gap-4 text-sm font-medium">

        {!isLoggedIn ? (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        ) : (
          <div className="relative">
            <button onClick={() => setOpen(!open)}>
              <User size={20} />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow">
                <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100">
                  Dashboard
                </Link>

                <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </header>
  );
}
