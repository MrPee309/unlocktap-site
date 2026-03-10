// components/Pricing.tsx
export default function Pricing() {
  const plans = [
    { name: "Basic Plan", price: "$10", unit: "/month", cta: "Get Started" },
    { name: "Pro", price: "$29", unit: "/month", cta: "Choose Pro" },
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16">
      <h2 className="text-2xl font-bold">Pricing</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {plans.map(p => (
          <div key={p.name} className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="text-lg font-semibold">{p.name}</div>
            <div className="mt-2 text-3xl font-extrabold">{p.price}<span className="text-base font-medium">{p.unit}</span></div>
            <button className="mt-6 w-full rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700">{p.cta}</button>
          </div>
        ))}
      </div>
    </section>
  );
}
