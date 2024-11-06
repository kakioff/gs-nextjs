"use server"

import { auth } from "@/auth"

export default async ()=>{
    return await auth()
    // return session
}