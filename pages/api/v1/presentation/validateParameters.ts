import { NextApiRequest, NextApiResponse } from "next/types"
import errorChecks from "../../../../lib/backend/util/errorChecks"
import { authenticatedHandler } from "../../../../lib/backend/handlers/auth_guard"
import { slideLimitHandler } from "../../../../lib/backend/handlers/slide_limit_guard"

export default authenticatedHandler(
    slideLimitHandler(async (req, res) => {
        const { topic, category, slideCount } = req.body
        errorChecks(topic, slideCount, category, res)
        return res.status(200).send("OK")
    })
)
