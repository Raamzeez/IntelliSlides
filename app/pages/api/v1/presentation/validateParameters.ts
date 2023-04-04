import { NextApiRequest, NextApiResponse } from "next/types"
import errorChecks from "../../../../lib/backend/hooks/errorChecks"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { topic, category, slideCount } = req.body
    errorChecks(topic, slideCount, category, res)
    return res.status(200).send("OK")
}
