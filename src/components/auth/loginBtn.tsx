import { auth, signOut } from "@/auth";
import UButton from "@/components/ui/Button";
import Link from "next/link";
import UserAvatar from "../user/avatar";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import UDropdown from "../ui/dropdown";
import UserDropdownItems from "../user/userDropdownItem";

interface Props {
    withAvatar?: boolean
}
export default async function LoginBtn({
    withAvatar = false
}: Props) {
    const session = await auth();

    if (session?.user)
        return <UserDropdownItems>
            <Button variant="light">
                {withAvatar && <UserAvatar className="w-7 h-7" />}
                {session.user.name}
            </Button>
        </UserDropdownItems>
    else
        return <UButton variant="light" href="/user/login" as={Link}>Login</UButton>

}