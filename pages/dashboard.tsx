"use client";

import { useEffect, useState } from "react";
import { auth, db } from "../lib/firebaseClient";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

export default function Dashboard() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Verifye login itilizatè ak chaje done
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      if (!user) {
        router.push("/login"); // si pa gen login, retounen login
        return;
      }

      try {
        // Chaje done itilizatè nan Firestore
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }

        // Chaje orders nan subcollection "orders"
        const ordersColRef = collection(db, "users", user.uid, "orders");
        const ordersSnapshot = await getDocs(ordersColRef);
        const ordersList = ordersSnapshot.docs.map((doc) => doc.data());
        setOrders(ordersList);

      } catch (error: any) {
        console.error("Error fetching data:", error.message);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen p-8 bg-gray-100 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Welcome, {userData?.email}</h1>
      <p className="mb-4 text-lg">Balance: ${userData?.balance || 0}</p>


      <h2 className="text-2xl font-semibold mb-2">Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul className="space-y-2 w-full max-w-xl">
          {orders.map((order, index) => (
            <li key={index} className="bg-white p-4 rounded shadow flex justify-between">
              <span>{order.device || "Unknown Device"}</span>
              <span>Status: {order.status || "pending"}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}