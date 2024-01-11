import { z } from "zod"

export const ProfileValidator = z.object({
  name: z
    .string({
      required_error: "Pole nie może być puste.",
    })
    .min(2, {
      message: "Pole musi się skłądać z min. 2 znaków.",
    }),
  lastname: z
    .string({
      required_error: "Pole nie może być puste.",
    })
    .min(2, {
      message: "Pole musi się skłądać z min. 2 znaków.",
    }),
  email: z.string().email({
    message: "Pole musi zawierać poprawny adres email.",
  }),
})
