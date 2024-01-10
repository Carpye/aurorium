"use client"
import { signOut, useSession } from "next-auth/react"
import { Button } from "./ui/button"

const Navbar = () => {
  const { data: session } = useSession()

  return (
    <nav className="flex w-full items-center justify-between gap-4 border-b px-8 py-4">
      <div className="p-4 font-bold text-2xl">Aurorium</div>
      {session?.user ? <Button onClick={() => signOut()}>Wyloguj</Button> : ""}
    </nav>
  )
}

export default Navbar
