import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import "./globals.css"
import { getServerSession } from "next-auth"
import Providers from "@/components/Providers"

export const metadata: Metadata = {
  title: "Aurorium",
  description: "Simple user profile web app",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = getServerSession()

  return (
    <html lang="en">
      <body className={GeistSans.className}>
        {/* @ts-expect-error */}
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  )
}
