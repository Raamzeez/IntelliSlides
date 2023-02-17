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
import getCategory from "./hooks/category";
import dummyTitles from "./data/dummyTitles";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const router = express.Router();

router.post("/validateParameters", (req, res) => {
  const { topic, category, slideCount } = req.body;
  errorChecks(topic, slideCount, category, res);
  return res.status(200).send("OK");
});

router.post("/category", async (req, res) => {
  const { topic, auto, category } = req.body;
  if (auto) {
    const response = await getCategory(openai, topic);
    console.log("Category:", response);
    return res.status(200).send(response);
  }
  console.log("Category:", category);
  return res.status(200).send(category);
});

router.post("/slideTitles", async (req, res) => {
  const { topic, category, slideCount, model } = req.body;
  console.log(`Fetching info about ${topic}...`);
  const titles = await getTopics(openai, category, topic, slideCount, model);
  console.log("Titles", titles);
  return res.status(200).json(titles);
  // console.log("Titles", dummyTitles);
  // return res.status(200).json(dummyTitles);
});

router.post("/slideDetails", async (req, res) => {
  const {
    topic,
    category,
    // title,
    titles,
  } = req.body;
  const slidesInfo: iSlideInfo[] = [];
  for (let i = 0; i < titles.length; i++) {
    const facts = await getDetails(openai, category, titles[i], 5, topic);
    slidesInfo.push({ title: titles[i], facts });
  }
  console.log("Gathered Data For Slides: \n");
  console.log(slidesInfo);
  return res.status(200).json(slidesInfo);
  // console.log(dummyFacts);
  // return res.status(200).json(dummyFacts);
});

router.post("/createPresentation", async (req, res) => {
  console.log("req.body", JSON.stringify(req.body, null, 2));
  const parameters = req.body;
  parameters.images = false; //For early version
  parameters.sources = false; //For early version
  try {
    console.log("Authorizing...");
    const client = await authorize();
    console.log("Creating presentation...");
    const presentation = await createPresentation(
      parameters,
      client,
      parameters.slidesInfo,
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
