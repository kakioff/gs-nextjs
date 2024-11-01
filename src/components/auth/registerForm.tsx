"use client"
import { Button, Divider, Input } from "@nextui-org/react"
import clsx from "clsx"

import { useState, useTransition } from "react";
import { registerSchema } from "@/schemas/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormType } from "@/types/auth";
import { userApi } from "@/api/user";
import { AxiosError } from "axios";
import Alert from "../ui/alert";
import GithubIcon from "../icones/github";
import GoogleIcon from "../icones/google";
import ULink from "../ui/Link";


interface Props {
    className?: React.HTMLAttributes<HTMLDivElement>["className"]
    redirectTo?: string
    isRegister?: boolean
}


function LoginMethods() {
    const loginMethods = [{
        name: "github",
        icon: GithubIcon,
        onClick: () => { }
    }, {
        name: "google",
        icon: GoogleIcon,
        onClick: () => { }
    }],
        methods = loginMethods.map(item => <div key={item.name} onClick={item.onClick} className="w-full flex items-center justify-center shadow dark:shadow-white/45 rounded-md p-2 cursor-pointer select-none">
            <item.icon />
        </div>)
    return <div className="flex flex-row justify-between gap-2 mt-4">
        {methods}
    </div>
}
export default function RegisterForm({
    className,
    redirectTo = "/"
}: Props) {
    const [isPadding, startTransition] = useTransition(),
        [errStr, setError] = useState<string>(),
        [succStr, setSuccess] = useState<string>(),
        {
            register, handleSubmit, formState: { errors }
        } = useForm<RegisterFormType>({
            resolver: zodResolver(registerSchema),
            defaultValues: {
                email: "11111@ss.com",
                password: "yan1029",
                username: "byron",
                phone: "12345678901"
            }
        })
    const funcs = {
        login(values: RegisterFormType) {
            setError("")
            setSuccess("")

            startTransition(async () => {
                try {
                    let res = await userApi.register(values)
                    console.log(res);
                    setSuccess("注册成功")
                } catch (err: AxiosError | any) {
                    let errData: ApiResponse<any> = err.response?.data
                    setError(errData.detail)
                }
            })
        }
    }
    return <div className={clsx(className)}>
        <h2 className="text-2xl font-bold text-center mb-4">
            {isPadding ? "正在注册..." : "注册"}
        </h2>
        <form onSubmit={handleSubmit(funcs.login)}
            className={clsx('flex flex-col gap-4')}>
            <Input {...register("username")}
                type="username" label="用户名" variant="underlined"
                autoFocus isDisabled={isPadding}
                errorMessage={errors.username?.message} isInvalid={!!errors.username?.message} />
            <Input {...register("password")}
                type="password" label="密码" variant="underlined"
                isDisabled={isPadding}
                errorMessage={errors.password?.message} isInvalid={!!errors.password?.message} />

            <Input {...register("email")}
                type="email" label="邮箱" variant="underlined"
                isDisabled={isPadding}
                errorMessage={errors.email?.message} isInvalid={!!errors.email?.message} />

            {/* <Input {...register("phone")}
                type="phone" label="手机号" variant="underlined"
                isDisabled={isPadding}
                errorMessage={errors.phone?.message} isInvalid={!!errors.phone?.message} /> */}

            {errStr && <Alert color="danger" text={errStr} />}
            {succStr && <Alert color="success" text={succStr} />}
            <Button type="submit" color="primary" className="mt-3 rounded-md" isLoading={isPadding}>注册</Button>
            <LoginMethods />

            <div className="flex flex-row justify-center text-foreground/90 items-center text-sm mt-4 ">
                <ULink href="./login" className="hover:underline">
                    已有账号?
                </ULink>
            </div>
        </form>
    </div>

}
