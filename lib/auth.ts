import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const rows = await db`
          SELECT id, email, password_hash, is_admin
          FROM users
          WHERE email = ${credentials.email}
          LIMIT 1
        `
        const user = rows[0]
        if (!user) return null

        const isValid = await bcrypt.compare(credentials.password, user.password_hash as string)
        if (!isValid) return null

        return {
          id: user.id as string,
          email: user.email as string,
          isAdmin: user.is_admin as boolean,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.isAdmin = (user as { isAdmin: boolean }).isAdmin
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id: string; isAdmin: boolean }).id = token.id as string
        ;(session.user as { id: string; isAdmin: boolean }).isAdmin = token.isAdmin as boolean
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
}
