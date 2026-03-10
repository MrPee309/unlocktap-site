"use client";

type Plan = {
  name: string;
  price: number;
  features: string[];
};

const plans: Plan[] = [
  { name: "Basic", price: 5, features: ["Unlock 1 device", "Support Email"] },
  { name: "Standard", price: 10, features: ["Unlock 5 devices", "Support Email & Chat"] },
  { name: "Premium", price: 20, features: ["Unlimited unlocks", "Priority Support"] },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">Our Pricing Plans</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.name} className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">{plan.name}</h2>
            <p className="text-2xl font-bold mb-4">${plan.price}</p>
            <ul className="mb-4">
              {plan.features.map((f, i) => (
                <li key={i} className="text-gray-700">• {f}</li>
              ))}
            </ul>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Choose Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}