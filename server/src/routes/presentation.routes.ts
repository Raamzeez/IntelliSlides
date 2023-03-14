import express from "express"
import jwtDecode from "jwt-decode"
import { DateTime } from "luxon"
import { ObjectId } from "mongodb"
import client from "../client"
import dummyFacts from "../data/dummyFacts"
import dummyTitles from "../data/dummyTitles"
import createPresentation from "../functions/createPresentation"
import getDetails from "../functions/getDetails"
import getTopics from "../functions/getTopics"
import accessToken from "../hooks/accessToken"
import getCategory from "../hooks/category"
import errorChecks from "../hooks/errorChecks"
import extractIDToken from "../hooks/extractIDToken"
import subToObjectId from "../hooks/subToObjectId"
import requireAuth from "../middleware/requireAuth"
import slidesLimit from "../middleware/slidesLimit"
import iSlideInfo from "../models/slideInfo"
import iUserJWT from "../models/userJWT"
import openai from "../openai"
import userDB from "../schemas/user"

const presentationRouter = express.Router()

presentationRouter.post("/validateParameters", (req, res) => {
    const { topic, category, slideCount } = req.body
    errorChecks(topic, slideCount, category, res)
    return res.status(200).send("OK")
})

presentationRouter.post("/category", async (req, res) => {
    const { topic, auto, category } = req.body
    if (auto) {
        const response = await getCategory(openai, topic)
        console.log("Category:", response)
        return res.status(200).send(response)
    }
    console.log("Category:", category)
    return res.status(200).send(category)
})

presentationRouter.post(
    "/slideTitles",
    requireAuth,
    slidesLimit,
    async (req, res) => {
        const { topic, category, slideCount, model } = req.body
        console.log(`Fetching info about ${topic}...`)
        const titles = await getTopics(
            openai,
            category,
            topic,
            slideCount,
            model
        )
        console.log("Titles", titles)
        return res.status(200).json(titles)
        // console.log("Titles", dummyTitles)
        // return res.status(200).json(dummyTitles)
    }
)

presentationRouter.post(
    "/slideDetails",
    requireAuth,
    slidesLimit,
    async (req, res) => {
        const {
            topic,
            category,
            // title,
            titles,
        } = req.body
        const slidesInfo: iSlideInfo[] = []
        for (let i = 0; i < titles.length; i++) {
            const facts = await getDetails(
                openai,
                category,
                titles[i],
                5,
                topic
            )
            slidesInfo.push({ title: titles[i], facts })
        }
        console.log("Gathered Data For Slides: \n")
        console.log(slidesInfo)
        return res.status(200).json(slidesInfo)
        // console.log(dummyFacts)
        // return res.status(200).json(dummyFacts)
    }
)

presentationRouter.post(
    "/createPresentation",
    requireAuth,
    slidesLimit,
    async (req, res) => {
        // console.log("req.body", JSON.stringify(req.body, null, 2));
        const parameters = req.body
        parameters.images = false //For early version
        parameters.sources = false //For early version
        // const accessToken = parameters.accessToken;
        const access_token = await accessToken(
            new ObjectId(
                subToObjectId((jwtDecode(extractIDToken(req)) as iUserJWT).sub)
            )
        )
        console.log("Access Token", access_token)
        try {
            console.log("Authorizing...")
            // const client = await authorize();
            client.setCredentials({
                access_token,
            })
            console.log("Creating presentation...")
            const presentation = await createPresentation(
                parameters,
                client,
                parameters.slidesInfo,
                process.env.GOOGLE_SEARCH_KEY,
                process.env.CX
            )
            const _id = new ObjectId(
                subToObjectId((jwtDecode(extractIDToken(req)) as iUserJWT).sub)
            )
            const foundUser = await userDB.findOneAndUpdate(
                { _id },
                {
                    $set: {
                        slidesInHour: {
                            date: req.body.date,
                            slideCount: req.body.totalSlideCount,
                        },
                    },
                    $push: {
                        presentations: presentation,
                    },
                },
                {
                    new: true,
                }
            )
            console.log("Found user", foundUser)
            return res.status(200).send(presentation)
        } catch (err) {
            console.error(err)
            return res.status(400).send("FAIL")
        }
        // return res.status(200).send("OK")
    }
)

export default presentationRouter
