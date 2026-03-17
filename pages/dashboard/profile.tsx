export default function Profile() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">My Profile</h1>

      <div className="bg-white p-6 rounded shadow max-w-md">
        <input className="w-full border p-2 mb-3" placeholder="Name" />
        <input className="w-full border p-2 mb-3" placeholder="Email" />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Save
        </button>
      </div>
    </div>
  );
}