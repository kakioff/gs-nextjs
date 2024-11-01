import { auth } from "@/auth";
import UButton from "@/components/ui/Button";
import Link from "next/link";
import UserAvatar from "../user/avatar";
import { Button } from "@nextui-org/react";

interface Props {
    withAvatar?: boolean
}
export default async function LoginBtn({
    withAvatar = false
}: Props) {
    let session = await auth()

    if (session?.user)
        return <Button variant="light" href="/user" as={Link}>
            {withAvatar && <UserAvatar className="w-7 h-7"/>}
            {session.user.name}
        </Button>
    else
        return <UButton variant="light" href="/user/login" as={Link}>Login</UButton>

}