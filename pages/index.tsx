// pages/index.tsx
import Head from "next/head";
import AnnouncementBar from "@/components/AnnouncementBar";
import TopNav from "@/components/TopNav";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";

export default function Home() {
  return (
    <>
      <Head>
        <title>UnlockTap.pro — IMEI Check & Unlock</title>
      </Head>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <AnnouncementBar />
        <TopNav />
        <Hero />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Features />
          <Pricing />
        </div>
      </div>
    </>
  );
}
