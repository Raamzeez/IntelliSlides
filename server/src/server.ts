import authorize from "./hooks/authorize";
import createPresentation from "./functions/createPresentation";
import getTopics from "./functions/getTopics";
import iParameters from "./models/parameters";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import { Configuration, OpenAIApi } from "openai";
import getDetails from "./functions/getDetails";
import iSlideInfo from "./models/slideInfo";
import dummyFacts from "./dummyFacts";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const parameters: iParameters = {
  title: "Israel vs Palestine",
  heading: "The Israel and Palestine Conflict",
  subtitle: "By: Mohammed Raamiz Abbasi",
  slideCount: 6,
};

(async () => {
  try {
    const client = await authorize();
    console.log("Successful client authentication");
    const titles = await getTopics(
      openai,
      parameters.heading,
      parameters.slideCount
    );
    console.log("Fetching info about " + parameters.heading + "...");
    const slidesInfo: iSlideInfo[] = [];
    for (let i = 0; i < titles.length; i++) {
      const title = titles[i];
      const facts = await getDetails(openai, title, 5);
      slidesInfo.push({ title, facts });
    }
    console.log("Gathered Data For Slides: \n");
    console.log(slidesInfo);
    const presentation = await createPresentation(
      parameters,
      client,
      slidesInfo
      // dummyFacts
    );
  } catch (err) {
    console.error(err);
  }
})();
