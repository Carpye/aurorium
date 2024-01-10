import { db } from "@/lib/db"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import bcrypt from "bcrypt"
import { AuthOptions } from "next-auth"
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db),
  pages: {
    signIn: "/",
    signOut: "/",
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@aurorium.com",
        },
        password: { label: "Hasło", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) return null
        // Add logic here to look up the user from the credentials supplied
        const user = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        if (!user) return null

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password,
        )

        if (!isPasswordValid) return null

        return user
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
