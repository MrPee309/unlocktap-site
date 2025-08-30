import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="brand">
        <Image src="/unlocktap-icon.svg" alt="UnlockTap icon" width={36} height={36} className="brand-icon" />
        <div className="brand-name">UnlockTap</div>
      </div>
      <div className="nav-links">
        <a className="active" href="/">Home</a>
        <a href="/pricing">Pricing</a>
        <a href="/status">Status</a>
        <a className="button" href="/login">Sign in</a>
      </div>
    </nav>
  );
}
