"use client"
import { Button, ButtonProps } from "@nextui-org/react";
import Link from "next/link";

interface Props extends ButtonProps {
}
export default function UButton(props: Props) {

    return <Button {...props} as={props.href ? Link : undefined}/>
}