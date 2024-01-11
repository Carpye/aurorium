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
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

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
    onSuccess: async ({ user, credentials }) => {
      const res = await signIn("credentials", {
        email: credentials.email,
        password: credentials.password,
        // callbackUrl: "/profile",
        redirect: false,
      })

      if (res?.ok) {
        setIsLoading(false)
        router.push("/profile")
      }
    },
    onError: ({ message }) => {
      setIsLoading(false)
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
    setIsLoading(true)
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
        <Button type="submit" className="self-center" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className=" animate-spin" />
          ) : (
            <span>Zarejestruj</span>
          )}
        </Button>
      </form>
    </Form>
  )
}
