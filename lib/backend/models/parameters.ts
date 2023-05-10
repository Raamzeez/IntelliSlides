import Category from "../types/category"
import iSlideInfo from "../../shared/models/slideInfo"

interface iParameters {
    topic: string
    category: Category
    title: string
    subtitle: string
    slideCount: number
    auto?: boolean
    titles?: string[]
    images?: boolean
    sources?: boolean
    slidesInfo?: iSlideInfo[]
}

export default iParameters
