import { faBars } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { FC } from "react"

const HamburgerMenu: FC = () => {
    return (
        <div className="hamburger shadow center-container">
            <FontAwesomeIcon icon={faBars} color="black" size={"1x"} />
        </div>
    )
}

export default HamburgerMenu
