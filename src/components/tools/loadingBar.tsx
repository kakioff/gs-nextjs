"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoadingBar() {
    // router.events.on("routeChangeStart", (...args)=>{
    //     console.log("routeChangeStart", args)
    // })
    // router.events.on("routeChangeComplete", (...args)=>{
    //     console.log("routeChangeComplete", args)
    // })
    // router.events.on("routeChangeError", (...args)=>{
    //     console.log("routeChangeError", args)
    // })
    return <>
        <div className="absolute top-0 left-0 bg-gray-200 w-1/2 h-1 z-[9999]" style={{
        }}>
        </div>
    </>;
}