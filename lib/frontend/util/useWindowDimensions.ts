import { useEffect, useState } from "react"

type WindowDimentions = {
    width: number
    height: number
}

const useWindowDimensions = (): WindowDimentions => {
    const [windowDimensions, setWindowDimensions] = useState<WindowDimentions>({
        width: 1920,
        height: 1080,
    })
    useEffect(() => {
        function handleResize(): void {
            setWindowDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }
        handleResize()
        window.addEventListener("resize", handleResize)
        return (): void => window.removeEventListener("resize", handleResize)
    }, []) // Empty array ensures that effect is only run on mount

    return windowDimensions
}

export default useWindowDimensions
