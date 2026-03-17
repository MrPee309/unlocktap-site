// pages/dashboard/history.tsx
"use client";
import { useEffect, useState } from "react";
import { auth, db } from "../../lib/firebaseClient";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function History() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const q = query(collection(db, "imei_checks"), where("userId", "==", user.uid));
      const snap = await getDocs(q);
      const results: any[] = [];
      snap.forEach(doc => results.push({ id: doc.id, ...doc.data() }));
      setData(results);
    };
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">IMEI History</h1>
      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">IMEI</th>
            <th className="p-2">Result</th>
            <th className="p-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td className="p-2">{item.imei}</td>
              <td className="p-2">{item.result}</td>
              <td className="p-2">${item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}