import Link from "next/link";

export default function Navbar() {
  return (
    <header style={{ padding: "0.75rem 1rem", borderBottom: "1px solid #eee" }}>
      <nav style={{ display: "flex", gap: "1rem" }}>
        <Link href="/">Home</Link>
        <Link href="/auth/login">Login</Link>
        <Link href="/auth/register">Register</Link>
      </nav>
    </header>
  );
}
