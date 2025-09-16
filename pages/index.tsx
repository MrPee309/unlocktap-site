// pages/index.tsx
import Head from "next/head";
import AnnouncementBar from "@/components/AnnouncementBar";
import TopNav from "@/components/TopNav";
import Navbar from "@/components/Navbar";
import PromoStrip from "@/components/PromoStrip";

export default function Home() {
  return (
    <>
      <Head>
        <title>UnlockTap – IMEI check & unlock</title>
        <meta name="description" content="IMEI check & unlock via API" />
      </Head>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <AnnouncementBar />
        <TopNav />
        <Navbar />
        <PromoStrip />
        <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold mb-6">Check your IMEI</h1>
          {/* Placeholder form, replace with actual verification logic */}
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Enter IMEI number"
              className="w-full rounded-md border px-4 py-2"
            />
            <button
              type="submit"
              className="rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800"
            >
              Verify IMEI
            </button>
          </form>
        </main>
      </div>
    </>
  );
}
