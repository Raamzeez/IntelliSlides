import useWindowDimensions from "./useWindowDimensions"

const isMobile = (height: number, width: number, loggedIn?: boolean) => {
    const maxHeight = 730
    const maxWidth = 600
    if (height < maxHeight || width < maxWidth) {
        return true
    } else if (height < 850 && width < 992) {
        return true
    }
    return false
}

export default isMobile
