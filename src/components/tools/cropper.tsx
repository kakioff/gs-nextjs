import { useMemo, useRef, useState } from "react"
import 'react-image-crop/src/ReactCrop.scss'
import ReactCrop, { Crop } from 'react-image-crop'
import { Icon } from "@iconify-icon/react/dist/iconify.mjs"
import { Avatar, Divider, Image as UImage } from "@nextui-org/react"


interface Props {
    url?: string,
    aspectRatio?: number
    onCrop?: (image: HTMLImageElement) => void
}

export default function CustomCropper({
    url,
    aspectRatio = 1 / 1,
    onCrop
}: Props) {
    const image = useRef<HTMLImageElement>(null),
        [cropped, setCropped] = useState<HTMLImageElement | null>()
    const [crop, setCrop] = useState<Crop>({
        unit: '%',
        x: 0,
        y: 0,
        width: 0,
        height: 0
    })

    const startCrop = async (c: Crop = crop) => {
        if (!image.current) return
        const canvas = document.createElement('canvas')

        const ctx = canvas.getContext('2d')
        if (!ctx) return
        canvas.width = c.width
        canvas.height = c.height
        ctx.drawImage(
            image.current,
            -c.x, -c.y,
            image.current.width,
            image.current.height,
        )
        const croppedImage = new Image()
        croppedImage.src = canvas.toDataURL('image/jpeg')
        croppedImage.onload = () => setCropped(croppedImage)
        onCrop && onCrop(croppedImage)
        croppedImage.remove()
        canvas.remove()
    }
    // useDebounce(() => startCrop(), 500, [crop])
    const croppedImage = useMemo(() => {
        if (!cropped) return <div className="flex flex-col items-center justify-center gap-2 h-40">
            <Icon icon="mdi:camera-off" width={40} height={40} />
            <span className="text-2xl">No Image</span>
        </div>
        return <div className="flex flex-row items-center justify-center gap-2 h-40">
            <UImage src={cropped.src} alt="cropped" width={130} height={130} />
            <UImage src={cropped.src} alt="cropped" width={100} height={100} />
            <Avatar src={cropped.src} size="lg" />
            <Avatar src={cropped.src} size="sm" />
        </div>
    }, [cropped])
    return <div className="flex items-center justify-center flex-col gap-3">
        <ReactCrop crop={crop}
            onChange={setCrop}
            aspect={aspectRatio}
            onComplete={startCrop}
            className="max-w-fit select-none max-h-[50vh]">
            <img ref={image} src={url} alt="cropper"/>
        </ReactCrop>
        <Divider content="预览"/>
        {croppedImage}
    </div>
}