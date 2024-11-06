"use client"
import { useRouter } from "next/navigation";

export default function LoadingBar() {
    const router = useRouter()
    // router.events.on("routeChangeStart", (...args)=>{
    //     console.log("routeChangeStart", args)
    // })
    // router.events.on("routeChangeComplete", (...args)=>{
    //     console.log("routeChangeComplete", args)
    // })
    // router.events.on("routeChangeError", (...args)=>{
    //     console.log("routeChangeError", args)
    // })
    return (
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 z-[9999]">
            <div className="loading-bar__progress"></div>
        </div>
    );
}