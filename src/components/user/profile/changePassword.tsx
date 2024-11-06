import { Button, ButtonGroup, Input, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react"
import { FormEvent, useState } from "react"
import Alert from "@/components/ui/alert"
import clsx from "clsx"
import { userApi } from "@/api/user"
import { AxiosError } from "axios"

interface ChangeFormProps {
    className?: string
    hasNoPassword?: boolean
    onModalClose?(): void
}
function ChangeForm({
    className,
    hasNoPassword,
    onModalClose
}: ChangeFormProps) {
    const [errStr, setErrStr] = useState(''),
        [errors, setErrors] = useState({
            oldPassword: '',
            newPassword: '',
            repeatPassword: ''
        }),
        [isLoading, setLoading] = useState(false)

    const submitForm = async (e: FormEvent) => {
        e.preventDefault()
        setErrStr('')
        setErrors({
            oldPassword: '',
            newPassword: '',
            repeatPassword: ''
        })
        setLoading(true)
        try {
            //    数字、字母、符号至少包含2种，长度8-16位
            const { newPassword, oldPaddword, repeatPassword } = e.target as HTMLFormElement

            if (!hasNoPassword && !oldPaddword.value) {
                setErrors({
                    ...errors,
                    oldPassword: '旧密码不能为空'
                })
                return
            }
            if (!newPassword.value) {
                setErrors({
                    ...errors,
                    newPassword: '新密码不能为空'
                })
                return
            }
            if (!hasNoPassword && oldPaddword.value === newPassword.value) {
                setErrors({
                    ...errors,
                    newPassword: '新密码不能与旧密码相同'
                })
                return
            }
            if (
                (/[0-9]/.test(newPassword.value) && /[a-zA-Z]/.test(newPassword.value))
                || (/[0-9]/.test(newPassword.value) && /[!@#$%^&*]/.test(newPassword.value))
                || (/[a-zA-Z]/.test(newPassword.value) && /[!@#$%^&*]/.test(newPassword.value))
            ) {
                if (newPassword.value.length < 8 || newPassword.value.length > 16) {
                    setErrors({
                        ...errors,
                        newPassword: '密码长度必须在8-16位之间'
                    })
                    return
                }
            } else {
                setErrors({
                    ...errors,
                    newPassword: '密码必须包含数字、字母、符号至少包含2种'
                })
                return
            }
            if (newPassword.value !== repeatPassword.value) {
                setErrors({
                    ...errors,
                    repeatPassword: '两次输入的密码不一致'
                })
                return
            }
            // 验证完成，提交表单
            const res = await userApi.resetPassword({
                passwd: newPassword.value,
                old_passwd: oldPaddword.value
            })
            console.log("提交表单", res);

        }
        catch (e: AxiosError | any) {
            setErrStr(e.response?.data?.detail || '修改密码失败')
        }
        finally {
            setLoading(false)
        }

    },
        closeForm = () => {
            onModalClose?.()
            setErrStr('')
            setErrors({
                oldPassword: '',
                newPassword: '',
                repeatPassword: ''
            })
        }
    return <form onSubmit={submitForm} className={clsx(className, "flex flex-col gap-4 items-end")}>
        {!hasNoPassword && <Input autoFocus type="password" name="oldPaddword" label="旧密码" variant="underlined"
            errorMessage={errors.oldPassword} isInvalid={!!errors.oldPassword} />}
        <Input type="password" autoFocus label="新密码" name="newPassword" variant="underlined"
            errorMessage={errors.newPassword}
            isInvalid={!!errors.newPassword} />
        <Input type="password" label="重复新密码" name="repeatPassword" variant="underlined"
            errorMessage={errors.repeatPassword}
            isInvalid={!!errors.repeatPassword} />

        {errStr && <Alert color="danger" text={errStr} className="w-full" />}
        <ButtonGroup isDisabled={isLoading}>
            <Button type="submit" color="primary" isLoading={isLoading}>提交</Button>
            <Button type="reset" onClick={closeForm}>
                {onModalClose ? '取消' : '重置'}
            </Button>
        </ButtonGroup>
    </form>
}

interface Props {
    as?: any
    children?: React.ReactNode
    asButton?: boolean
    className?: string
    hasNoPassword?: boolean
    onOpen?(): void
    onChange?(password: string): void
    onClose?(): void
}
export default function ChangePassword({
    className,
    children,
    as: Command = Button,
    asButton = false,
    hasNoPassword: noPassword,
    onChange,
    onClose,
    ...props
}: Props) {
    const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure()

    if (asButton) {
        return <>
            <Command onClick={onModalOpen} className={className} {...props}>{children || "修改密码"}</Command>
            <Modal onOpenChange={onModalOpen} onClose={onModalClose} isOpen={isModalOpen}>
                <ModalContent>
                    <ModalHeader>
                        修改密码
                    </ModalHeader>
                    <ModalBody>
                        <ChangeForm onModalClose={onModalClose} hasNoPassword={noPassword} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    }
    return (
        <>
            <ChangeForm className={clsx(className, "max-w-[300px] w-full")} hasNoPassword={noPassword} onModalClose={onClose} />
        </>
    )

}