import { getServerSession } from "next-auth"
import React from "react"
import { trpc } from "../_trpc/client"
import UserProfile from "@/components/UserProfile"
import { createCallerFactory } from "@/trpc/trpc"
import { appRouter } from "@/trpc"

const page = async () => {
  const session = await getServerSession()

  if (!session) return

  // 1. create a caller-function for your router
  const createCaller = createCallerFactory(appRouter)

  // 2. create a caller using your `Context`
  const caller = createCaller({
    foo: "bar",
  })

  // 3. use the caller to add and list posts
  const user = await caller.user.get(session.user!)

  return (
    <div className="flex h-full items-center justify-center">
      <UserProfile user={user} />
    </div>
  )
}

export default page
