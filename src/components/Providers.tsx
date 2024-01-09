"use client"
import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

interface ProvidersProps {
  session: Session
  children: ReactNode
}

export default function Providers({ session, children }: ProvidersProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>
}
