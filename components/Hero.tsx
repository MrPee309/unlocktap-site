"use client"

import Image from "next/image"
import { useState, useEffect } from "react"

export default function Hero() {
  const phones = [
    "/images/phones/macbookpromdm.png",
    "/images/phones/icloud.png",
    "/images/phones/infinix.png",
    "/images/phones/google-pixel.png",
    "/images/phones/iphone17promax.png",
    "/images/phones/iphone17promaxcolor.png"
  ]

  const [index, setIndex] = useState(0)
  const [fade, setFade] = useState(true)
  const [offsetY, setOffsetY] = useState(0)

  // Slider logic (automatic)
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % phones.length)
        setFade(true)
      }, 500)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // Parallax scroll
  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Manual slide functions
  const prevSlide = () => {
    setFade(false)
    setTimeout(() => {
      setIndex((prev) => (prev - 1 + phones.length) % phones.length)
      setFade(true)
    }, 200)
  }

  const nextSlide = () => {
    setFade(false)
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % phones.length)
      setFade(true)
    }, 200)
  }

  return (
    <section className="relative overflow-hidden bg-blue-600">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">

          {/* Left content */}
          <div className="text-white z-10 relative space-y-4">
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight">
              Check IMEI & Unlock<br /> your device
            </h1>

            <form className="flex items-center gap-3" action="/check" id="check">
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
              className="inline-flex items-center text-white/90 hover:text-white underline underline-offset-4"
            >
              Order Unlock
            </a>
          </div>

          {/* Phone slider (desktop only) */}
          <div className="hidden lg:block relative">
            <div
              className="relative mx-auto w-[340px] h-[640px] sm:w-[360px] sm:h-[700px] lg:w-[380px] lg:h-[720px] overflow-hidden"
            >
              {/* Shadow / glow layer */}
              <div
                className="absolute inset-0 rounded-3xl bg-black/10 blur-xl"
                style={{
                  transform: `translateY(${offsetY * 0.05}px) scale(${fade ? 1.05 : 1})`
                }}
              ></div>

              {/* Phone layer */}
              <Image
                key={phones[index]}
                src={phones[index]}
                alt="UnlockTap device preview"
                fill
                priority
                className={`object-contain drop-shadow-2xl transition-all duration-1000 ease-in-out
                  ${fade ? "opacity-100 scale-105 translate-x-0" : "opacity-0 scale-95 -translate-x-5"}`}
                style={{
                  transform: `translateY(${offsetY * 0.1}px)`
                }}
              />

              {/* Subtle overlay / parallax glow */}
              <div
                className="absolute inset-0 pointer-events-none rounded-3xl bg-white/5"
                style={{
                  transform: `translateY(${offsetY * 0.02}px) scale(${fade ? 1.05 : 1})`
                }}
              ></div>

              {/* Navigation buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/30 hover:bg-white/50 p-2"
              >
                ◀
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/30 hover:bg-white/50 p-2"
              >
                ▶
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}