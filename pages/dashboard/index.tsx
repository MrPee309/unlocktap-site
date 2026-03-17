"use client";

import { useEffect, useState } from "react";
import { auth, db } from "../../lib/firebaseClient";
import {
  collection,
  getDocs,
  doc,
  query,
  orderBy,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import { useRouter } from "next/navigation";

interface ImeiRecord {
  id: string;
  imei: string;
  result: string;
  price: number;
  createdAt: any;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [imeiHistory, setImeiHistory] = useState<ImeiRecord[]>([]);
  const [balance, setBalance] = useState<number>(10);
  const [imei, setImei] = useState("");
  const [message, setMessage] = useState("");
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [amount, setAmount] = useState<number>(0);

  // Load user & listen for IMEI history changes
  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        const userImeiRef = collection(doc(db, "users", currentUser.uid), "imei_checks");
        const q = query(userImeiRef, orderBy("createdAt", "desc"));

        const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
          const records: ImeiRecord[] = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<ImeiRecord, "id">),
          }));
          setImeiHistory(records);
        });

        return () => unsubscribeSnapshot();
      } else {
        setUser(null);
        setImeiHistory([]);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // IMEI check
  const handleCheck = async () => {
    if (!user) return setMessage("Please login first!");
    if (!imei) return setMessage("Enter an IMEI");

    try {
      const userImeiRef = collection(doc(db, "users", user.uid), "imei_checks");
      await addDoc(userImeiRef, {
        imei,
        result: "Done",
        price: 1,
        createdAt: new Date(),
      });

      setMessage(`IMEI ${imei} checked successfully!`);
      setImei("");
      setBalance((prev) => prev - 1); // optional
    } catch (error: any) {
      console.error(error);
      setMessage("Error: " + error.message);
    }
  };

  // Add Funds
  const handleAddFunds = () => {
    setBalance((prev) => prev + amount);
    setShowAddFunds(false);
    setAmount(0);
  };

  return (
    <main className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Welcome & Balance */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-50 p-4 rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-2 md:mb-0">
          Welcome, {user?.displayName || user?.email}
        </h1>
        <div className="text-left md:text-right">
          <p className="text-gray-700 font-semibold">Balance: ${balance.toFixed(2)}</p>
          <button
            className="mt-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            onClick={() => setShowAddFunds(true)}
          >
            Add Funds
          </button>
        </div>
      </section>

      {/* Add Funds Modal */}
      {showAddFunds && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-80">
            <h2 className="text-lg font-bold mb-2">Add Funds</h2>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Amount"
              className="w-full border rounded-md px-3 py-2 mb-3"
            />
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-300 px-3 py-1 rounded-md"
                onClick={() => setShowAddFunds(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-600 text-white px-3 py-1 rounded-md"
                onClick={handleAddFunds}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* IMEI Checker */}
      <section className="bg-white p-4 rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-2">Check IMEI</h2>
        <div className="flex flex-col md:flex-row gap-2 mb-2">
          <input
            type="text"
            value={imei}
            onChange={(e) => setImei(e.target.value)}
            placeholder="Enter IMEI"
            className="flex-1 border rounded-md px-3 py-2"
          />
          <button
            onClick={handleCheck}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Check
          </button>
        </div>
        {message && <p className="text-gray-600">{message}</p>}
      </section>

      {/* Services / Subscription / Install App */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          onClick={() => router.push("/dashboard/services-status")}
          className="bg-white p-4 rounded-md shadow-md hover:shadow-lg transition cursor-pointer"
        >
          <h3 className="font-bold mb-2">Services Status</h3>
          <p className="text-gray-700">View your active services</p>
        </div>
        <div
          onClick={() => router.push("/dashboard/subscription")}
          className="bg-white p-4 rounded-md shadow-md hover:shadow-lg transition cursor-pointer"
        >
          <h3 className="font-bold mb-2">Subscription</h3>
          <p className="text-gray-700">Manage your subscription</p>
        </div>
        <div
          onClick={() => router.push("/dashboard/install-app")}
          className="bg-white p-4 rounded-md shadow-md hover:shadow-lg transition cursor-pointer"
        >
          <h3 className="font-bold mb-2">Install App</h3>
          <p className="text-gray-700">Download our mobile app</p>
        </div>
      </section>

      {/* IMEI History */}
      <section className="bg-white p-4 rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-2">IMEI History</h2>
        {imeiHistory.length === 0 ? (
          <p>No IMEI checks yet.</p>
        ) : (
          <table className="w-full border rounded-md text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3 py-2 border">IMEI</th>
                <th className="px-3 py-2 border">Result</th>
                <th className="px-3 py-2 border">Price</th>
                <th className="px-3 py-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {imeiHistory.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-3 py-2 border">{record.imei}</td>
                  <td className="px-3 py-2 border">{record.result}</td>
                  <td className="px-3 py-2 border">${record.price}</td>
                  <td className="px-3 py-2 border">{record.createdAt.toDate().toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
}