import idTokenToMongoID from "../../../../lib/backend/util/idTokenToMongoID"
import userDB from "../../../../lib/backend/schemas/user"
import { authenticatedHandler } from "../../../../lib/backend/handlers/auth_guard"
import dbConnect from "../../../../lib/backend/util/dbConnect"

export default authenticatedHandler(async (req, res) => {
    try {
        await dbConnect()
        const _id = idTokenToMongoID(req)
        await userDB.findOneAndDelete({ _id })
        return res.status(200).send("Success!")
    } catch (err) {
        console.error(err)
        return res
            .status(500)
            .send(
                "Server/Internal Issue - Unable to Delete User. Please try again later."
            )
    }
})
