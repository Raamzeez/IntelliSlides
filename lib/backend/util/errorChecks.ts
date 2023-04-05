import { NextApiResponse } from "next/types"
import categories from "../data/categories"
import Category from "../types/category"

const errorChecks = (
    topic: string,
    slideCount: number,
    category: Category,
    res: NextApiResponse
) => {
    if (!topic) {
        return res.status(400).send("Incorrect Parameters: No Topic Provided")
    }
    if (topic.length < 2) {
        return res
            .status(400)
            .send("Incorrect Parameters: Topic Less Than 2 Characters")
    }
    if (!slideCount) {
        return res
            .status(400)
            .send("Incorrect Parameters: No Value for Slide Count")
    }
    if (slideCount < 1) {
        return res
            .status(400)
            .send("Incorrect Parameters: Slide Count Cannot Be Less Than 1")
    }
    if (slideCount > 20) {
        return res
            .status(400)
            .send("Incorrect Parameters: Slide Count Cannot Exceed 25")
    }
    if (
        categories.filter((rawCategory) => rawCategory === category).length !==
        1
    ) {
        return res.status(400).send("Incorrect Parameters: Invalid Category")
    }
}

export default errorChecks
