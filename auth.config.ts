import { userApi } from "@/api/user"
import { loginSchema } from "@/schemas/auth"
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"


export default {
    providers: [
        GitHub, Google,
        Credentials({
            async authorize(credentials) {
                const validatedFields = loginSchema.safeParse(credentials)
                if (!validatedFields.success) {
                    throw new Error("Invalid credentials")
                }

                let user = await userApi.login(validatedFields.data)

                if (!user) return null
                return user
            }
        })
    ]
} satisfies NextAuthConfig