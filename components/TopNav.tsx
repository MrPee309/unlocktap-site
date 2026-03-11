"use client"

import Link from "next/link"
import { FaApple, FaAndroid, FaServer, FaLaptop } from "react-icons/fa"
import { GiRotaryPhone } from "react-icons/gi"
import { useState } from "react"

export default function TopNav() {
  const [mobileMenu, setMobileMenu] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const toggleDropdown = (name: string) => {
    if (openDropdown === name) setOpenDropdown(null)
    else setOpenDropdown(name)
  }

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">

        {/* LEFT MENU */}
        <div className="flex items-center gap-8">

          {/* LOGO */}
          <Link href="/" className="font-bold text-xl text-blue-600">
            UnlockTap
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-6">

            {/* Reseller Pricing */}
            <div 
              className="relative"
              onMouseEnter={() => setOpenDropdown("reseller")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="font-medium hover:text-blue-600 flex items-center gap-1">
                Reseller Pricing ▾
              </button>

              <div
                className={`absolute left-0 top-10 grid grid-cols-3 gap-6 bg-white shadow-xl p-6 w-[700px] rounded-lg z-50 transition-all duration-300 ease-in-out
                  ${openDropdown === "reseller" ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-5 invisible"}
                `}
              >
                <div>
                  <h4 className="font-bold mb-2">Unlock Services</h4>
                  <p className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"><FaApple /> iPhone Unlock</p>
                  <p className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"><FaAndroid /> Samsung Unlock</p>
                  <p className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"><GiRotaryPhone /> Xiaomi Unlock</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Server Services</h4>
                  <p className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"><FaServer /> FRP Remove</p>
                  <p className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"><FaServer /> IMEI Repair</p>
                  <p className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"><FaServer /> Network Unlock</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Rent & Remote</h4>
                  <p className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"><FaLaptop /> Remote GSM Tool</p>
                  <p className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"><FaLaptop /> Remote Unlock</p>
                  <p className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"><FaLaptop /> Remote Repair</p>
                </div>
              </div>
            </div>

            {/* Tutorials */}
            <div 
              className="relative"
              onMouseEnter={() => setOpenDropdown("tutorials")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="font-medium hover:text-blue-600 flex items-center gap-1">
                Tutorials ▾
              </button>

              <div
                className={`absolute left-0 top-10 grid grid-cols-3 gap-6 bg-white shadow-xl p-6 w-[700px] rounded-lg z-50 transition-all duration-300 ease-in-out
                  ${openDropdown === "tutorials" ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-5 invisible"}
                `}
              >
                <div>
                  <h4 className="font-bold mb-2">Apple Tools</h4>
                  <p className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"><FaApple /> iRemoval</p>
                  <p className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"><FaApple /> iRemove Tools</p>
                  <p className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"><FaApple /> MacOS MDM Bypass</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Android Tools</h4>
                  <p className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"><FaAndroid /> HFZ Tool</p>
                  <p className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"><FaAndroid /> iKey Tool</p>
                  <p className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"><FaAndroid /> LPRO Tool</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Advanced Tools</h4>
                  <p className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"><FaServer /> MINA Tool</p>
                  <p className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"><FaServer /> SMD Tool</p>
                </div>
              </div>
            </div>

            {/* Links */}
            <Link href="/plans" className="font-medium hover:text-blue-600">Reseller Plans</Link>
            <Link href="/terms" className="font-medium hover:text-blue-600">Terms</Link>
          </div>

        </div>

        {/* RIGHT MENU */}
        <div className="flex items-center gap-4">

          {/* Search Bar */}
          <input 
            type="text" 
            placeholder="Search services..." 
            className="hidden md:block border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Login/Register */}
          <Link href="/login" className="font-medium hover:text-blue-600">Login</Link>
          <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Register</Link>

          {/* MOBILE MENU BUTTON */}
          <button 
            className="md:hidden p-2 rounded-md border border-gray-300"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            ☰
          </button>
        </div>

      </div>

      {/* MOBILE MENU */}
      <div className={`md:hidden bg-white border-t shadow-md transition-all duration-300 ease-in-out ${mobileMenu ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
        <div className="flex flex-col p-4 gap-3">

          <button 
            className="text-left font-medium"
            onClick={() => toggleDropdown("reseller")}
          >
            Reseller Pricing ▾
          </button>
          {openDropdown === "reseller" && (
            <div className="pl-4 flex flex-col gap-2">
              <p className="hover:text-blue-600 cursor-pointer">iPhone Unlock</p>
              <p className="hover:text-blue-600 cursor-pointer">Samsung Unlock</p>
              <p className="hover:text-blue-600 cursor-pointer">Xiaomi Unlock</p>
            </div>
          )}

          <button 
            className="text-left font-medium"
            onClick={() => toggleDropdown("tutorials")}
          >
            Tutorials ▾
          </button>
          {openDropdown === "tutorials" && (
            <div className="pl-4 flex flex-col gap-2">
              <p className="hover:text-blue-600 cursor-pointer">iRemoval</p>
              <p className="hover:text-blue-600 cursor-pointer">HFZ Tool</p>
            </div>
          )}

          <Link href="/plans" className="font-medium hover:text-blue-600">Reseller Plans</Link>
          <Link href="/terms" className="font-medium hover:text-blue-600">Terms</Link>
          <Link href="/login" className="font-medium hover:text-blue-600">Login</Link>
          <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Register</Link>
        </div>
      </div>
    </header>
  )
}