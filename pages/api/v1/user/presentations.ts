import dbConnect from "../../../../lib/backend/util/dbConnect"
import { authenticatedHandler } from "../../../../lib/backend/handlers/auth_guard"
import userDB from "../../../../lib/backend/schemas/user"
import idTokenToMongoID from "../../../../lib/backend/util/idTokenToMongoID"

export default authenticatedHandler(async (req, res) => {
    try {
        await dbConnect()
        const _id = idTokenToMongoID(req)
        const foundUser = await userDB.findOne({ _id })
        return foundUser.presentations
    } catch (err) {
        console.error(err)
        return res
            .status(500)
            .send(
                "Server/Internal Issue - Unable to Fetch Presentations. Please try again later."
            )
    }
})
