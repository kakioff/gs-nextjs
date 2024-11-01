"use client"
import { Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";

export default function GithubLoginBtn() {

    return <Button onClick={()=>signIn("github")}>Github</Button>
}