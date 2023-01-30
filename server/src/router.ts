import express from "express";
import dummyFacts from "./data/dummyFacts";
import createPresentation from "./functions/createPresentation";
import getTopics from "./functions/getTopics";
import authorize from "./hooks/authorize";
import iParameters from "./models/parameters";
import { Configuration, OpenAIApi } from "openai";
import iSlideInfo from "./models/slideInfo";
import getDetails from "./functions/getDetails";
import errorChecks from "./hooks/errorChecks";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const router = express.Router();

router.post("/createPresentation", async (req, res) => {
  console.log("req.body", JSON.stringify(req.body, null, 2));
  const { topic, title, subtitle, slideCount, images, sources } = req.body;
  const parameters: iParameters = {
    topic,
    title,
    subtitle,
    slideCount,
    images,
    sources,
  };
  errorChecks(parameters, res);
  try {
    res.write("Authenticating...");
    const client = await authorize();
    res.write(`Fetching info about ${parameters.topic}...`);
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
    res.write("Creating presentation...");
    const presentation = await createPresentation(
      parameters,
      client,
      slidesInfo,
      // dummyFacts,
      process.env.GOOGLE_SEARCH_KEY,
      process.env.CX
    );
    res.status(200).write("OK");
    return res.end();
  } catch (err) {
    console.error(err);
    res.status(400).write("FAIL");
    return res.end();
  }
});

export default router;
