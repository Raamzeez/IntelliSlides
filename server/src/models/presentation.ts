interface iPresentation {
    topic: string
    title: string
    subtitle: string
    slideCount: number
    id: string
    thumbnail: {
        contentUrl?: string
        height?: number
        width?: number
    }
}

export default iPresentation
