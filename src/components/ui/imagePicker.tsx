import { useFileDialog, useToggle } from "@reactuses/core";
import { useMemo, useState } from "react";
import { Button, ButtonGroup, Image as UImage, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { Icon } from "@iconify-icon/react";
import CustomCropper from "../tools/cropper";

interface Props {
    multiple?: boolean
    accept?: string
    crop?: boolean
    defaultImage?: string
    children?: React.ReactNode
    resetBtn?: boolean
    onChange?: (files?: HTMLImageElement) => void
    onOpen?: () => void
    onClose?: () => void
    onReset?: () => void
}
export default function ImagePicker({
    multiple = false,
    accept = "image/*",
    crop = false,
    defaultImage,
    resetBtn = true,
    children,
    onChange,
    onOpen,
    onClose,
    onReset,
}: Props) {
    const [cropped, setCropped] = useToggle(false),
        [defaultImg, setDefaultImg] = useState(defaultImage),
        [croppedImg, setCroppedImg] = useState<HTMLImageElement>(),
        { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure(),
        [files, open, reset] = useFileDialog({
            accept,
            multiple,
        });
    const imgUrl = useMemo(() => {
        if (files && files?.length > 0)
            return URL.createObjectURL(files[0])
        else
            return ""
    }, [files])

    const selector = useMemo(() => {
        if ((!files || !cropped) && !defaultImg)
            return <div onClick={async () => {
                onOpen && onOpen()
                const f = await open()
                if (crop)
                    onModalOpen()
                else if (f) {
                    // setCroppedImg
                    const img = new Image();

                    img.src = URL.createObjectURL(f[0])
                    img.onload = () => {
                        setCroppedImg(img)
                        setCropped(true)
                        onChange && onChange(img)
                    }
                }

            }} className="w-full flex flex-col my-2 items-center h-40 justify-center border border-dashed relative border-foreground/50 hover:border-primary/50 select-none cursor-pointer rounded-md py-2 pb-4 text-foreground-500 hover:text-primary-300">
                <Icon icon="tabler:cloud-upload" className="text-[5rem]" />
                选择文件
                {resetBtn && <Button variant="ghost" className="absolute top-1 right-1" isIconOnly onClick={() => {
                    setDefaultImg(defaultImage)
                    onChange && onChange()
                    reset()
                }} >
                    <Icon icon="tabler:x" />
                </Button>}
                {children}
            </div>
        else
            return <div className="my-2 relative rounded-xl overflow-hidden group max-w-fit">
                <div onClick={() => {
                    setCropped(false)
                    setCroppedImg(undefined)
                    setDefaultImg(undefined)
                    onChange && onChange()
                    reset()
                }} className=" absolute rounded-xl left-0 top-0 inset-0 bg-foreground/30 z-[11] opacity-0 group-hover:opacity-100 group-hover:cursor-pointer flex flex-col transition-all items-center justify-center select-none text-danger backdrop-blur text-[.8rem]">
                    <Icon icon={defaultImg ? "tabler:reload" : "tabler:trash"} className="text-3xl " />
                    <span>{defaultImg ? '替换' : '删除'}</span>
                </div>
                <UImage
                    isBlurred
                    src={defaultImg || croppedImg?.src}
                    alt="NextUI Album Cover"
                    className="object-cover max-w-40 max-h-40 h-40"
                />
            </div>
    }, [files, cropped, defaultImg, children])
    return <div className="flex flex-col items-center justify-center">
        {selector}
        <Modal isOpen={isModalOpen} onClose={onModalClose} hideCloseButton size="xl">
            <ModalContent>
                {(onModalClose) => <>
                    <ModalHeader>
                        裁剪图片
                    </ModalHeader>
                    <ModalBody>
                        <CustomCropper url={imgUrl} onCrop={setCroppedImg} />
                    </ModalBody>
                    <ModalFooter>
                        <ButtonGroup>
                            <Button onClick={() => {
                                setCropped(true)
                                onChange && onChange(croppedImg)
                                onModalClose()
                            }} color="primary">确定</Button>
                            <Button onClick={() => {
                                setCropped(false)
                                setCroppedImg(undefined)
                                onModalClose()
                            }}>取消</Button>
                        </ButtonGroup>
                    </ModalFooter>
                </>}
            </ModalContent>
        </Modal>
    </div>

}