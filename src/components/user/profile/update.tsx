"use client"
import { userApi } from "@/api/user";
import { updateProfileSchema } from "@/schemas/auth";
import { UpdateProfileFormType } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, ButtonGroup, Input } from "@nextui-org/react";
import { AxiosError } from "axios";
import { User } from "next-auth";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import Alert from "@/components/ui/alert";
import ImagePicker from "@/components/ui/imagePicker";
import getAvatar from "@/hooks/getAvatar";
import { useSession } from "next-auth/react";
interface Props {
    userInfo?: UserInfo | User | any
    onClose?: () => void
}
export default function UpdateUserInfo({
    userInfo,
    onClose
}: Props) {
    const { update: updateUserInfo } = useSession()
    const [newAvatar, setNewAvatar] = useState<HTMLImageElement>()
    const { register, handleSubmit, formState: { errors } } = useForm<UpdateProfileFormType>({
        resolver: zodResolver(updateProfileSchema),
        defaultValues: {
            ...userInfo
        }
    }),
        [error, setErrors] = useState<string>("")
    const updateInfo: SubmitHandler<UpdateProfileFormType> = async (values) => {
        setErrors("")
        try {
            if (newAvatar) {
                // 上传头像
                const res = await fetch(newAvatar.src)
                const resBolb = await res.blob()
                const file = new File([resBolb], "avatar", { type: resBolb.type })

                try {

                    await userApi.updateAvatar(file)
                } catch (e: AxiosError | any) {
                    console.log("上传头像失败", e.response.data);
                    setErrors(e.response.data.detail || "上传头像失败")
                    return
                }
            }
            await userApi.updateProfile(values)
            console.log("修改成功");
            await updateUserInfo(true)
            window.location.reload()
        } catch (e: AxiosError | any) {
            console.log("修改失败", e.response.data);
            setErrors(e.response.data.detail || "修改失败")
        }

    }
    return <form onSubmit={handleSubmit(updateInfo)} className="flex flex-col gap-3">
        <Input label="名字" {...register("name", { required: false })}
            errorMessage={errors["name"]?.message || ""}
            isInvalid={!!errors["name"]}
        />
        <Input label="邮箱" {...register("email", { required: false })}
            errorMessage={errors["email"]?.message || ""}
            isInvalid={!!errors["email"]}
        // endContent={<Button type="button">验证</Button>}
        />

        <p className="mt-2">
            {newAvatar ? '新头像：' : '更换头像'}
        </p>
        <ImagePicker crop defaultImage={getAvatar(userInfo?.id)} onChange={setNewAvatar} resetBtn />

        <div className="my-2">
            {error && <Alert color="danger" text={error} />}
        </div>
        <div className="text-right">
            <ButtonGroup>
                <Button type="submit" color="primary">提交</Button>
                <Button type="button" color="danger" onClick={onClose}>取消</Button>
            </ButtonGroup>
        </div>
    </form>
}