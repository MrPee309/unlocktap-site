import Link from "next/link";

export default function Home() {
  return (
    <main style={{ maxWidth: 720, margin: "2rem auto" }}>
      <h1>UnlockTap</h1>
      <p>IMEI check & unlock via API.</p>
      <nav style={{ display: "flex", gap: "1rem" }}>
        <Link href="/auth/login">Login</Link>
        <Link href="/auth/register">Register</Link>
      </nav>
    </main>
  );
}
