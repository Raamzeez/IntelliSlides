import { OpenAIApi } from "openai"
import parseList from "./topics"
import getPrompts from "./prompts"
import Category from "../types/category"

const getTopics = async (
    openai: OpenAIApi,
    category: Category,
    topic: string,
    slideCount: number
) => {
    try {
        const question = getPrompts("topic", category, slideCount, topic)
        console.log("1st question to ai: "+question+"\n");
        const completion = await openai.createCompletion({
            model: "text-davinci-002",
            prompt: question,
            max_tokens: 300,
        })
        const response = completion.data.choices[0].text
        console.log("response: " + response + "\n"); // Print out the response
        console.log("###########################\n");
        console.log(parseList(response!));
        console.log("###########################\n");
        if (slideCount > 1) {
            return parseList(response!)
        }
        return [response!.trim()]
    } catch (err) {
        console.error(err.response.data)
    }
}

export default getTopics
