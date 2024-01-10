import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { SignUpValidator } from "@/lib/validators/signup"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "../ui/input"
import { toast } from "sonner"
import { signIn } from "next-auth/react"
import { trpc } from "@/app/_trpc/client"
import { Button } from "../ui/button"

export default function SignUpForm() {
  const form = useForm<z.infer<typeof SignUpValidator>>({
    resolver: zodResolver(SignUpValidator),
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const signUp = trpc.signUp.useMutation({
    onSuccess: ({ user, credentials }) => {
      signIn("credentials", {
        email: credentials.email,
        password: credentials.password,
        callbackUrl: "/profile",
      })
    },
    onError: ({ message }) => {
      toast.error(
        message === "FORBIDDEN"
          ? "Użytkownik już istnieje. Zamiast tego spróbuj się zalogować."
          : "Wystąpił nieoczekiwany błąd. Spróbuj ponownie później.",
      )
    },
  })

  function onSubmit(values: z.infer<typeof SignUpValidator>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    signUp.mutate(values)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-0 space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imię</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nazwisko</FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="example@aurorium.com"
                  {...field}
                  type="text"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Hasło</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Powtórz hasło</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="self-center">
          Zarejestruj
        </Button>
      </form>
    </Form>
  )
}
