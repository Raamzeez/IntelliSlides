import { faLeftLong } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/router"
import React, { FC } from "react"

const BackArrow: FC = () => {
    const router = useRouter()

    return (
        <div
            className="shadow pointer back-arrow"
            onClick={() => router.back()}
        >
            <FontAwesomeIcon icon={faLeftLong} size="1x" />
        </div>
    )
}

export default BackArrow
