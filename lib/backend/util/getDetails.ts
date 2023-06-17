import { OpenAIApi } from "openai"
import parseList from "./topics"
import getPrompts from "./prompts"
import Category from "../types/category"

const getDetails = async (
    openai: OpenAIApi,
    category: Category,
    topic: string,
    pointsCount: number,
    title?: string
): Promise<string[]> => {
    try {
        const question = getPrompts(
            "details",
            category,
            pointsCount,
            topic,
            title
        )
        const completion = await openai.createCompletion({
            model: "text-davinci-002",
            prompt: question,
            max_tokens: 300,
        })
        const response = completion.data.choices[0].text
        if (!response) {
            return []
        }
        return parseList(response, false)
    } catch (err) {
        console.error(err.response.data)
        return []
    }
}

export default getDetails
