"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import SignInForm from "./SignInForm"
import SignUpForm from "./SignUpForm"

const Forms = () => {
  return (
    <Tabs defaultValue={"signIn"} className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signIn">Logowanie</TabsTrigger>
        <TabsTrigger value="signUp">Rejestracja</TabsTrigger>
      </TabsList>
      <TabsContent value="signIn">
        <Card>
          <CardHeader>
            <CardTitle>Logowanie</CardTitle>
            <CardDescription>Zaloguj się do serwisu Aurorium</CardDescription>
          </CardHeader>
          <CardContent>
            <SignInForm />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="signUp">
        <Card>
          <CardHeader>
            <CardTitle>Rejestracja</CardTitle>
            <CardDescription>
              Zarejestruj się w serwisie Aurorium
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignUpForm />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="signUp"></TabsContent>
    </Tabs>
  )
}

export default Forms
