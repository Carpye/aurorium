import { z } from "zod"
import { ProfileValidator } from "./profile"

export const SignUpValidator = ProfileValidator.extend({
  password: z.string().min(6, {
    message: "Hasło musi się składać z min. 6 znaków.",
  }),
  confirmPassword: z.string(),
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "Hasła muszą być takie same.",
      path: ["confirmPassword"],
    })
  }
})
