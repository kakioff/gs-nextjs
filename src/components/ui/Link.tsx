"use client"
import { Link, LinkProps } from "@nextui-org/react";
import NextLink from "next/link";

interface Props extends LinkProps {

}
export default function ULink(props: Props) {
    return <Link {...props} as={props.href?NextLink:undefined} />
}