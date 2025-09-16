// pages/index.tsx
import Head from "next/head";
import Link from "next/link";

// si w gen components sa yo nan /components, yo ap monte:
import AnnouncementBar from "@/components/AnnouncementBar";
import TopNav from "@/components/TopNav";
import Navbar from "@/components/Navbar";
import PromoStrip from "@/components/PromoStrip";
import Services from '@/components/Services';
import DhruServices from '@/components/DhruServices';
import Packages from '@/components/Packages';
import ImeiForm from '@/components/ImeiForm';

export default function Home() {
  return (
    <>
      <Head>
        <title>UnlockTap – IMEI check & unlock</title>
        <meta name="description" content="IMEI check & unlock via API" />
      </Head>

      <div className="min-h-screen bg-gray-50 text-gray-900">
        {/* retire sa yo si repo a pa genyen yo */}
        <AnnouncementBar />
        <TopNav />
        <Navbar />
        <PromoStrip />

        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            UnlockTap
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            IMEI check &amp; unlock via API.
          </p>

          <div className="mt-8 flex items-center gap-4">
            <Link
              href="/auth/login"
              className="inline-flex items-center rounded-md bg-black px-5 py-2.5 text-white hover:bg-gray-800 transition"
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              className="inline-flex items-center rounded-md border border-black px-5 py-2.5 hover:bg-gray-100 transition"
            >
              Register
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
