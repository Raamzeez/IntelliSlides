const estimatedTime = (slides: number): string => {
    const secondsPerSlide = 5
    const totalSeconds = secondsPerSlide * slides
    if (totalSeconds >= 60) {
        return `≈${Math.round(totalSeconds / 60)} min`
    } else {
        return `≈${totalSeconds} secs`
    }
}

export default estimatedTime
