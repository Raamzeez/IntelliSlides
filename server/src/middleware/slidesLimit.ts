import { NextFunction, Request, Response } from "express"
import jwtDecode from "jwt-decode"
import { DateTime } from "luxon"
import { ObjectId } from "mongodb"
import extractIDToken from "../hooks/extractIDToken"
import subToObjectId from "../hooks/subToObjectId"
import iUserJWT from "../models/userJWT"
import userDB from "../schemas/user"

const slidesLimit = async (req: Request, res: Response, next: NextFunction) => {
    // const max = 50
    // const _id = new ObjectId(
    //     subToObjectId((jwtDecode(extractIDToken(req)) as iUserJWT).sub)
    // )
    // const foundUser = await userDB.findOne({ _id })
    // if (!foundUser) {
    //     req.body.date = new Date()
    //     req.body.totalSlideCount = 0
    //     return next()
    // }
    // const prevSlideCount = foundUser.slidesInHour.slideCount
    // if (!prevSlideCount) {
    //     req.body.date = new Date()
    //     req.body.totalSlideCount = 0
    //     return next()
    // }
    // const now = DateTime.now()
    // const prevDate = DateTime.fromJSDate(foundUser.slidesInHour.date)
    // const updatedSlideCount = prevSlideCount + req.body.parameters.slideCount
    // if (prevDate.hasSame(now, "hour") && updatedSlideCount > max) {
    //     return res
    //         .status(429)
    //         .send(
    //             "You have exceeded the number of generated slides per hour. Please try again later at the next hour."
    //         )
    // } else {
    //     req.body.date = now.toJSDate()
    //     req.body.totalSlideCount = updatedSlideCount
    //     return next()
    // }
    return res
        .status(429)
        .send(
            "You have exceeded the number of generated slides per hour. Please try again later at the next hour."
        )
}

export default slidesLimit
