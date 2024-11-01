"use server"

import { auth } from "@/auth"

export default async ()=>{
    let session = await auth()
    return session
}