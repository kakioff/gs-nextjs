import { auth } from "@/auth";
import LoggedIn from "@/components/auth/loggedIn";

export default async function SignOutPage() {
    const session = await auth()
    return <div>
        <LoggedIn user={session?.user} isSignOut />
    </div>
}