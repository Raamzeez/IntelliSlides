import useWindowDimensions from "./useWindowDimensions"

const useMobile = () => {
    const { height, width } = useWindowDimensions()
    const maxHeight = 730
    const maxWidth = 600
    if (height < maxHeight || width < maxWidth) {
        return true
    }
    return false
}

export default useMobile
