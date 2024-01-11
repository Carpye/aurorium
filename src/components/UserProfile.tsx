"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ProfileValidator } from "@/lib/validators/profile"
import { zodResolver } from "@hookform/resolvers/zod"
import { User } from "@prisma/client"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "./ui/button"
import { Loader2 } from "lucide-react"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"
import { useState } from "react"
import { trpc } from "@/app/_trpc/client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const UserProfile = ({ user }: { user: User }) => {
  const form = useForm<z.infer<typeof ProfileValidator>>({
    resolver: zodResolver(ProfileValidator),
    defaultValues: {
      name: user.name,
      lastname: user.lastname,
      email: user.email,
    },
  })

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const updateUser = trpc.user.update.useMutation({
    onSuccess: async (updatedUser) => {
      if (updatedUser) {
        setIsLoading(false)
        toast.success("Pomyślnie zaktualizowano dane profilu użytkownika.")
      }
    },
    onError: ({ message }) => {
      setIsLoading(false)
      toast.error(
        message === "NOT_FOUND"
          ? "Nie znaleziono użytkownika."
          : "Wystąpił nieoczekiwany błąd. Spróbuj ponownie później.",
      )
    },
  })

  async function onSubmit(values: z.infer<typeof ProfileValidator>) {
    setIsLoading(true)
    updateUser.mutate(values)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profil</CardTitle>
        <CardDescription>Twój profil użytkownika</CardDescription>
      </CardHeader>
      <CardContent>
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
                    <Input {...field} type="text" />
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
                    <Input {...field} type="text" />
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
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="self-center" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className=" animate-spin" />
              ) : (
                <span>Zmień dane</span>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default UserProfile
