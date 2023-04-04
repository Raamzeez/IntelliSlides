import { NextApiRequest, NextApiResponse } from "next/types"
import getDetails from "../../../../lib/backend/functions/getDetails"
import iSlideInfo from "../../../../lib/backend/models/slideInfo"
import openai from "../../../../lib/backend/openai"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {
        topic,
        category,
        // title,
        titles,
    } = req.body
    const slidesInfo: iSlideInfo[] = []
    for (let i = 0; i < titles.length; i++) {
        const facts = await getDetails(openai, category, titles[i], 5, topic)
        slidesInfo.push({ title: titles[i], facts })
    }
    return res.status(200).json(slidesInfo)
    // console.log(dummyFacts)
    // return res.status(200).json(dummyFacts)
}
