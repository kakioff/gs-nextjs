import LoginForm from "@/components/auth/loginForm";

export default function RegisterPage({ searchParams }: React.PropsWithChildren<{
    searchParams: {
        callbackUrl?: string
    }
}>) {

    return <div>
        <LoginForm isRegister redirectTo={searchParams?.callbackUrl} />
    </div>
}