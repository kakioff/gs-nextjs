"use client"

import { Button, ButtonProps, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react"
import UpdateUserInfo from "./update"
import { useSession } from "next-auth/react"

interface Props extends ButtonProps {

}
/**
 * 修改资料模态框
 * 
 */
export default function UpdateWithModal({
    as: Component = Button,
    ...props
}: Props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const session = useSession().data
    // if (!session) return <Component {...props}>加载..</Component>
    return <>
        <Component {...props} onClick={session && onOpen}>{props.children || "修改资料"}</Component>
        <Modal isOpen={isOpen} onClose={onClose} onOpenChange={onOpen}>
            <ModalContent>
                <ModalHeader>
                    <h2>修改资料</h2>
                </ModalHeader>
                <ModalBody>
                    <UpdateUserInfo userInfo={session?.user} onClose={onClose} />
                </ModalBody>
            </ModalContent>
        </Modal>
    </>
}