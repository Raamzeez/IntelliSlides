import React, { FC } from "react"

interface iProps {
    slideCount: number
}

const SlideCountTip: FC<iProps> = ({ slideCount }) => {
    const tooHigh = slideCount > 20
    const tooLow = slideCount < 1

    return (
        <p
            style={{
                fontSize: 11,
                marginBottom: 25,
                color: tooHigh || tooLow || !slideCount ? "red" : "orange",
            }}
        >
            {!tooHigh && !tooLow && slideCount
                ? "Limited to a total of 50 slides/hr"
                : tooHigh
                ? "Slide count cannot exceed 20"
                : tooLow
                ? "Slide count cannot be lower than 1"
                : "Slide count is required"}
        </p>
    )
}

export default SlideCountTip
