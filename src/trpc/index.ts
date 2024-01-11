import { db } from "@/lib/db"
import { SignUpValidator } from "@/lib/validators/signup"
import { TRPCError } from "@trpc/server"
import bcrypt from "bcrypt"
import {
  authorizedProcedure,
  createCallerFactory,
  publicProcedure,
  router,
} from "./trpc"
import { z } from "zod"
import { Session } from "next-auth"
import { ProfileValidator } from "@/lib/validators/profile"

export const appRouter = router({
  user: router({
    get: authorizedProcedure
      .input(
        z.object({
          name: z.string().nullish(),
          email: z.string().nullish(),
          iamge: z.string().nullish(),
        }),
      )
      .query(async (options) => {
        const { user } = options.ctx

        const dbUser = await db.user.findUnique({
          where: {
            email: user.email!,
          },
        })

        if (!dbUser) throw new TRPCError({ code: "NOT_FOUND" })

        return dbUser
      }),
    create: publicProcedure.input(SignUpValidator).mutation(async (options) => {
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
    update: authorizedProcedure
      .input(ProfileValidator)
      .mutation(async (options) => {
        const { email, name, lastname } = options.input

        const user = await db.user.findUnique({
          where: {
            email,
          },
        })

        if (!user) throw new TRPCError({ code: "NOT_FOUND" })

        const updatedUser = await db.user.update({
          where: {
            email,
          },
          data: {
            name,
            lastname,
            email,
          },
        })

        return updatedUser
      }),
  }),
})

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter
