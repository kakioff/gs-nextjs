"use client"
import { Button, Divider, Input } from "@nextui-org/react"
import clsx from "clsx"

import { useMemo, useState, useTransition } from "react";
import { loginSchema, registerSchema } from "@/schemas/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormType, RegisterFormType } from "@/types/auth";
import { AxiosError } from "axios";
import Alert from "../ui/alert";
import GithubIcon from "../icones/github";
import ULink from "../ui/Link";
import { signIn, useSession } from "next-auth/react";
import LoggedIn from "./loggedIn";
import ClickUp from "../icones/clickUp";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { useRouter } from "next/navigation";
import { userApi } from "@/api/user";

interface Props {
    className?: React.HTMLAttributes<HTMLDivElement>["className"]
    redirectTo?: string
    isRegister?: boolean
}


function LoginMethods({
    redirectTo = "/"
}: {
    redirectTo?: string
}) {
    const [loginMethods, setLoginMethods] = useState([{
        name: "github",
        icon: GithubIcon,
        loading: false
        // }, {
        //     name: "google",
        //     icon: GoogleIcon,
        //     loading: false
    }, {
        name: "click-up",
        icon: ClickUp,
        loading: false
        // }, {
        //     name: "wechat",
        //     icon() {
        //         return <span>wechat</span>
        //     },
        //     loading: false
    }]),
        loginEvent = async (item: typeof loginMethods[number]) => {
            try {
                if (loginMethods.find(i => i.loading)) return
                loginMethods.find(i => i.name === item.name)!.loading = true
                setLoginMethods([...loginMethods])
                await signIn(item.name, {
                    redirectTo
                })
            } catch (err) {
                console.log("Login error: ", err);
            }
        },
        methods = useMemo(() => loginMethods.map(item => <div key={item.name}
            onClick={() => loginEvent(item)}
            className={clsx({ "animate-bounce": item.loading }, "w-full transition-all flex items-center justify-center shadow dark:shadow-white/45 rounded-md p-2 cursor-pointer select-none")}>
            <item.icon />
        </div>), [loginMethods])
    return <div className="flex flex-row justify-between gap-2 mt-4">
        {methods}
    </div>
}

function LoginFormContent({
    isPadding, setError, setSuccess, startTransition, redirectTo, errStr,
    succStr
}: any) {
    // TODO 使用邮箱验证码登录
    const router = useRouter(),
        [step, setStep] = useState(0),
        {
            register, handleSubmit, formState: { errors }
        } = useForm<LoginFormType>({
            resolver: zodResolver(loginSchema),
            defaultValues: {
                email: "asdf@asdf.com",
                password: "alsidbf"
            }
        }),
        formSubmit = (values: LoginFormType) => {
            setError("")
            setSuccess("")

            startTransition(async () => {
                try {
                    const res = await signIn("credentials", {
                        // redirectTo,
                        redirect: false,
                        ...values,
                        step
                    })
                    if (res?.error) {
                        return setError(res.code)
                    }
                    // switch (step) {
                    //     case 0:
                    //         setStep(1)
                    //         break
                    //     default:
                    setSuccess("登录成功")
                    window.open(redirectTo, "_self")
                    // }
                } catch (err) {
                    console.log("login error:", err);
                }
            })
        }
    const btn = () => {
        // switch (step) {
        //     case 0:
        //         return <Button type="submit" color="primary" variant="bordered" className="mt-4 rounded-md" isLoading={isPadding}>
        //             下一步
        //         </Button>
        //     default:
        return <Button type="submit" color="primary" className="mt-4 rounded-md" isLoading={isPadding}>登录</Button>
        // }
    }
    return <form onSubmit={handleSubmit(formSubmit)}
        className={clsx('flex flex-col gap-4')}>
        <Input {...register("email")}
            type="username" label="邮箱" variant="underlined"
            autoFocus isDisabled={isPadding}
            errorMessage={errors.email?.message} isInvalid={!!errors.email?.message} />

        <Input {...register("password")}
            type="password" label="密码" variant="underlined"
            isDisabled={isPadding}
            errorMessage={errors.password?.message} isInvalid={!!errors.password?.message} />

        {errStr && <Alert color="danger" text={errStr} />}
        {succStr && <Alert color="success" text={succStr} />}
        {btn()}

    </form>
}

function RegisterFormContent({
    isPadding, setError, setSuccess, startTransition, redirectTo, errStr,
    succStr
}: any) {
    const {
        register, handleSubmit, formState: { errors }
    } = useForm<RegisterFormType>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "asdf@asdf.com",
            password: "alsidbf",
            username: "asdf",
            phone: "10293847562"
        }
    }),
        formSubmit = (values: RegisterFormType) => {
            setError("")
            setSuccess("")

            startTransition(async () => {
                try {
                    await userApi.register(values)
                    const res = await signIn("credentials", {
                        // redirectTo,
                        redirect: false,
                        email: values.email,
                        password: values.password
                    })
                    if (res?.error) {
                        return setError(res.code)
                    }
                    // switch (step) {
                    //     case 0:
                    //         setStep(1)
                    //         break
                    //     default:
                    setSuccess("注册成功")
                    window.open(redirectTo, "_self")
                    // router.refresh()
                    // router.push("/")
                    // }

                } catch (err: AxiosError | any) {
                    console.log("login error:", err);
                    setError(err.response?.data.detail || "注册失败")
                }
            })
        }
    return <form onSubmit={handleSubmit(formSubmit)}
        className={clsx('flex flex-col gap-4')}>
        <Input {...register("username")}
            type="username" label="用户名" variant="underlined"
            isDisabled={isPadding}
            errorMessage={errors.username?.message} isInvalid={!!errors.username?.message} />
        <Input {...register("email")}
            type="username" label="邮箱" variant="underlined"
            isDisabled={isPadding}
            errorMessage={errors.email?.message} isInvalid={!!errors.email?.message} />
        <Input {...register("phone")}
            type="phone" label="手机号" variant="underlined"
            isDisabled={isPadding}
            errorMessage={errors.phone?.message} isInvalid={!!errors.phone?.message} />
        <Input {...register("password")}
            type="password" label="密码" variant="underlined"
            isDisabled={isPadding}
            errorMessage={errors.password?.message} isInvalid={!!errors.password?.message} />
        {errStr && <Alert color="danger" text={errStr} />}
        {succStr && <Alert color="success" text={succStr} />}
        <Button type="submit" color="primary" className="mt-4 rounded-md" isLoading={isPadding}>注册</Button>

    </form>
}

export default function LoginForm({
    className = "",
    redirectTo = "/",
    isRegister = false
}: Props) {
    const { data: session, status } = useSession(),
        router = useRouter(),
        title = isRegister ? "注册" : "登录"

    const [isPadding, startTransition] = useTransition(),
        [errStr, setError] = useState<string>(),
        [succStr, setSuccess] = useState<string>()

    if (status === "loading") {
        return <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold text-center mb-4 flex items-center mt-2">
                <Icon icon="mdi:loading" className="animate-spin mr-2 text-3xl" />
                Loading...
            </h2>
        </div>
    } else if (status === "authenticated" && session.user) {
        if (isRegister) {
            router.replace("./login")
            return <>Loading</>
        }
        return <LoggedIn user={session.user} />
    }
    const formProps = {
        isPadding, setError, setSuccess, startTransition, redirectTo, errStr, succStr
    }
    return <div className={clsx(className)}>
        <h2 className="text-2xl font-bold text-center mb-4">
            {isPadding ? `正在${title}...` : title}
        </h2>
        {isRegister ? <RegisterFormContent {...formProps} /> : <LoginFormContent {...formProps} />}
        <LoginMethods redirectTo={redirectTo} />

        <div className="flex flex-row justify-center items-center text-sm mt-4 gap-3">
            {!isRegister && <ULink href="#" className="text-foreground/50 hover:underline hover:text-foreground/80">忘记密码</ULink>}
            <Divider orientation="vertical" />
            <ULink href={isRegister ? "./login" : "./register"} className="text-foreground/50 hover:underline hover:text-foreground/80">
                {isRegister ? '已有账号，去登录' : '创建账号'}
            </ULink>
        </div>
    </div>

}
