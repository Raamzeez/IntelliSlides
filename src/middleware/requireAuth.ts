import { NextFunction, Request, Response } from "express"
import jwtDecode from "jwt-decode"
import client from "../client"
import iUserJWT from "../models/userJWT"
import extractIDToken from "../hooks/extractIDToken"
import subToObjectId from "../hooks/subToObjectId"

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    // Get the JWT token from the HttpOnly cookie
    const id_token = extractIDToken(req)
    // If the JWT token is not present, redirect the user to the login page
    if (!id_token || id_token === "null" || id_token === "undefined") {
        return res
            .status(401)
            .send("Not Logged In. Please login on the home page.")
    }

    // Verify the JWT token to ensure that it is valid
    try {
        const ticket = await client.verifyIdToken({
            idToken: id_token,
            audience: process.env.GOOGLE_WEB_CLIENT_ID,
        })
        const payload = ticket.getPayload()
        next()
    } catch (err) {
        console.error(err)
        return res
            .status(403)
            .send(
                "Session Expired. Please refresh and login again on the home page."
            )
    }
}

export default requireAuth
