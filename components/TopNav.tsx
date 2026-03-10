"use client";

import Link from "next/link";
import { useState } from "react";

export default function TopNav() {
  const [resellerOpen, setResellerOpen] = useState(false);
  const [tutorialOpen, setTutorialOpen] = useState(false);

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">

        {/* LEFT MENU */}
        <nav className="flex gap-6 items-center text-sm font-medium">

          {/* Reseller Pricing */}
          <div
            className="relative"
            onMouseEnter={() => setResellerOpen(true)}
            onMouseLeave={() => setResellerOpen(false)}
          >
            <button className="hover:text-blue-600">
              Reseller Pricing ▾
            </button>

            {resellerOpen && (
              <div className="absolute top-6 left-0 bg-white border rounded shadow w-52">
                <Link href="/unlock-service" className="block px-4 py-2 hover:bg-gray-100">
                  Unlock Service
                </Link>
                <Link href="/server-service" className="block px-4 py-2 hover:bg-gray-100">
                  Server Service
                </Link>
                <Link href="/rent-remote-service" className="block px-4 py-2 hover:bg-gray-100">
                  Rent & Remote Service
                </Link>
              </div>
            )}
          </div>

          {/* Tutorial */}
          <div
            className="relative"
            onMouseEnter={() => setTutorialOpen(true)}
            onMouseLeave={() => setTutorialOpen(false)}
          >
            <button className="hover:text-blue-600">
              Tutorial ▾
            </button>

            {tutorialOpen && (
              <div className="absolute top-6 left-0 bg-white border rounded shadow w-56">
                <Link href="/tutorial/iremoval" className="block px-4 py-2 hover:bg-gray-100">iRemoval</Link>
                <Link href="/tutorial/iremove" className="block px-4 py-2 hover:bg-gray-100">iRemove</Link>
                <Link href="/tutorial/hfz" className="block px-4 py-2 hover:bg-gray-100">HFZ</Link>
                <Link href="/tutorial/ikey" className="block px-4 py-2 hover:bg-gray-100">iKey</Link>
                <Link href="/tutorial/lpro" className="block px-4 py-2 hover:bg-gray-100">LPro</Link>
                <Link href="/tutorial/mina" className="block px-4 py-2 hover:bg-gray-100">MINA</Link>
                <Link href="/tutorial/smd" className="block px-4 py-2 hover:bg-gray-100">SMD</Link>
                <Link href="/tutorial/macos-mdm" className="block px-4 py-2 hover:bg-gray-100">MacOS MDM Bypass</Link>
              </div>
            )}
          </div>

          {/* Other Links */}
          <Link href="/reseller-plans" className="hover:text-blue-600">
            Reseller's Plans
          </Link>

          <Link href="/terms" className="hover:text-blue-600">
            Terms & Conditions
          </Link>

        </nav>

        {/* RIGHT MENU */}
        <div className="flex gap-4 text-sm font-medium">
          <Link href="/login" className="hover:text-blue-600">
            Login
          </Link>

          <Link
            href="/register"
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
          >
            Register
          </Link>
        </div>

      </div>
    </header>
  );
}