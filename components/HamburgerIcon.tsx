import { faBars } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { FC, useState } from "react"
import MobileMenu from "./MobileMenu"

const HamburgerIcon: FC = () => {
    const [showMenu, setShowMenu] = useState(false)

    return (
        <>
            <div
                className="hamburger shadow center-container"
                onClick={() => setShowMenu(true)}
            >
                <FontAwesomeIcon icon={faBars} color="black" size={"1x"} />
            </div>
            {showMenu && <MobileMenu />}
        </>
    )
}

export default HamburgerIcon
