const estimatedTime = (slides: number): string => {
    const secondsPerSlide = 15
    const totalSeconds = secondsPerSlide * slides
    if (totalSeconds >= 60) {
        return `≈${Math.round(totalSeconds / 60)} min`
    } else {
        return `<1 min`
    }
}

export default estimatedTime
