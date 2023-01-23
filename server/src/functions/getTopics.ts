import { OpenAIApi } from "openai";
import parseList from "../hooks/topics";

const getTopics = async (
  openai: OpenAIApi,
  heading: string,
  slideCount: number
) => {
  try {
    const question = `Suggest ${slideCount} chronological book chapter titles regarding ${heading}`;
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
