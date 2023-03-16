import { NextFunction, Request, Response } from "express"
import jwtDecode from "jwt-decode"
import client from "../client"
import iUserJWT from "../models/userJWT"
import extractIDToken from "../hooks/extractIDToken"
import subToObjectId from "../hooks/subToObjectId"

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    // Get the JWT token from the HttpOnly cookie
    console.log("Calling requireAuth Middleware")
    const id_token = extractIDToken(req)
    // If the JWT token is not present, redirect the user to the login page
    console.log("ID Token: " + id_token)
    if (!id_token) {
        console.log("No ID Token")
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
        console.log("Payload")
        console.log(payload)
        console.log("Verified ID Token")
        next()
    } catch (err) {
        console.log("Unverified ID Token")
        console.error(err)
        return res
            .status(403)
            .send("Session Expired. Please login again on the home page.")
    }
}

export default requireAuth
