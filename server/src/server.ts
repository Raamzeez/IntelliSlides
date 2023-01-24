import authorize from "./hooks/authorize";
import createPresentation from "./functions/createPresentation";
import getTopics from "./functions/getTopics";
import iParameters from "./models/parameters";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import { Configuration, OpenAIApi } from "openai";
import getDetails from "./functions/getDetails";
import iSlideInfo from "./models/slideInfo";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const parameters: iParameters = {
  title: "Declaration of Independence School Presentation",
  heading: "The Declaration of Independence",
  subtitle: "By: Mohammed Raamiz Abbasi",
  slideCount: 6,
};

(async () => {
  try {
    const client = await authorize();
    console.log("Successful client authentication");
    // const titles = await getTopics(
    //   openai,
    //   parameters.heading,
    //   parameters.slideCount
    // );
    // console.log("Fetching info about " + parameters.heading + "...");
    // const slideInfo: iSlideInfo[] = [];
    // for (let i = 0; i < titles.length; i++) {
    //   const title = titles[i];
    //   const facts = await getDetails(openai, title, 5);
    //   slideInfo.push({ title, facts });
    // }
    // console.log("Gathered Data For Slides: \n");
    // console.log(slideInfo);
    const presentation = await createPresentation(parameters, client);
  } catch (err) {
    console.error(err);
  }
})();
