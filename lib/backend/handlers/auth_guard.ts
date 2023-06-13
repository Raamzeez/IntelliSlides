import { NextApiHandler, NextApiRequest, NextApiResponse } from "next/types"
import client from "../client"
import extractIDToken from "../util/extractIDToken"
import idTokenToMongoID from "../util/idTokenToMongoID"
import refreshToken from "../util/refreshToken"

export function authenticatedHandler(handler: NextApiHandler) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        try {
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
                return handler(req, res)

            } catch (err) {
                const mongoId = idTokenToMongoID(req)
                const rfToken = await refreshToken(mongoId)

                const { tokens } = await client.getToken(rfToken!)

                const ticket = await client.verifyIdToken({
                idToken: tokens.id_token!,
                audience: process.env.GOOGLE_WEB_CLIENT_ID,
                })

                const payload = ticket.getPayload()
                return handler(req, res)
            }
        } catch (err) {
            console.error(err)
        }
    }
}
