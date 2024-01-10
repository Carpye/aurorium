import { db } from "@/lib/db"
import { SignUpValidator } from "@/lib/validators/signup"
import { TRPCError } from "@trpc/server"
import bcrypt from "bcrypt"
import { publicProcedure, router } from "./trpc"

export const appRouter = router({
  signUp: publicProcedure.input(SignUpValidator).mutation(async (options) => {
    const { email, password: nakedPassword, name, lastname } = options.input

    const user = await db.user.findUnique({
      where: {
        email,
      },
    })

    if (user) throw new TRPCError({ code: "FORBIDDEN" })

    const password = await bcrypt.hash(nakedPassword, 10)

    const createdUser = await db.user.create({
      data: {
        name,
        lastname,
        email,
        password,
      },
    })

    return {
      user: createdUser,
      credentials: {
        email,
        password: nakedPassword,
      },
    }
  }),
})
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter
