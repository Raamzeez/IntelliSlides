import { DateTime } from "luxon"
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next/types"
import idTokenToMongoID from "../util/idTokenToMongoID"
import userDB from "../schemas/user"
import dbConnect from "../util/dbConnect"

export function slideLimitHandler(handler: NextApiHandler) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        await dbConnect()
        const max = 50
        const _id = idTokenToMongoID(req)
        const foundUser = await userDB.findOne({ _id })
        if (!foundUser) {
            req.body.date = new Date()
            req.body.totalSlideCount = 0
            return handler(req, res)
        }
        const prevSlideCount = foundUser.slidesInHour.slideCount
        if (!prevSlideCount) {
            req.body.date = new Date()
            req.body.totalSlideCount = req.body.slideCount
            return handler(req, res)
        }
        const now = DateTime.now()
        const prevDate = DateTime.fromJSDate(foundUser.slidesInHour.date)
        const updatedSlideCount = prevSlideCount + req.body.slideCount
        if (prevDate.hasSame(now, "hour") && updatedSlideCount > max) {
            return res
                .status(429)
                .send(
                    "You have exceeded the number of generated slides per hour. Please try again later at the next hour."
                )
        } else {
            req.body.date = now.toJSDate()
            req.body.totalSlideCount = req.body.slideCount
            return handler(req, res)
        }
    }
}
