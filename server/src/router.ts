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

router.post("/validateParameters", (req, res) => {
  const {
    topic,
    category,
    title,
    subtitle,
    slideCount,
    images,
    sources,
    model,
  } = req.body;
  const parameters: iParameters = {
    topic,
    category,
    title,
    subtitle,
    slideCount,
    images,
    sources,
    model,
  };
  errorChecks(parameters, res);
  return res.status(200).send("OK");
});

router.post("/slidesData", async (req, res) => {
  const {
    topic,
    category,
    title,
    subtitle,
    slideCount,
    images,
    sources,
    model,
  } = req.body;
  const parameters: iParameters = {
    topic,
    category,
    title,
    subtitle,
    slideCount,
    images,
    sources,
    model,
  };
  console.log(`Fetching info about ${parameters.topic}...`);
  const titles = await getTopics(
    openai,
    parameters.category,
    parameters.topic,
    parameters.slideCount,
    model
  );
  console.log("Titles", titles);
  const slidesInfo: iSlideInfo[] = [];
  for (let i = 0; i < titles.length; i++) {
    const title = titles[i];
    const facts = await getDetails(
      openai,
      category,
      title,
      5,
      parameters.title
    );
    slidesInfo.push({ title, facts });
  }
  console.log("Gathered Data For Slides: \n");
  console.log(slidesInfo);
  return res.status(200).json(slidesInfo);
  // return res.status(200).send(dummyFacts);
});

router.post("/createPresentation", async (req, res) => {
  console.log("req.body", JSON.stringify(req.body, null, 2));
  const {
    topic,
    category,
    title,
    subtitle,
    slideCount,
    images,
    sources,
    model,
    slidesInfo,
  } = req.body;
  const parameters: iParameters = {
    topic,
    category,
    title,
    subtitle,
    slideCount,
    images,
    sources,
    model,
    slidesInfo,
  };
  parameters.images = false; //For early version
  parameters.sources = false; //For early version
  try {
    console.log("Authorizing...");
    const client = await authorize();
    console.log("Creating presentation...");
    const presentation = await createPresentation(
      parameters,
      client,
      slidesInfo,
      // dummyFacts,
      process.env.GOOGLE_SEARCH_KEY,
      process.env.CX
    );
    return res.status(200).send(presentation);
  } catch (err) {
    console.error(err);
    // res.status(400).write("FAIL");
    // return res.end();
    return res.status(400).send("FAIL");
  }
});

export default router;
