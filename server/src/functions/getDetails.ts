import { OpenAIApi } from "openai";
import parseList from "../hooks/topics";

const getDetails = async (
  openai: OpenAIApi,
  title: string,
  pointsCount: number
) => {
  try {
    const question = `Provide ${pointsCount} important details about ${title}`;
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
