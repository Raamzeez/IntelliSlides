import Image from "next/image"
import React, { FC } from "react"
import isMobile from "../lib/frontend/util/isMobile"
import { useRouter } from "next/router"

interface iProps {
    adaptiveStyling?: boolean
    height?: number
    width?: number
}

const BannerLogo: FC<iProps> = ({ adaptiveStyling, height, width }) => {
    const router = useRouter()

    return (
        <Image
            alt="IntelliSlides Banner Logo"
            priority={true}
            src={require("../public/images/IntelliSlidesBannerTransparent.png")}
            style={{
                height: 75,
                width: 280,
                marginTop: adaptiveStyling
                    ? isMobile(height as number, width as number)
                        ? 30
                        : 5
                    : 0,
            }}
            className="pointer animate__animated animate__fadeIn"
            onClick={() => router.push("/")}
        />
    )
}

export default BannerLogo
