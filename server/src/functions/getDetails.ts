import { OpenAIApi } from "openai";
import parseList from "../hooks/topics";
import getPrompts from "../hooks/prompts";

const getDetails = async (
  openai: OpenAIApi,
  heading: string,
  pointsCount: number,
  title?: string
) => {
  try {
    const question = getPrompts("details", pointsCount, heading, 0, title);
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

export default getDetails;
