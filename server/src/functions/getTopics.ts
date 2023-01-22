import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const getTopics = async (heading: string, slideCount: number) => {
  try {
    const question = `Suggest ${slideCount} book chapter titles regarding major events of ${heading}`;
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: question,
      max_tokens: 300,
    });
    const response = completion.data.choices[0].text;
    return topics(response);
  } catch (err) {
    console.error(err.response.data);
  }
};

export default getTopics;
