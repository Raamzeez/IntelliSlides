import express from "express";
import dummyFacts from "./data/dummyFacts";
import createPresentation from "./functions/createPresentation";
import getTopics from "./functions/getTopics";
import authorize from "./hooks/authorize";
import iParameters from "./models/parameters";
import { Configuration, OpenAIApi } from "openai";
import iSlideInfo from "./models/slideInfo";
import getDetails from "./functions/getDetails";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const router = express.Router();

router.post("/createPresentation", async (req, res) => {
  console.log(req.body);
  const { topic, title, subtitle, slideCount, images, sources } = req.body;
  const parameters: iParameters = {
    topic,
    title,
    subtitle,
    slideCount,
    images,
    sources,
  };
  try {
    const client = await authorize();
    console.log("Successful client authentication");
    const titles = await getTopics(
      openai,
      parameters.topic,
      parameters.slideCount
    );
    console.log("Fetching info about " + parameters.topic + "...");
    const slidesInfo: iSlideInfo[] = [];
    for (let i = 0; i < titles.length; i++) {
      const title = titles[i];
      const facts = await getDetails(openai, title, 5, parameters.title);
      slidesInfo.push({ title, facts });
    }
    console.log("Gathered Data For Slides: \n");
    console.log(slidesInfo);
    const presentation = await createPresentation(
      parameters,
      client,
      slidesInfo,
      // dummyFacts,
      process.env.GOOGLE_SEARCH_KEY,
      process.env.CX
    );
    return res.status(200).send("OK");
  } catch (err) {
    console.error(err);
    return res.status(400).send("FAIL");
  }
});

export default router;
