import LoadingType from "../types/loading"

const loadingStatuses: {
    type: LoadingType
    message: string
    contentLoader: boolean
}[] = [
    {
        type: "ValidateParameters",
        message: "Validating Parameters",
        contentLoader: false,
    },
    {
        type: "FetchingCategory",
        message: "Fetching Category",
        contentLoader: true,
    },
    {
        type: "SlideTitles",
        message: "Getting Slide Titles",
        contentLoader: false,
    },
    {
        type: "SlideDetails",
        message: "Gathering Slide Details",
        contentLoader: false,
    },
    {
        type: "CreatePresentation",
        message: "Creating Presentation",
        contentLoader: false,
    },
]

export default loadingStatuses
