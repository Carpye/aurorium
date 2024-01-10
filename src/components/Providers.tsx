"use client"
import { httpBatchLink } from "@trpc/client"
import { Session } from "next-auth"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SessionProvider } from "next-auth/react"
import { ReactNode, useState } from "react"
import { trpc } from "@/app/_trpc/client"
import { Toaster } from "./ui/sonner"

interface ProvidersProps {
  session: Session | null
  children: ReactNode
}

export default function Providers({ session, children }: ProvidersProps) {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:3000/api/trpc",
          // You can pass any HTTP headers you wish here
          // async headers() {
          //   return {
          //     authorization: getAuthCookie(),
          //   }
          // },
        }),
      ],
    }),
  )

  return (
    <SessionProvider session={session}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <Toaster richColors />
          {children}
        </QueryClientProvider>
      </trpc.Provider>
    </SessionProvider>
  )
}
