import { OpenAIApi } from "openai"
import parseList from "../hooks/topics"
import getPrompts from "../hooks/prompts"
import Category from "../types/category"

const getTopics = async (
    openai: OpenAIApi,
    category: Category,
    topic: string,
    slideCount: number,
    model:
        | "text-davinci-003"
        | "text-curie-001"
        | "text-babbage-001"
        | "text-ada-001"
) => {
    try {
        const question = getPrompts("topic", category, slideCount, topic)
        const completion = await openai.createCompletion({
            model,
            prompt: question,
            max_tokens: 300,
        })
        const response = completion.data.choices[0].text
        if (slideCount > 1) {
            return parseList(response)
        }
        return [response.trim()]
    } catch (err) {
        console.error(err.response.data)
    }
}

export default getTopics
