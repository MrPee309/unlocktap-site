"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function TopUpPage() {
  const searchParams = useSearchParams();
  const service = searchParams.get("service") || "";

  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleTopUp = async () => {
    if (!amount || isNaN(Number(amount))) {
      setMessage("Please enter a valid amount");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/topup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service, amount: Number(amount) }),
      });

      const data = await res.json();
      setMessage(data.success ? "Top-up successful!" : `Error: ${data.error}`);
    } catch {
      setMessage("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Top-Up Account</h1>
      {service && <p>Service: <strong>{service}</strong></p>}

      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full px-3 py-2 mb-4 border rounded"
      />

      <button onClick={handleTopUp} disabled={loading}>
        {loading ? "Processing..." : "Top-Up"}
      </button>

      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
