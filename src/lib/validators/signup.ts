import { z } from "zod"

export const SignUpValidator = z
  .object({
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
    password: z.string().min(6, {
      message: "Hasło musi się składać z min. 6 znaków.",
    }),
    confirmPassword: z.string(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Hasła muszą być takie same.",
        path: ["confirmPassword"],
      })
    }
  })
