import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="brand">
        <Image src="/unlocktap-icon.svg" alt="UnlockTap" width={32} height={32} />
        <span className="brand-name">UnlockTap</span>
      </div>
      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/check">Check IMEI</a>
        <a href="/unlock">Order Unlock</a>
        <a href="/status">Order Status</a>
      </div>
    </nav>
  );
}
