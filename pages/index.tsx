import Link from 'next/link'

export default function Home() {
  return (
    <div className="container">
      <div className="header">
        <h1>IMEI Tools</h1>
        <small className="muted">Starter kit – IMEIDB + DHRU-compatible unlock</small>
      </div>
      <nav>
        <Link className="link" href="/check">Check IMEI</Link>
        <Link className="link" href="/unlock">Order Unlock</Link>
        <Link className="link" href="/status">Order Status</Link>
      </nav>
      <div className="card">
        <h3>What you get</h3>
        <ul>
          <li>✔ Simple IMEI check (ImeiDB)</li>
          <li>✔ Unlock order flow (DHRU-compatible/UnlockBase style)</li>
          <li>✔ Optional Firebase logging</li>
        </ul>
      </div>
    </div>
  );
}
