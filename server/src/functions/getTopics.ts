import { OpenAIApi } from "openai";
import parseList from "../hooks/topics";
import getTopicPrompts from "./topicPrompts";

const getTopics = async (
  openai: OpenAIApi,
  heading: string,
  slideCount: number
) => {
  try {
    const question = getTopicPrompts(slideCount, heading, 1);
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
