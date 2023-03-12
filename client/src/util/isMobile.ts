import useWindowDimensions from "./useWindowDimensions"

const isMobile = (height: number, width: number) => {
    const maxHeight = 730
    const maxWidth = 600
    if (height < maxHeight || width < maxWidth) {
        return true
    }
    return false
}

export default isMobile
