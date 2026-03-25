
"use client";

export default function Tickets() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Support Tickets</h1>

      <button className="bg-blue-600 text-white px-4 py-2 rounded mb-4">
        + New Ticket
      </button>

      <div className="bg-white p-4 rounded shadow">
        No tickets yet.
      </div>
    </div>
  );
}
