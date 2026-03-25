"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { auth } from "@/lib/firebaseClient"; // ✅ chanje path pou @
import { onAuthStateChanged, signOut, User } from "firebase/auth";

export default function TopNav() {
  const [user, setUser] = useState<User | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const [showClientArea, setShowClientArea] = useState(false);
  const [showPlaceOrder, setShowPlaceOrder] = useState(false);
  const [showOrderHistory, setShowOrderHistory] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const hoverTimeout = useRef<any>(null); // ✅ fix timeout bug

  // Mete user apre login
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowClientArea(false);
        setShowPlaceOrder(false);
        setShowOrderHistory(false);
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEnter = (set: any) => {
    if (window.innerWidth > 768) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = setTimeout(() => set(true), 120);
    }
  };

  const handleLeave = (set: any) => {
    if (window.innerWidth > 768) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = setTimeout(() => set(false), 120);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <Link href="/" className="font-bold text-xl text-blue-600">UnlockTap</Link>

        <div className="flex items-center gap-4" ref={menuRef}>
          {!user ? (
            <>
              <Link href="/login" className="font-medium hover:text-blue-600">Login</Link>
              <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Register</Link>
            </>
          ) : (
            <>
              {/* CLIENT AREA */}
              <div
                className="relative"
                onMouseEnter={() => handleEnter(setShowClientArea)}
                onMouseLeave={() => handleLeave(setShowClientArea)}
              >
                <button
                  onClick={() => setShowClientArea(!showClientArea)}
                  className="flex items-center gap-1 font-medium hover:text-blue-600"
                >
                  Client Area
                  <span className={`w-3 h-3 border-r-2 border-b-2 border-black transform transition ${showClientArea ? "rotate-45" : "-rotate-45"}`}></span>
                </button>
                {showClientArea && (
                  <div className="absolute mt-2 bg-white shadow rounded p-2 w-44">
                    <Link href="/check-imei" className="block px-3 py-1 hover:bg-gray-100 rounded">Free IMEI Check</Link>
                  </div>
                )}
              </div>

              {/* PLACE ORDER */}
              <div
                className="relative"
                onMouseEnter={() => handleEnter(setShowPlaceOrder)}
                onMouseLeave={() => handleLeave(setShowPlaceOrder)}
              >
                <button
                  onClick={() => setShowPlaceOrder(!showPlaceOrder)}
                  className="flex items-center gap-1 font-medium hover:text-blue-600"
                >
                  Place Order
                  <span className={`w-3 h-3 border-r-2 border-b-2 border-black transform transition ${showPlaceOrder ? "rotate-45" : "-rotate-45"}`}></span>
                </button>
                {showPlaceOrder && (
                  <div className="absolute mt-2 bg-white shadow rounded p-2 w-52">
                    <Link href="/orders/imei-service" className="block px-3 py-1 hover:bg-gray-100 rounded">IMEI Service</Link>
                    <Link href="/orders/server-service" className="block px-3 py-1 hover:bg-gray-100 rounded">Server Service</Link>
                    <Link href="/orders/remote-service" className="block px-3 py-1 hover:bg-gray-100 rounded">Remote Service</Link>
                  </div>
                )}
              </div>

              {/* ORDER HISTORY */}
              <div
                className="relative"
                onMouseEnter={() => handleEnter(setShowOrderHistory)}
                onMouseLeave={() => handleLeave(setShowOrderHistory)}
              >
                <button
                  onClick={() => setShowOrderHistory(!showOrderHistory)}
                  className="flex items-center gap-1 font-medium hover:text-blue-600"
                >
                  Order History
                  <span className={`w-3 h-3 border-r-2 border-b-2 border-black transform transition ${showOrderHistory ? "rotate-45" : "-rotate-45"}`}></span>
                </button>
                {showOrderHistory && (
                  <div className="absolute mt-2 bg-white shadow rounded p-2 w-56">
                    <Link href="/history/imei-orders" className="block px-3 py-1 hover:bg-gray-100 rounded">IMEI Orders</Link>
                    <Link href="/history/server-orders" className="block px-3 py-1 hover:bg-gray-100 rounded">Server Orders</Link>
                    <Link href="/history/remote-orders" className="block px-3 py-1 hover:bg-gray-100 rounded">Remote Orders</Link>
                    <Link href="/history/retail-orders" className="block px-3 py-1 hover:bg-gray-100 rounded">Retail Orders</Link>
                    <Link href="/history/advanced-history" className="block px-3 py-1 hover:bg-gray-100 rounded">Advanced History</Link>
                  </div>
                )}
              </div>

              {/* USER PROFILE */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown("user")}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  {user?.photoURL && (
                    <img src={user.photoURL} alt="Profile" className="w-6 h-6 rounded-full object-cover" />
                  )}
                  {user?.displayName || user?.email} ▾
                </button>

                {openDropdown === "user" && (
                  <div className="absolute right-0 mt-2 w-60 bg-white shadow-lg rounded-md py-2 z-50">
                    <Link href="/dashboard/profile" className="block px-4 py-2 hover:bg-gray-100">My Profile</Link>
                    <Link href="/dashboard/add-funds" className="block px-4 py-2 hover:bg-gray-100">Add Funds</Link>
                    <Link href="/dashboard/invoice" className="block px-4 py-2 hover:bg-gray-100">My Invoice</Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
