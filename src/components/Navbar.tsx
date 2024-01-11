"use client"
import { signOut, useSession } from "next-auth/react"
import { Button } from "./ui/button"
import { Loader2 } from "lucide-react"
import { useState } from "react"

const Navbar = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { data: session } = useSession()

  async function handleSignOut() {
    setIsLoading(true)
    await signOut()
  }

  return (
    <nav className="flex w-full items-center justify-between gap-4 border-b px-8 py-4">
      <div className="p-4 font-bold text-2xl">Aurorium</div>
      {session?.user ? (
        <Button onClick={handleSignOut} disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <span>Wyloguj</span>
          )}
        </Button>
      ) : (
        ""
      )}
    </nav>
  )
}

export default Navbar
