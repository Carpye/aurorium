import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import "./globals.css"
import { getServerSession } from "next-auth"
import Providers from "@/components/Providers"
import { authOptions } from "./api/auth/[...nextauth]/route"
import Navbar from "@/components/Navbar"

export const metadata: Metadata = {
  title: "Aurorium",
  description: "Simple user profile web app",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={GeistSans.className}>
        <Providers session={session}>
          <div className="relative flex h-screen flex-col">
            <Navbar />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
