"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { auth, db, storage } from "../../lib/firebaseClient";
import {
  User,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

type Order = {
  id: string;
  type: string;
  status: string;
  date: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [tab, setTab] = useState<"info" | "password" | "wallet" | "orders">("info");

  // Personal info
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [emailVerified, setEmailVerified] = useState(true);

  // Password change
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Wallet
  const [balance, setBalance] = useState<number>(0);
  const [addAmount, setAddAmount] = useState<number>(0);

  // Orders
  const [orders, setOrders] = useState<Order[]>([]);

  // Load user info
  useEffect(() => {
    const u = auth.currentUser;
    if (u) {
      setUser(u);
      setName(u.displayName || "");
      setEmail(u.email || "");
      setPhotoURL(u.photoURL || null);
      setEmailVerified(u.emailVerified);

      const userRef = doc(db, "users", u.uid);
      getDoc(userRef).then((docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setPhone(data.phone || "");
          setBalance(data.balance || 0);
        }
      });

      // Load orders
      const ordersRef = collection(db, "orders");
      const q = query(ordersRef, where("userId", "==", u.uid));
      getDocs(q).then((querySnapshot) => {
        const fetchedOrders: Order[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data() as Order;
          fetchedOrders.push({ id: doc.id, ...data });
        });
        setOrders(fetchedOrders);
      });
    }
  }, []);

  // Upload profile photo
  const handlePhotoChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!user) return;
    const file = e.target.files?.[0];
    if (!file) return;
    const storageRef = ref(storage, `users/${user.uid}/profile.jpg`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    await updateProfile(user, { photoURL: url });
    setPhotoURL(url);
  };

  // Save personal info
  const handleSaveInfo = async () => {
    if (!user) return;
    await updateProfile(user, { displayName: name });
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, { phone, name }, { merge: true });
    alert("Info updated!");
  };

  // Change password
  const handleChangePassword = async () => {
    if (!user) return;
    if (newPassword !== confirmPassword) return alert("Passwords do not match");
    try {
      const credential = EmailAuthProvider.credential(user.email || "", currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
      alert("Password changed successfully!");
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  // Send email verification
  const handleSendVerification = async () => {
    if (!user) return;
    await sendEmailVerification(user);
    alert("Verification email sent!");
  };

  // Add funds
  const handleAddFunds = async () => {
    if (!user) return;
    if (addAmount <= 0) return alert("Enter a valid amount");
    const userRef = doc(db, "users", user.uid);
    const newBalance = balance + addAmount;
    await updateDoc(userRef, { balance: newBalance });
    setBalance(newBalance);
    setAddAmount(0);
    alert(`$${addAmount.toFixed(2)} added to your balance`);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">My Profile</h1>

      {!emailVerified && (
        <div className="bg-yellow-100 p-3 rounded mb-4 text-center">
          Your email is not verified.{" "}
          <button onClick={handleSendVerification} className="text-blue-600 underline">
            Resend verification
          </button>
        </div>
      )}

      <div className="flex justify-center gap-2 mb-6 flex-wrap">
        <button
          className={`px-4 py-2 rounded font-medium ${tab === "info" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => setTab("info")}
        >
          Info
        </button>
        <button
          className={`px-4 py-2 rounded font-medium ${tab === "password" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => setTab("password")}
        >
          Change Password
        </button>
        <button
          className={`px-4 py-2 rounded font-medium ${tab === "wallet" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => setTab("wallet")}
        >
          Wallet
        </button>
        <button
          className={`px-4 py-2 rounded font-medium ${tab === "orders" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => setTab("orders")}
        >
          Orders
        </button>
      </div>

      {/* INFO */}
      {tab === "info" && (
        <div className="bg-white p-6 rounded shadow space-y-4">
          <div className="flex items-center gap-4">
            <img
              src={photoURL || "/default-profile.png"}
              alt="Profile"
              className="w-20 h-20 rounded-full border"
            />
            <input type="file" onChange={handlePhotoChange} className="border p-2 rounded" />
          </div>
          <input
            className="w-full border p-3 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <input
            className="w-full border p-3 rounded bg-gray-100"
            value={email}
            disabled
            placeholder="Email"
          />
          <input
            className="w-full border p-3 rounded"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
          />
          <button onClick={handleSaveInfo} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Save Info
          </button>
        </div>
      )}

      {/* PASSWORD */}
      {tab === "password" && (
        <div className="bg-white p-6 rounded shadow space-y-4 max-w-md mx-auto">
          <input
            type="password"
            className="w-full border p-3 rounded"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Current Password"
          />
          <input
            type="password"
            className="w-full border p-3 rounded"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
          />
          <input
            type="password"
            className="w-full border p-3 rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm New Password"
          />
          <button onClick={handleChangePassword} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
            Change Password
          </button>
        </div>
      )}

      {/* WALLET */}
      {tab === "wallet" && (
        <div className="bg-white p-6 rounded shadow space-y-4 max-w-md mx-auto">
          <p className="text-lg font-medium">Current Balance: <span className="font-bold">${balance.toFixed(2)}</span></p>
          <div className="flex gap-2">
            <input
              type="number"
              min={0}
              value={addAmount}
              onChange={(e) => setAddAmount(parseFloat(e.target.value))}
              className="border p-3 rounded flex-1"
              placeholder="Amount"
            />
            <button onClick={handleAddFunds} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Add Funds
            </button>
          </div>
        </div>
      )}

      {/* ORDERS */}
      {tab === "orders" && (
        <div className="bg-white p-6 rounded shadow overflow-x-auto">
          {orders.length === 0 ? (
            <p>No orders yet</p>
          ) : (
            <table className="min-w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-3 border">ID</th>
                  <th className="py-2 px-3 border">Type</th>
                  <th className="py-2 px-3 border">Status</th>
                  <th className="py-2 px-3 border">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-gray-50">
                    <td className="py-2 px-3 border">{o.id}</td>
                    <td className="py-2 px-3 border">{o.type}</td>
                    <td className="py-2 px-3 border">{o.status}</td>
                    <td className="py-2 px-3 border">{o.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}