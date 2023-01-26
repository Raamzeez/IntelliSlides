import { OpenAIApi } from "openai";
import parseList from "../hooks/topics";
import getPrompts from "../hooks/prompts";

const getTopics = async (
  openai: OpenAIApi,
  topic: string,
  slideCount: number
) => {
  try {
    const question = getPrompts("topic", slideCount, topic, 1);
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: question,
      max_tokens: 300,
    });
    const response = completion.data.choices[0].text;
    return parseList(response);
  } catch (err) {
    console.error(err.response.data);
  }
};

export default getTopics;
