import jwtDecode from "jwt-decode"
import { ObjectId } from "mongodb"
import { NextApiRequest, NextApiResponse } from "next/types"
import client from "../../../../lib/backend/client"
import cryptr from "../../../../lib/backend/cryptyr"
import verifyAccessToken from "../../../../lib/backend/functions/verifyAccessToken"
import subToObjectId from "../../../../lib/backend/hooks/subToObjectId"
import iUserJWT from "../../../../lib/backend/models/userJWT"
import userDB from "../../../../lib/backend/schemas/user"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // console.log(req.headers);
    try {
        //Google guidelines suggest we check and verify the header name and value
        if (req.headers["x-requested-with"] !== "XmlHttpRequest") {
            return res
                .status(400)
                .send("Invalid Login Request. Please try again.")
        }
        //We retrieve the authorization code from the request
        const code = req.query.code as string
        //We use the built in Node JS OAuth2Client to get id and access token data
        const tokensResponse = await (await client.getToken(code)).tokens
        const { id_token, access_token, refresh_token } = tokensResponse
        if (!access_token || !id_token || !refresh_token) {
            return res
                .status(401)
                .send(
                    "Unable to get authorization credentials. Please try again"
                )
        }
        const verify = await verifyAccessToken(access_token)
        if (verify === "scopes") {
            return res
                .status(403)
                .send(
                    "Unable to Login because not all permissions have been granted. Please try again by granting all permissions."
                )
        }
        if (verify === "expired" || verify === "unverifiable") {
            return res.status(403).send("Unable to Login. Please try again.")
        }
        const userResponse: iUserJWT = jwtDecode(id_token)
        //We confirm that the user is veriifed by Google
        if (!userResponse.email_verified) {
            return res.status(403).send("Google account is not verified")
        }
        //We sent the ID token in a secure httpOnly cookie to the frontend
        const UTCSeconds = userResponse.exp
        const date = new Date(0)
        date.setUTCSeconds(UTCSeconds)
        //We then either update the user in the MongoDB database with updated credentials or add the user if it doesn't exist
        const id = userResponse.sub
        const foundUser = await userDB.findByIdAndUpdate(
            new ObjectId(subToObjectId(id)),
            {
                firstName: userResponse.given_name,
                lastName: userResponse.family_name,
                email: userResponse.email,
                refreshToken: cryptr.encrypt(refresh_token),
            },
            { upsert: true, new: true }
        )
        return res.status(200).send({
            id_token,
        })
    } catch (err) {
        return res
            .status(400)
            .send(
                "Unable to Login user. Our backend may be experiencing issues, please try again later."
            )
    }
}
