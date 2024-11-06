import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuToggle } from "@nextui-org/react";

import { ThemeSwitcher } from "./themeSwitcher";
import LoginBtn from "./auth/loginBtn";
import ULink from "./ui/Link";
import RouteMenu from "./routeMenu";
import { auth } from "@/auth";

interface Props extends React.HTMLAttributes<HTMLHeadElement> {

}
export default async function Head({ }: Props) {
    const session = await auth()

    return <Navbar shouldHideOnScroll isBlurred isBordered className="bg-background/15 h-[64px]">
        <NavbarBrand>
            <NavbarMenuToggle
                // aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="sm:hidden mr-2 h-6"
            />
            <NavbarBrand>
                <ULink href="/" className="text-2xl font-bold" >GS</ULink>
            </NavbarBrand>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <RouteMenu user={session?.user} />
        </NavbarContent>
        <NavbarContent justify="end">
            <NavbarItem >
                <LoginBtn withAvatar />
            </NavbarItem>
            <ThemeSwitcher />
        </NavbarContent>
        <NavbarMenu>
            <RouteMenu withUser itemClassName="my-5" user={session?.user} />
        </NavbarMenu>
    </Navbar>
}