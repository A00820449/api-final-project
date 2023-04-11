import { ReactNode } from "react"
import { AppBar } from "@mui/material";
import NavBar from "./navbar";

interface LayoutProps {
    children: ReactNode
}
export default function Layout({children}: LayoutProps) {
    return (
        <>
        <NavBar/>
        <main>{children}</main>
        </>
    )
}