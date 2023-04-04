import { NextApiRequest, NextApiResponse } from "next/types"
import getCategory from "../../../../lib/backend/hooks/category"
import openai from "../../../../lib/backend/openai"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { topic, auto, category } = req.body
    if (auto) {
        const response = await getCategory(openai, topic)
        return res.status(200).send(response)
    }
    return res.status(200).send(category)
    // return res.status(400).send("FAIL")
}
