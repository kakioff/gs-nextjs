import { NextRequest } from "next/server"
// import authConfig from "../auth.config"
import { auth } from "./auth"
import { PROTECTED_ROUTES, SKIP_AUTH_ROUTES } from "./routers"

// Use only one of the two middleware options below
// 1. Use middleware directly
// export const { auth: middleware } = NextAuth(authConfig)

// 2. Wrapped middleware option
// const { auth } = NextAuth(authConfig)
export default auth(async function middleware(req: NextRequest) {
    const session = await auth();
    for (const protect_route of PROTECTED_ROUTES) {
        if (new RegExp(protect_route).test(req.nextUrl.pathname)) {
            if (!SKIP_AUTH_ROUTES.includes(req.nextUrl.pathname) && !session?.user) {
                return Response.redirect(new URL('/user/login', req.nextUrl.origin).href + `?callbackUrl=${req.nextUrl}`)
            }
        }
    }

})
export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|.*\\.png$).*)',
        '/user(.*)'
    ]
}