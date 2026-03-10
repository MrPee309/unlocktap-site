"use client";

import { useState } from "react";

export default function OrderUnlockPage() {
  const [imei, setImei] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Order submitted:\nPhone: ${phone}\nIMEI: ${imei}`);
    // Isit la ou ka ajoute API call pou verifye / unlock
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96 flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold">Order Unlock</h1>

        <input
          type="text"
          placeholder="Phone Model"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border px-3 py-2 rounded w-full"
          required
        />

        <input
          type="text"
          placeholder="IMEI Number"
          value={imei}
          onChange={(e) => setImei(e.target.value)}
          className="border px-3 py-2 rounded w-full"
          required
        />

        <button
          type="submit"
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Submit Order
        </button>
      </form>
    </div>
  );
}
