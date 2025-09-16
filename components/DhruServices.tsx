import React from 'react';
export default function DhruServices(){
  return (
    <section className="bg-white rounded-md shadow p-6">
      <h3 className="text-xl font-semibold mb-3">DHru Packages</h3>
      <p className="text-sm text-gray-600">Select a DHru service package for your device.</p>
      <ul className="mt-3 space-y-2">
        <li>Basic DHru — IMEI lookup</li>
        <li>Standard DHru — Unlock + Report</li>
        <li>Premium DHru — Priority unlock</li>
      </ul>
    </section>
  );
}
