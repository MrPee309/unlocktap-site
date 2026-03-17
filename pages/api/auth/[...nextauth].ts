// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth"
import { authOptions } from "../../../lib/auth"  // <-- pa janm import route API

export default NextAuth(authOptions) = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Ranplase sa ak verifikasyon itilizatè w
        if (credentials?.email === "test@example.com" && credentials?.password === "123456") {
          return { id: "1", name: "Test User", email: "test@example.com" }
        }
        return null
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
}

export default NextAuth(authOptions)