interface iPresentation {
    presentationId: string
    title: string
    subtitle: string
    slideCount: number
    date?: Date
    thumbnail: {
        contentUrl: string
        height: number
        width: number
    }
}

export default iPresentation
