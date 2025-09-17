// pages/auth/register.tsx
import Head from "next/head";
import AnnouncementBar from "@/components/AnnouncementBar";
import TopNav from "@/components/TopNav";
import dynamic from "next/dynamic";

const RegisterForm = dynamic(() => import("@/components/forms/RegisterForm"), { ssr: false });

export default function RegisterPage() {
  return (
    <>
      <Head><title>Register — UnlockTap.pro</title></Head>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <AnnouncementBar />
        <TopNav />
        <main className="mx-auto max-w-7xl px-4 py-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-2 text-3xl font-extrabold">Create your account</h1>
            <p className="text-gray-600">Register to check IMEI, order unlocks and track statuses.</p>
          </div>
          <div className="mt-8 flex justify-center">
            <RegisterForm />
          </div>
        </main>
      </div>
    </>
  );
}
