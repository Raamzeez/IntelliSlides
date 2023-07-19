import React from "react"
import isMobile from "../lib/frontend/util/isMobile"
import useWindowDimensions from "../lib/frontend/util/useWindowDimensions"
import HamburgerIcon from "./HamburgerIcon"
import Sidebar from "./Sidebar"

const MenuWrapper: React.FC = () => {
    const { height, width } = useWindowDimensions()

    return <>{isMobile(height, width) ? <HamburgerIcon /> : <Sidebar />}</>
}

export default MenuWrapper
