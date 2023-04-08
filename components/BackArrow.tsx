import { faLeftLong } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/router"
import React, { FC } from "react"

const BackArrow: FC = () => {
    const router = useRouter()

    return (
        <div
            style={{
                height: 40,
                width: 40,
                backgroundColor: "grey",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 25,
                position: "absolute",
                left: 30,
                top: 23,
            }}
            className="shadow pointer"
            onClick={() => router.back()}
        >
            <FontAwesomeIcon icon={faLeftLong} size="xs" />
        </div>
    )
}

export default BackArrow
