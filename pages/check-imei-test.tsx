import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"

export default function CheckIMEIUnlockTap() {
  const { data: session } = useSession()
  const [imei, setImei] = useState("")
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [quota, setQuota] = useState<number>(0)

  useEffect(() => {
    if (!session) return
    async function fetchQuota() {
      try {
        const res = await fetch("/api/user-quota")
        const data = await res.json()
        if (res.ok) setQuota(data.quota || 0)
      } catch (err) {
        console.log("Failed to fetch quota:", err)
      }
    }
    fetchQuota()
  }, [session])

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session) return setError("You must login or register first to use this service")
    if (!imei.trim()) return setError("Please enter an IMEI")
    if (quota <= 0) return setError("You have used all your free checks. Buy more to continue.")

    setLoading(true)
    setResult(null)
    setError("")

    try {
      const res = await fetch("/api/check-imei", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imei: imei.trim() }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) {
        setError(data.error || "Something went wrong")
      } else {
        setResult(data)
        setQuota((prev) => Math.max(prev - 1, 0))
      }
    } catch (err) {
      setError("Failed to fetch API")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="max-w-xl mx-auto p-6 font-sans">
      <h1 className="text-2xl font-bold mb-6 text-center">Check IMEI – UnlockTap</h1>

      {!session && (
        <p className="text-red-500 mb-4">
          ⚠️ You must <a href="/login" className="underline">login</a> or <a href="/register" className="underline">register</a> first to use this service.
        </p>
      )}

      {session && (
        <p className="text-sm text-gray-600 mb-4">
          ✅ Free checks remaining: <strong>{quota}</strong>
        </p>
      )}

      <form onSubmit={handleCheck} className="flex gap-2 mb-4">
        <input
          value={imei}
          onChange={(e) => setImei(e.target.value)}
          placeholder="Enter IMEI"
          className="flex-1 p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={!session}
        />
        <button
          type="submit"
          disabled={loading || !session || quota <= 0}
          className="bg-blue-600 text-white px-4 rounded shadow hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Checking…" : "Check"}
        </button>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {result && (
        <div className="bg-gray-50 p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Device Info</h2>
          <ul className="space-y-1">
            {result.brand && <li><strong>Brand:</strong> {result.brand}</li>}
            {result.model && <li><strong>Model:</strong> {result.model}</li>}
            {result.status && <li><strong>Status:</strong> {result.status}</li>}
            {result.type && <li><strong>Type:</strong> {result.type}</li>}
            {result.serial && <li><strong>Serial:</strong> {result.serial}</li>}
          </ul>
        </div>
      )}

      {session && quota <= 0 && (
        <p className="text-orange-600 mt-4">
          You have used all your free checks. <a href="/buy-checks" className="underline">Buy more checks</a> to continue.
        </p>
      )}
    </main>
  )
}