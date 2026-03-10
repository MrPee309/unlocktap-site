// pages/index.tsx
import Head from "next/head";

import AnnouncementBar from "@/components/AnnouncementBar";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Head>
        <title>UnlockTap — IMEI check & unlock</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AnnouncementBar />
    
      <Hero />
      {/* Keep the rest of your page content as-is below */}
    </>
  );
}
