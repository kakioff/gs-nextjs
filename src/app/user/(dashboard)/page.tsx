import { auth } from "@/auth"
import SignOutBtn from "@/components/auth/signOutBtn"
import UserAvatar from "@/components/user/avatar"
import RefreshUserInfoBtn from "@/components/user/refreshUserInfoBtn"
import Link2Account from "@/components/user/linkAccount"
import { ButtonGroup } from "@nextui-org/react"
import UButton from "@/components/ui/Button"

export default async function user() {
    const session = await auth()

    const providers = [{
        name: "click-up",
        label: "ClickUp"
    }, {
        name: "github",
        label: "GitHub"
    }]
    const getProviderName = (provider: any) => {
        if (!session?.user) return ""
        // @ts-ignore
        if (!session.user[provider]) return ""
        // @ts-ignore
        return session.user[provider].name
    }
    return <>
        <UserAvatar isBordered />
        <p>{session?.user?.name}</p>
        <div>
            {providers.map(provider => <p className="my-1 flex flex-row items-center gap-4">
                {provider.label}:
                <span>
                    {
                        <>
                            {getProviderName(provider.name)}
                        </> || <>
                            <Link2Account provider={provider.name} variant="light">
                                连接
                            </Link2Account>
                        </>
                    }
                </span>
            </p>)}
            <div>
                <ButtonGroup>
                    <RefreshUserInfoBtn redirect/>
                    <SignOutBtn />
                </ButtonGroup>
            </div>
        </div>
    </>
}