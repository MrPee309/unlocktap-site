export default function Invoice() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">My Invoices</h1>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">ID</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="p-2">#001</td>
            <td className="p-2">$10</td>
            <td className="p-2 text-green-600">Paid</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}