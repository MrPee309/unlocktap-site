// components/Hero.tsx
import React from "react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-blue-600 text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-16 md:grid-cols-2 md:py-24">
        <div>
          <h1 className="text-4xl font-extrabold sm:text-5xl leading-tight">
            Check IMEI & Unlock
            <br /> your device
          </h1>
          <form className="mt-8 flex w-full max-w-xl items-center overflow-hidden rounded-lg bg-white shadow">
            <input
              type="text"
              placeholder="Enter IMEI number"
              className="w-full px-4 py-3 text-gray-900 outline-none"
            />
            <button type="submit" className="m-1 rounded-md bg-green-600 px-5 py-2.5 text-white hover:bg-green-700">
              Check
            </button>
          </form>
          <div className="mt-4">
            <Link href="/order-unlock" className="inline-flex items-center gap-2 hover:underline">
              Order Unlock →
            </Link>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="mx-auto h-80 w-56 rounded-3xl border-8 border-black bg-white shadow-2xl" />
        </div>
      </div>
    </section>
  );
}
