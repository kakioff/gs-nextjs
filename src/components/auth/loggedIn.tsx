"use client"
import { signOut } from "next-auth/react"
import { Avatar, Button } from "@nextui-org/react"
import { Session } from "next-auth"
import { useRouter } from "next/navigation"
import getAvatar from "@/hooks/getAvatar"

export default function LoggedIn({
    user,
    isSignOut,
    redirectTo = "/"
}: {
    user?: Session["user"],
    isSignOut?: boolean,
    redirectTo?: string
}) {
    const router = useRouter()
    if (!user) return <>not logged in</>

    const avatar = getAvatar(user.id)

    const controller = isSignOut ? <>
        <Button onClick={() => signOut()} color="danger" className="w-5/6 mt-5">退出</Button>
    </> : <>
        <Button onClick={() => { router.push(redirectTo) }} className="my-3 w-5/6">使用此账号登录</Button>
        <Button onClick={() => signOut()} color="danger" className="w-5/6">切换账号</Button>
    </>
    return <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">{!isSignOut?'已登录!':'退出登录?'}</h1>
        <p className="flex flex-col items-center text-lg mt-5">
            <Avatar name={user.name || "Avatar"} src={avatar} className="text-2xl font-bold" />
            <span className="ml-2 text-lg font-bold">{user.name}</span>
        </p>
        {controller}
    </div>
}