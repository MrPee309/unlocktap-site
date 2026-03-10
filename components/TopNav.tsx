"use client";

import Link from "next/link";
import { useState } from "react";
import { User } from "lucide-react";

export default function TopNav() {
  const [open, setOpen] = useState(false);

  // Chanje ak logic verifikasyon itilizatè konekte ou
  const isLoggedIn = false; 

  return (
    <header className="border-b bg-white px-4 py-3 flex justify-between items-center sticky top-0 z-50 backdrop-blur">
      
      {/* Left Menu */}
      <nav className="flex gap-6 text-sm font-medium">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <Link href="/pricing" className="hover:text-blue-600">Pricing</Link>
        <Link href="/order-unlock-test" className="hover:text-blue-600">Order Unlock</Link>
      </nav>

      {/* Right Menu */}
      <div className="flex items-center gap-4 text-sm font-medium">
        {!isLoggedIn ? (
          <>
            <Link href="/login" className="px-3 py-1 border rounded hover:bg-gray-100">Login</Link>
            <Link href="/register" className="px-3 py-1 border rounded hover:bg-gray-100">Register</Link>
          </>
        ) : (
          <div className="relative">
            <button onClick={() => setOpen(!open)}>
              <User size={20} />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow">
                <Link href="/dashboard">
                  <span className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">Dashboard</span>
                </Link>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}