import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { TRPCError, initTRPC } from "@trpc/server"
import { getServerSession } from "next-auth"
/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.create()
const middleware = t.middleware
/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */

const isAuth = middleware(async (opts) => {
  const session = await getServerSession()

  if (!session?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }

  return opts.next({
    ctx: {
      user: session.user,
    },
  })
})

export const router = t.router
export const publicProcedure = t.procedure

export const authorizedProcedure = t.procedure.use(isAuth)
