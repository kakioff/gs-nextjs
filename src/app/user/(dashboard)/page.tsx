import { auth } from "@/auth"
import UserAvatar from "@/components/user/avatar"
import Link2Account from "@/components/user/profile/linkAccount"
import { Card, CardBody, CardHeader } from "@nextui-org/react"
import styles from "./page.module.scss"
import ActionMenu from "@/components/user/page/actionMenu"
import { Suspense } from "react"
import Loading from "@/components/loading"

export default async function user() {
    const session = await auth()

    const providers = [{
        name: "click-up",
        label: "ClickUp"
    }, {
        name: "github",
        label: "GitHub"
    }]
    const getProviderName = ({ name: provider }: typeof providers[number]) => {
        if (!session?.user) return ""
        // @ts-expect-error session.user[provider] is not undefined
        if (!session.user[provider]) return ""
        // @ts-expect-error session.user[provider].name is not undefined
        return session.user[provider].name
    }
    return <div>
        <Suspense fallback={<Loading />}>
            <UserAvatar isBordered className="my-10 mx-auto" size="lg" />
        </Suspense>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-10">
            <Card className="min-w-[250px]">
                <CardHeader>
                    <h2 className="text-2xl font-bold">个人信息</h2>
                </CardHeader>
                <CardBody className="pl-10">
                    <p className={styles.info}>
                        <span>名字</span>
                        {session?.user?.name}
                    </p>
                    <p className={styles.info}>
                        <span>邮箱</span>
                        {session?.user?.email}
                    </p>
                    <p className={styles.info}>
                        <span>手机号</span>
                        {session?.user?.phone}
                    </p>
                    <p className={styles.info}>
                        <span>角色</span>
                        {session?.user?.role.label}
                    </p>
                    <p className={styles.info}>
                        <span>密码</span>
                        {session?.user?.has_password ? "已设置" : "未设置"}
                    </p>
                    {providers.map(provider => <p className={styles.info} key={provider.name}>
                        <span>{provider.label}</span>
                        <span>
                            {
                                getProviderName(provider) || <>
                                    <Link2Account provider={provider.name} variant="light">
                                        连接
                                    </Link2Account>
                                </>
                            }
                        </span>
                    </p>)}
                </CardBody>
            </Card>
            <Card className="my-2 ">
                <CardHeader>
                    <h2 className="text-2xl font-bold">操作</h2>
                </CardHeader>
                <CardBody>
                    <ActionMenu />
                </CardBody>
            </Card>
        </div>
    </div>
}

export const metadata = {
    title: "我自己"
}