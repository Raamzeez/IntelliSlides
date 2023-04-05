import useWindowDimensions from "./useWindowDimensions"

const isMobileLoading = (height: number, width: number) => {
    const maxHeight = 650
    const maxWidth = 850
    if (height < maxHeight || width < maxWidth) {
        return true
    }
    return false
}

export default isMobileLoading
