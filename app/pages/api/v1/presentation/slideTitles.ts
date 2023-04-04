import { NextApiRequest, NextApiResponse } from "next/types"
import getTopics from "../../../../lib/backend/functions/getTopics"
import openai from "../../../../lib/backend/openai"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { topic, category, slideCount, model } = req.body
    const titles = await getTopics(openai, category, topic, slideCount, model)
    return res.status(200).json(titles)
    // console.log("Titles", dummyTitles)
    // return res.status(200).json(dummyTitles)
}
