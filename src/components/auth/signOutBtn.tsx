"use client"
import { Button, ButtonProps } from "@nextui-org/react";
import { signOut } from "next-auth/react";

interface Props extends ButtonProps {
  redirectTo?: string;
}
export default function SignOutBtn({
  redirectTo = "/",
  ...props
}: Props) {

  return (
    <Button {...props} color="danger" className="btn n-primary" onClick={() => {
      signOut({
        redirectTo
      })
    }}>
      退出登录
    </Button>
  );
}