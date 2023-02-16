import { OpenAIApi } from "openai";
import Category from "../types/category";

const getCategory = async (
  openai: OpenAIApi,
  topic: string
): Promise<Category> => {
  const question = `Is ${topic} an event, person, place, object, organization, or concept? Reply with only one word.`;
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: question,
      max_tokens: 300,
    });
    const category: Category = completion.data.choices[0].text as Category;
    return category;
  } catch (err) {
    console.error(err.response.data);
    return "Event";
  }
};

export default getCategory;
