const isMobile = (height: number, width: number, loggedIn?: boolean) => {
    const maxHeight = 730
    const maxWidth = 600
    if (
        (height < maxHeight || width < maxWidth) &&
        (height < width * 2 || height < 1100)
    ) {
        return true
    } else if (height < 900 && width < 992) {
        return true
    }
    return false
}

export default isMobile
