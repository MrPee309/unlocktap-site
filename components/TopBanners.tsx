"use client";

export default function TopBanners() {
  return (
    <div className="w-full overflow-hidden bg-gray-100 border-b">

      <div className="flex gap-16 items-center animate-logo-scroll whitespace-nowrap py-3">

        <img src="/logo/apple.svg" className="h-8" />
        <img src="/logo/samsung.svg" className="h-8" />
        <img src="/logo/xiaomi.svg" className="h-8" />
        <img src="/logo/oneplus.svg" className="h-8" />
        <img src="/logo/xbox.svg" className="h-8" />

        {/* duplicate pou scroll san rete */}
        <img src="/logo/apple.svg" className="h-8" />
        <img src="/logo/samsung.svg" className="h-8" />
        <img src="/logo/xiaomi.svg" className="h-8" />
        <img src="/logo/oneplus.svg" className="h-8" />
        <img src="/logo/xbox.svg" className="h-8" />

      </div>

    </div>
  );
}