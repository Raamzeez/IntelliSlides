import { NextFunction, Request, Response } from "express"
import jwtDecode from "jwt-decode"
import { DateTime } from "luxon"
import { ObjectId } from "mongodb"
import extractIDToken from "../hooks/extractIDToken"
import subToObjectId from "../hooks/subToObjectId"
import iUserJWT from "../models/userJWT"
import userDB from "../schemas/user"

const slidesLimit = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Calling slidesLimit")
    const max = 50
    const _id = new ObjectId(
        subToObjectId((jwtDecode(extractIDToken(req)) as iUserJWT).sub)
    )
    const foundUser = await userDB.findOne({ _id })
    if (!foundUser) {
        console.log("No user found")
        req.body.date = new Date()
        req.body.totalSlideCount = 0
        return next()
    }
    const prevSlideCount = foundUser.slidesInHour.slideCount
    if (!prevSlideCount) {
        console.log("No previous slide count value")
        req.body.date = new Date()
        req.body.totalSlideCount = req.body.slideCount
        return next()
    }
    const now = DateTime.now()
    const prevDate = DateTime.fromJSDate(foundUser.slidesInHour.date)
    const updatedSlideCount = prevSlideCount + req.body.slideCount
    console.log("Previous hour", prevDate.hour)
    console.log("Current hour:", now.hour)
    console.log("Current Slide Count (not added):", prevSlideCount)
    if (prevDate.hasSame(now, "hour") && updatedSlideCount > max) {
        console.log("Too many slides in same hour")
        return res
            .status(429)
            .send(
                "You have exceeded the number of generated slides per hour. Please try again later at the next hour."
            )
    } else {
        console.log(
            "Previous slide count in hour either found and not enough, or not found"
        )
        req.body.date = now.toJSDate()
        req.body.totalSlideCount = req.body.slideCount
        return next()
    }
    // return res
    //     .status(429)
    //     .send(
    //         "You have exceeded the number of generated slides per hour. Please try again later at the next hour."
    //     )
}

export default slidesLimit
