import { auth } from "@/auth"

export default auth((req) => {
    // req.auth
})

// Optionally, don't invoke Middleware on some paths
export const config = {
    // Skip Next.js internals and all static files, unless found in search params
    matcher: ["/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)"],
}