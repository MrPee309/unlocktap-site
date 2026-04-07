"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { auth, sendPasswordResetEmail } from "@/lib/firebaseClient";
import { onAuthStateChanged, signInWithEmailAndPassword, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";

const RECAPTCHA_SITE_KEY = "6LfxiqssAAAAAOU2KzFXAFXTN2pURlRhzFHGxVCJ";

export default function TopNav() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loginModal, setLoginModal] = useState(false);
  const [forgetPasswordModal, setForgetPasswordModal] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    if (!captchaValue) return alert("Verify CAPTCHA");
    try {
      await signInWithEmailAndPassword(auth, emailInput, passwordInput);
      setLoginModal(false);
      router.push("/dashboard");
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleForgetPassword = async () => {
    if (!emailInput) return alert("Enter email");
    await sendPasswordResetEmail(auth, emailInput);
    alert("Email sent");
  };

  return (
    <>
      {/* HEADER */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="font-bold text-blue-600 text-xl">
            UnlockTap
          </Link>

          {/* MOBILE */}
          <div className="flex items-center gap-2 md:hidden">
            <input
              type="text"
              placeholder="Search..."
              className="border px-2 py-1 rounded text-sm w-32"
            />

            <button onClick={() => setMobileMenu(!mobileMenu)}>
              <div className="w-6 h-0.5 bg-black mb-1"></div>
              <div className="w-6 h-0.5 bg-black mb-1"></div>
              <div className="w-6 h-0.5 bg-black"></div>
            </button>
          </div>

          {/* DESKTOP (pa chanje) */}
          <div className="hidden md:flex items-center gap-4" ref={menuRef}>
            {!user ? (
              <>
                <button onClick={() => setLoginModal(true)}>Login</button>
                <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded">
                  Register
                </Link>
              </>
            ) : (
              <>
                <button>Client Area</button>
                <button>Place Order</button>
                <button>Order History</button>
                <button onClick={() => auth.signOut()}>Logout</button>
              </>
            )}
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenu && (
          <div className="md:hidden bg-white border-t p-4 flex flex-col gap-2">
            {!user ? (
              <>
                <button onClick={() => setLoginModal(true)}>Login</button>
                <Link href="/register">Register</Link>
              </>
            ) : (
              <>
                <Link href="/check-imei">Client Area</Link>
                <Link href="/orders/imei-service">Place Order</Link>
                <Link href="/history/imei-orders">Order History</Link>
                <button onClick={() => auth.signOut()}>Logout</button>
              </>
            )}
          </div>
        )}
      </header>

      {/* LOGIN MODAL */}
      <AnimatePresence>
        {loginModal && (
          <motion.div className="fixed inset-0 flex justify-center items-center bg-black/40 z-50">
            <div className="bg-white p-6 rounded w-96 relative">

              {/* CLOSE BUTTON */}
              <button
                onClick={() => setLoginModal(false)}
                className="absolute top-2 right-3 text-xl"
              >
                ✕
              </button>

              <h2 className="text-xl mb-4 text-center">Login</h2>

              <input
                type="email"
                placeholder="Email"
                className="w-full border p-2 mb-2"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full border p-2 mb-2"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
              />

              <div className="flex justify-center mb-2">
                <ReCAPTCHA sitekey={RECAPTCHA_SITE_KEY} onChange={setCaptchaValue} />
              </div>

              <button onClick={handleLogin} className="w-full bg-blue-600 text-white p-2 mb-2">
                Login
              </button>

              <button
                onClick={() => {
                  setLoginModal(false);
                  setForgetPasswordModal(true);
                }}
                className="text-blue-600"
              >
                Forgot Password
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FORGET PASSWORD MODAL */}
      <AnimatePresence>
        {forgetPasswordModal && (
          <motion.div className="fixed inset-0 flex justify-center items-center bg-black/40 z-50">
            <div className="bg-white p-6 rounded w-96 relative">

              {/* CLOSE (X) */}
              <button
                onClick={() => setForgetPasswordModal(false)}
                className="absolute top-2 right-3 text-xl"
              >
                ✕
              </button>

              <h2 className="mb-4 text-center font-bold">Reset Password</h2>

              <input
                type="email"
                placeholder="Email"
                className="w-full border p-2 mb-3 rounded"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
              />

              <button
                onClick={handleForgetPassword}
                className="w-full bg-green-600 text-white p-2 rounded mb-2"
              >
                Send Email
              </button>

              {/* CANCEL BUTTON */}
              <button
                onClick={() => setForgetPasswordModal(false)}
                className="w-full text-red-600 hover:underline"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}