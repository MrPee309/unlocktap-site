"use client";  

default function AddFunds() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Add Funds</h1>

      <div className="bg-white p-6 rounded-xl shadow max-w-md">
        <input
          type="number"
          placeholder="Enter amount"
          className="w-full border p-2 rounded mb-4"
        />

        <select className="w-full border p-2 rounded mb-4">
          <option>Crypto (USDT)</option>
          <option>Card</option>
        </select>

        <button className="bg-blue-600 text-white w-full py-2 rounded">
          Deposit
        </button>
      </div>
    </div>
  );
}
