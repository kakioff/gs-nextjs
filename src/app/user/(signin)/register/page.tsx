import LoginForm from "@/components/auth/loginForm";
import RegisterForm from "@/components/auth/registerForm";

export default function RegisterPage({ searchParams }: React.PropsWithChildren<{
    searchParams: {
        callbackUrl?: string
    }
}>) {

    return <div>
        <LoginForm isRegister redirectTo={searchParams?.callbackUrl} />
    </div>
}