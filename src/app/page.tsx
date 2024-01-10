import Forms from "@/components/auth/Forms"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await getServerSession()
  if (session?.user) redirect("/profile")

  return (
    <div className="flex h-full items-center justify-center">
      <Forms />
    </div>
  )
}
