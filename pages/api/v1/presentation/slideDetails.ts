import getDetails from "../../../../lib/backend/util/getDetails"
import openai from "../../../../lib/backend/openai"
import { authenticatedHandler } from "../../../../lib/backend/handlers/auth_guard"
import { slideLimitHandler } from "../../../../lib/backend/handlers/slide_limit_gaurd"

export default authenticatedHandler(
    slideLimitHandler(async (req, res) => {
        console.log("Getting Details")
        const { topic, category, title } = req.body
        const facts = await getDetails(openai, category, title, 5, topic)
        if (facts.length < 5) {
            return res
                .status(404)
                .send(
                    "Unable to find sufficient data for slides. Please try again later or change topic."
                )
        }
        console.log("Returned Details")
        return res.status(200).json(facts)
        // console.log(dummyFacts)
        // return res.status(200).json(dummyFacts)
    })
)
