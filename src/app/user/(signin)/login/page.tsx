import { auth } from "@/auth";
import LoginForm from "@/components/auth/loginForm";
import GoBackBtn from "@/components/tools/goBackBtn";
import Alert from "@/components/ui/alert";

export default async function LoginPage({ searchParams: {
    callbackUrl,
    error,
    code
} }: React.PropsWithChildren<{
    searchParams: {
        callbackUrl?: string,
        error?: string,
        code?: string
    }
}>) {
    const session = await auth()
    const alert = <Alert className="mb-4" text={`${session?.user ? '绑定' : '登录'}失败，${code || '重新尝试或换个方式'}`} color="warning" />,
        form = <LoginForm redirectTo={callbackUrl} />,
        goback = <GoBackBtn color="primary" className=" mx-auto mt-10 mb-2 flex " />
    if (error) {
        return <div>
            {alert}
            {!session?.user ? form : goback}
        </div>
    }
    return <div>
        {form}
    </div>
}