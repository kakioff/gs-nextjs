import { ThemeSwitcher } from "./themeSwitcher";
import LoginBtn from "./auth/loginBtn";
import ULink from "./ui/Link";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";


interface Props extends React.HTMLAttributes<HTMLHeadElement> {

}
export default function Head(props?: Props) {
    return <Navbar shouldHideOnScroll isBlurred isBordered className="bg-background/15">
        <NavbarBrand>
            <ULink href="/" className="text-2xl font-bold" >GS</ULink>
        </NavbarBrand>
        <NavbarContent justify="end">
            <NavbarItem >
                <LoginBtn withAvatar />
            </NavbarItem>
            <ThemeSwitcher />
        </NavbarContent>
    </Navbar>
}