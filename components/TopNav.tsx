'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { auth } from "@/lib/firebaseClient"
import { useAuth } from '../context/AuthContext'

type Item = { href: string; label: string }
const mainItems: Item[] = [
  { href: '/', label: 'Home' },
  { href: '/check-imei', label: 'Check IMEI' },
  { href: '/order-unlock', label: 'Order Unlock' },
  { href: '/order-status', label: 'Order Status' },
]

export default function TopNav() {
  const [open, setOpen] = useState(false)
  const { user, loading } = useAuth()

  async function handleLogin() {
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      setOpen(false)
    } catch (e) { console.error(e); alert('Login failed') }
  }
  async function handleLogout() { try { await signOut(auth); setOpen(false) } catch (e) { console.error(e) } }

  return (
    <nav className="w-full border-b border-gray-200 bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/unlocktap-icon.png" alt="UnlockTap" width={28} height={28} />
          <span className="font-semibold">UnlockTap</span>
        </Link>

        <div className="relative">
          <button onClick={() => setOpen(o => !o)} className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50" aria-expanded={open} aria-haspopup="menu">
            Menu ▾
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-56 rounded-md border border-gray-200 bg-white shadow-lg overflow-hidden z-50" role="menu">
              <div className="py-1">
                {mainItems.map(it => (
                  <Link key={it.href} href={it.href} className="block px-3 py-2 hover:bg-gray-50" onClick={() => setOpen(false)}>
                    {it.label}
                  </Link>
                ))}
              </div>
              <div className="border-t border-gray-200" />
              <div className="py-1">
                {!loading && !user && (
                  <>
                    <button onClick={handleLogin} className="w-full text-left block px-3 py-2 hover:bg-gray-50">Login (Google)</button>
                    <Link href="/register" className="block px-3 py-2 hover:bg-gray-50" onClick={() => setOpen(false)}>Register</Link>
                  </>
                )}
                {!loading && user && (
                  <>
                    <div className="px-3 py-2 text-sm text-gray-500 truncate">Signed in as {user.email}</div>
                    <Link href="/account" className="block px-3 py-2 hover:bg-gray-50" onClick={() => setOpen(false)}>My Account</Link>
                    <button onClick={handleLogout} className="w-full text-left block px-3 py-2 hover:bg-gray-50">Logout</button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
