import { useSession } from "next-auth/react"
import ImeiChecker from "../components/ImeiChecker"

export default function CheckImeiPage() {
  const { data: session } = useSession()
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Check IMEI – UnlockTap</h1>
      <ImeiChecker session={session} />
    </main>
  )
}