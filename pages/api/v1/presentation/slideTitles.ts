import getTopics from "../../../../lib/backend/functions/getTopics"
import openai from "../../../../lib/backend/openai"
import { authenticatedHandler } from "../../../../lib/backend/handlers/auth_guard"
import { slideLimitHandler } from "../../../../lib/backend/handlers/slide_limit_gaurd"

export default authenticatedHandler(
    slideLimitHandler(async (req, res) => {
        const { topic, category, slideCount, model } = req.body
        const titles = await getTopics(
            openai,
            category,
            topic,
            slideCount,
            model
        )
        return res.status(200).json(titles)
        // console.log("Titles", dummyTitles)
        // return res.status(200).json(dummyTitles)
    })
)
