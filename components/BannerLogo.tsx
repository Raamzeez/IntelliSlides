import Image from "next/image"
import React, { FC, useEffect, useState } from "react"
import isMobile from "../lib/frontend/util/isMobile"
import { useRouter } from "next/router"
import { useTheme } from "next-themes"

interface iProps {
    adaptiveStyling?: boolean
    height?: number
    width?: number
}

const BannerLogo: FC<iProps> = ({ adaptiveStyling, height, width }) => {
    const router = useRouter()

    const { theme, resolvedTheme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])

    return (
        <Image
            alt="IntelliSlides Banner Logo"
            priority={true}
            src={
                resolvedTheme === "dark"
                    ? require("../public/images/IntelliSlidesBannerTransparent.png")
                    : require("../public/images/IntelliSlidesBannerTransparentBlack.png")
            }
            style={{
                height: 75,
                width: 280,
                marginTop: adaptiveStyling
                    ? isMobile(height as number, width as number)
                        ? 30
                        : 5
                    : 0,
            }}
            className="pointer animate__animated animate__fadeIn prevent-select"
            onClick={() => router.push("/")}
        />
    )
}

export default BannerLogo
