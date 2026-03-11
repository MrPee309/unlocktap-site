"use client"

import Image from "next/image"
import { useState, useEffect } from "react"

export default function Hero() {

  const phones = [
    "/images/phones/macbookpromdm.png",
    "/images/phones/icloud.png",
    "/images/phones/Infinix.png",
    "/images/phones/Google pixel.png",
    "/images/phones/iPhone17ProMax.png",
    "/images/phones/iPhone17PromaxColor.png"
  ]

  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phones.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative overflow-hidden bg-blue-600">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* Left content */}
          <div className="text-white">
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight">
              Check IMEI & Unlock<br /> your device
            </h1>

            <form className="mt-8 flex items-center gap-3" action="/check" id="check">
              <input
                type="text"
                placeholder="Enter IMEI number"
                className="w-full max-w-md rounded-md border-0 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-white"
              />

              <button
                type="submit"
                className="rounded-md bg-green-500 px-5 py-3 font-semibold text-slate-900 hover:bg-green-400"
              >
                Check
              </button>
            </form>

            <a
              href="/order-unlock"
              className="mt-5 inline-flex items-center text-white/90 hover:text-white underline underline-offset-4"
            >
              Order Unlock
            </a>
          </div>

          {/* Phone slider (desktop only) */}
          <div className="hidden lg:block">
            <div className="relative mx-auto w-[320px] h-[620px]">

              <Image
                src={phones[index]}
                alt="UnlockTap device preview"
                fill
                priority
                className="object-contain drop-shadow-2xl transition-all duration-700"
              />

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}