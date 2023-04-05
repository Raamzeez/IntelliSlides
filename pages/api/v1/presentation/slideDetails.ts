import { NextApiRequest, NextApiResponse } from "next/types"
import getDetails from "../../../../lib/backend/functions/getDetails"
import iSlideInfo from "../../../../lib/backend/models/slideInfo"
import openai from "../../../../lib/backend/openai"
import { authenticatedHandler } from "../../../../lib/backend/handlers/auth_guard"
import { slideLimitHandler } from "../../../../lib/backend/handlers/slide_limit_gaurd"

export default authenticatedHandler(
    slideLimitHandler(async (req, res) => {
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
            if (facts.length < 5) {
                return res
                    .status(404)
                    .send(
                        "Unable to find sufficient data for slides. Please try again later or change topic."
                    )
            }
            slidesInfo.push({ title: titles[i], facts })
        }
        return res.status(200).json(slidesInfo)
        // console.log(dummyFacts)
        // return res.status(200).json(dummyFacts)
    })
)
