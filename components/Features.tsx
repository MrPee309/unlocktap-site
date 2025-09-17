// components/Features.tsx
export default function Features() {
  const items = [
    { title: "IMEI Check", desc: "Quickly validate device IMEI number" },
    { title: "Unlock Orders", desc: "Initiate unlock requests easily" },
    { title: "Order Status", desc: "Monitor the status of your orders" },
    { title: "API Access", desc: "Simple endpoints for automation" },
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h2 className="text-2xl font-bold">Features</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it) => (
          <div key={it.title} className="rounded-xl border bg-white p-4 shadow-sm">
            <div className="text-blue-600">✔</div>
            <div className="mt-2 font-semibold">{it.title}</div>
            <div className="text-sm text-gray-600">{it.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
