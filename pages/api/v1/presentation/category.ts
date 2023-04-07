import getCategory from "../../../../lib/backend/util/category"
import openai from "../../../../lib/backend/openai"
import { authenticatedHandler } from "../../../../lib/backend/handlers/auth_guard"
import { slideLimitHandler } from "../../../../lib/backend/handlers/slide_limit_gaurd"

export default authenticatedHandler(
    slideLimitHandler(async (req, res) => {
        const { topic, auto, category } = req.body
        if (auto) {
            const response = await getCategory(openai, topic)
            return res.status(200).send(response)
        }
        return res.status(200).send(category)
        // return res.status(400).send("FAIL")
    })
)
