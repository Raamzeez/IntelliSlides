interface iPresentation {
    topic: string
    title: string
    subtitle: string
    slideCount: number
    presentationId: string
    date: Date
    thumbnail: {
        contentUrl?: string
        height?: number
        width?: number
    }
}

export default iPresentation
