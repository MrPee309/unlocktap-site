import React from 'react';
export default function Packages(){
  return (
    <section className="bg-white rounded-md shadow p-6">
      <h3 className="text-xl font-semibold mb-3">Packages</h3>
      <p className="text-sm text-gray-600">Choose a package that fits your needs.</p>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border rounded">Starter — $5</div>
        <div className="p-4 border rounded">Business — $15</div>
        <div className="p-4 border rounded">Pro — $30</div>
      </div>
    </section>
  );
}
