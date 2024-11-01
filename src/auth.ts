import NextAuth, { User } from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Wechat from "next-auth/providers/wechat"
import ClickUp from "next-auth/providers/click-up"
import Credentials from "next-auth/providers/credentials"
import { loginSchema } from "./schemas/auth"
import { userApi } from "./api/user"
import { RegisterFormType } from "./types/auth"

declare module "next-auth" {
  interface User extends UserInfo {
    token?: string
  }
  interface Session {
    sessionToken?: string
    userId?: string
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/user/login",
    signOut: "/user/logout",
    newUser: "/user/register",
    error: "/user/login"
  },
  providers: [
    GitHub, Google, ClickUp({
      clientId: process.env.AUTH_CLICKUP_ID,
      clientSecret: process.env.AUTH_CLICKUP_SECRET
    }),
    Credentials({
      async authorize(credentials) {

        const validatedFields = loginSchema.safeParse(credentials)
        if (!validatedFields.success) {
          throw new Error("Invalid credentials")
        }
        try {
          let user = await userApi.login(validatedFields.data)

          if (!user) return null
          return user
        } catch (e: any) {
          console.error("Credentials Error:", e.request);
          return null
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider == "credentials")
        return true
      if (!account?.access_token) return false

      let session = await auth()

      if (session?.user) {
        // 绑定第三方账号
        try {
          await userApi.link2provider(account?.provider, account?.access_token)
          return true
        } catch (e) {
          console.log(e);
          return false

        }
      }

      try {
        await userApi.OAuthLogin(account.provider, account.access_token)

        return true
      } catch (e) {
        console.log("Auth Call back Error:", e);

        return false
      }
    },
    async jwt({ token, user, account, trigger }) {
      if (trigger == "update") {
        let refreshedUser = await userApi.getUserInfo()
        user = {
          ...(user || token.user),
          ...refreshedUser
        }
        
      }
      try {
        // if (!user)
        //   user = await userApi.getUserInfo()
        // if (!user) return token
        if (account && account?.provider != "credentials" && !user?.token) {
          user = await userApi.OAuthLogin(account.provider, account.access_token)

        }
      } catch (e) {
        console.log("Auth Callback Error:", e);
      }

      if (user) {
        token.user = user
      }
      // token.picture = user.avatar

      return token
    },
    async session({ session, token }) {

      let user = token.user as UserInfo
      session.sessionToken = user.token
      session.user = user as any
      session.userId = user.id

      return session
    },
    // authorized({ auth, request: { nextUrl } }) {
    //   const isLoggedIn = !!auth?.user
    //   const isOnProtected = !nextUrl.pathname.startsWith("/login")

    //   if (isOnProtected) {
    //     if (isLoggedIn) return true
    //     return false
    //   } else if (isLoggedIn) {
    //     return Response.redirect(new URL("/", nextUrl))
    //   }
    //   return true
    // }
  },
})