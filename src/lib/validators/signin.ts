import { z } from "zod"

export const SignInValidator = z.object({
  email: z.string().email({
    message: "Pole musi zawierać poprawny adres email.",
  }),
  password: z.string().min(6, {
    message: "Hasło musi się składać z min. 6 znaków.",
  }),
})
