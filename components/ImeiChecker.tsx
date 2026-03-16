import { useState, useEffect } from "react"

interface ImeiCheckerProps {
  session: any // pase session si ou itilize NextAuth
}

export default function ImeiChecker({ session }: ImeiCheckerProps) {
  const [imei, setImei] = useState("")
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [quota, setQuota] = useState<number>(0)

  // Fetch quota itilizatè lè component la chaje
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
    if (!session) return setError("You must login or register first")
    if (!imei.trim()) return setError("Please enter an IMEI")
    if (quota <= 0) return setError("You have used all your free checks")

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
    <div className="bg-white p-4 rounded shadow max-w-md mx-auto">
      <form onSubmit={handleCheck} className="flex gap-2 mb-4">
        <input
          value={imei}
          onChange={(e) => setImei(e.target.value)}
          placeholder="Enter IMEI"
          className="flex-1 p-2 border border-gray-300 rounded"
          disabled={!session}
        />
        <button
          type="submit"
          disabled={loading || !session || quota <= 0}
          className="bg-blue-600 text-white px-4 rounded disabled:opacity-50"
        >
          {loading ? "Checking…" : "Check"}
        </button>
      </form>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      {result && (
        <div className="bg-gray-50 p-3 rounded">
          <p><strong>Brand:</strong> {result.brand}</p>
          <p><strong>Model:</strong> {result.model}</p>
          <p><strong>Status:</strong> {result.status}</p>
          <p><strong>Type:</strong> {result.type}</p>
          <p><strong>Serial:</strong> {result.serial}</p>
        </div>
      )}

      {session && quota > 0 && (
        <p className="text-sm text-gray-500 mt-2">✅ Free checks remaining: {quota}</p>
      )}
      {session && quota <= 0 && (
        <p className="text-orange-600 mt-2">
          You have used all your free checks. <a href="/buy-checks" className="underline">Buy more</a>
        </p>
      )}
      {!session && (
        <p className="text-red-500 mt-2">
          You must <a href="/login" className="underline">login</a> or <a href="/register" className="underline">register</a> first
        </p>
      )}
    </div>
  )
}