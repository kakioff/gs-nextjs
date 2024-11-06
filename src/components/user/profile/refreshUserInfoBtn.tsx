"use client"
import UButton from "../ui/Button";
import { useSession } from "next-auth/react";

interface Props extends React.ComponentProps<typeof UButton> {
    redirect?: boolean
}
export default function RefreshUserInfoBtn({
    children,
    redirect = true,
    ...props
}: Props) {
    const { update } = useSession()
    
    const getUserInfo = async () => {
        await update(true)
        if(redirect){
            location.reload()
        }
    }
    return <UButton onClick={getUserInfo} {...props}>
        {children || '刷新用户信息'}
    </UButton>
}