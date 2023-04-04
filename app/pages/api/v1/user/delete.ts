import { NextApiRequest, NextApiResponse } from "next/types"
import idTokenToMongoID from "../../../../lib/backend/functions/idTokenToMongoID"
import userDB from "../../../../lib/backend/schemas/user"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const _id = idTokenToMongoID(req)
    const foundUser = await userDB.findOne({ _id })
    if (!foundUser) {
        return res
            .status(404)
            .send("The user doesn't have any data in our database yet.")
    }
    try {
        const deletedUser = await foundUser.delete()
        return res.status(200).send("Success!")
    } catch (err) {
        return res
            .status(500)
            .send(
                "Server/Internal Issue - Unable to Delete User. Please try again later."
            )
    }
}
