interface iPresentation {
    topic: string
    title: string
    subtitle: string
    slideCount: number
    id: string
    date: Date
    thumbnail: {
        contentUrl?: string
        height?: number
        width?: number
    }
}

export default iPresentation
