import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import ClickUp from "next-auth/providers/click-up"
import Credentials from "next-auth/providers/credentials"
import { CredentialsSignin } from "next-auth"
import { loginSchema } from "./schemas/auth"
import { userApi } from "./api/user"
import { AxiosError } from "axios"

declare module "next-auth" {
  interface User extends UserInfo {
    token?: string
  }
  interface Session {
    sessionToken?: string
    userId?: string
  }
}
class CustomError extends CredentialsSignin {
  constructor(message?: string, options?: Record<string, unknown>) {
    super(message, options)
    if (message)
      this.code = message
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
          throw new CustomError(validatedFields.error.errors[0].message)
        }
        if (credentials.step == 0) {
          // 验证用户名/邮箱是否存在

        }
        try {
          const user = await userApi.login(validatedFields.data)

          if (!user) return null
          return user
        } catch (e: AxiosError | any) {
          // return e.response.data
          throw new CustomError(e.response.data.detail)
        }
      }
    }),
    // 自定义验证码登录
    Credentials({
      name: "emial-code",
      credentials: {
        code: {
          label: "Verification Code",
          type: "text"
        },
        email: {
          label: "Email",
          type: "text"
        }
      },
      async authorize(credentials) {
        const validatedFields = loginSchema.safeParse(credentials)
        if (!validatedFields.success) {
          throw new Error("Invalid credentials")
        }
        return null
      }
    })
  ],
  callbacks: {
    async signIn({ account }) {

      if (account?.provider == "credentials")
        return true
      if (!account?.access_token) return false

      const session = await auth()

      if (session?.user) {
        // 绑定第三方账号
        try {
          await userApi.link2provider(account?.provider, account?.access_token)
          return true
        } catch (e: AxiosError | any) {
          throw new CustomError(e.response.data.detail)

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
        const refreshedUser = await userApi.getUserInfo()
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

      const user = token.user as UserInfo
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
  trustHost: true
})