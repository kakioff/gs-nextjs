import { auth } from "@/auth";
import getAvatar from "@/hooks/getAvatar";
import { Avatar, AvatarProps } from "@nextui-org/react";
import clsx from "clsx";

interface Props extends AvatarProps {
    className?: string
}
export default async function UserAvatar({
    className = "",
    ...props
}: Props) {
    let user = await auth()
    let avatarUrl = getAvatar(user?.user?.id);
    return <Avatar src={avatarUrl} alt="avatar" className={clsx("rounded-full", className)} {...props} />
}