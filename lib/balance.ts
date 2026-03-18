import { db } from "./firebaseClient";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

// 🧠 CREATE USER IF NOT EXIST
async function ensureUserDoc(userId: string) {
  const ref = doc(db, "users", userId);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      balance: 0,
      createdAt: serverTimestamp(),
    });
  }

  return ref;
}

// 💰 GET USER BALANCE
export async function getUserBalance(userId: string) {
  console.log("DB:", db);
  
  const ref = await ensureUserDoc(userId);
  const snap = await getDoc(ref);

  return snap.data()?.balance || 0;
}

// ➖ DEBIT (LÈ CLIENT ITILIZE SERVICE)
export async function decrementBalance(userId: string, amount: number) {
  const ref = await ensureUserDoc(userId);
  const snap = await getDoc(ref);

  const current = snap.data()?.balance || 0;

  if (current < amount) {
    throw new Error("Insufficient balance");
  }

  await updateDoc(ref, {
    balance: current - amount,
  });

  return current - amount;
}

// ➕ REQUEST TOP-UP (CLIENT SIDE)
export async function requestTopUp(userId: string, amount: number) {
  if (!amount || amount <= 0) {
    throw new Error("Invalid amount");
  }

  await addDoc(collection(db, "topups"), {
    userId,
    amount,
    status: "pending", // ⏳ admin ap valide
    createdAt: serverTimestamp(),
  });
}

// ✅ ADMIN VALIDATION (OU MENM AP ITILIZE SA)
export async function validateTopUp(userId: string, amount: number) {
  const ref = await ensureUserDoc(userId);
  const snap = await getDoc(ref);

  const current = snap.data()?.balance || 0;

  await updateDoc(ref, {
    balance: current + amount,
  });

  return current + amount;
}

// 📊 GET ALL USER TOPUPS (OPTIONAL - DASHBOARD)
export async function getUserTopUps(userId: string) {
  // NOTE: sa se basic version (san query filter)
  // si w vle filtre byen pita n ap itilize where()

  const snapshot = await getDoc(doc(db, "users", userId));

  return snapshot.exists() ? snapshot.data() : null;
}