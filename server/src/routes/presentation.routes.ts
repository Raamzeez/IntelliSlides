import express from "express";
import { ObjectId } from "mongodb";
import client from "../client";
import dummyFacts from "../data/dummyFacts";
import dummyTitles from "../data/dummyTitles";
import createPresentation from "../functions/createPresentation";
import getDetails from "../functions/getDetails";
import getTopics from "../functions/getTopics";
import accessToken from "../hooks/accessToken";
import getCategory from "../hooks/category";
import errorChecks from "../hooks/errorChecks";
import subToObjectId from "../hooks/subToObjectId";
import requireAuth from "../middleware/requireAuth";
import iSlideInfo from "../models/slideInfo";
import openai from "../openai";

const presentationRouter = express.Router();

presentationRouter.post("/validateParameters", (req, res) => {
  const { topic, category, slideCount } = req.body;
  errorChecks(topic, slideCount, category, res);
  return res.status(200).send("OK");
});

presentationRouter.post("/category", async (req, res) => {
  const { topic, auto, category } = req.body;
  if (auto) {
    const response = await getCategory(openai, topic);
    console.log("Category:", response);
    return res.status(200).send(response);
  }
  console.log("Category:", category);
  return res.status(200).send(category);
});

presentationRouter.post("/slideTitles", async (req, res) => {
  // const { topic, category, slideCount, model } = req.body;
  // console.log(`Fetching info about ${topic}...`);
  // const titles = await getTopics(openai, category, topic, slideCount, model);
  // console.log("Titles", titles);
  // return res.status(200).json(titles);
  console.log("Titles", dummyTitles);
  return res.status(200).json(dummyTitles);
});

presentationRouter.post("/slideDetails", async (req, res) => {
  // const {
  //   topic,
  //   category,
  //   // title,
  //   titles,
  // } = req.body;
  // const slidesInfo: iSlideInfo[] = [];
  // for (let i = 0; i < titles.length; i++) {
  //   const facts = await getDetails(openai, category, titles[i], 5, topic);
  //   slidesInfo.push({ title: titles[i], facts });
  // }
  // console.log("Gathered Data For Slides: \n");
  // console.log(slidesInfo);
  // return res.status(200).json(slidesInfo);
  console.log(dummyFacts);
  return res.status(200).json(dummyFacts);
});

presentationRouter.post(
  "/createPresentation",
  requireAuth,
  async (req, res) => {
    console.log("req.body", JSON.stringify(req.body, null, 2));
    const parameters = req.body;
    parameters.images = false; //For early version
    parameters.sources = false; //For early version
    // const accessToken = parameters.accessToken;
    const access_token = await accessToken(
      subToObjectId(req.cookies.id_token).toString()
    );
    try {
      console.log("Authorizing...");
      // const client = await authorize();
      client.setCredentials({
        access_token,
      });
      console.log("Creating presentation...");
      const presentation = await createPresentation(
        parameters,
        client,
        parameters.slidesInfo,
        process.env.GOOGLE_SEARCH_KEY,
        process.env.CX
      );
      return res.status(200).send(presentation);
    } catch (err) {
      console.error(err);
      return res.status(400).send("FAIL");
    }
  }
);

export default presentationRouter;
