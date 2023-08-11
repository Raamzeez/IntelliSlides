import { authenticatedHandler } from "../../../../lib/backend/handlers/auth_guard"
import iPresentation from "../../../../lib/backend/models/presentation"
import userDB from "../../../../lib/backend/schemas/user"
import idTokenToMongoID from "../../../../lib/backend/util/idTokenToMongoID"

export default authenticatedHandler(async (req, res) => {
    try {
        const presentationId = req.body.presentationId
        console.log("Id", presentationId)
        const _id = idTokenToMongoID(req)
        const foundUser = await userDB.findOne({ _id })
        const presentations: iPresentation[] = foundUser.presentations
        let foundIndex = -1
        presentations.forEach((presentation, index) => {
            if (presentation.presentationId === presentationId) {
                foundIndex = index
                return
            }
        })
        if (foundIndex < 0) {
            return res.status(404).send("Unable to find presentation")
        }
        presentations.splice(foundIndex, 1)
        const updatedUser = await userDB.findOneAndUpdate(
            { _id },
            {
                $set: {
                    presentations,
                },
            }
        )
        return res.status(200).send("Successfully deleted presentation!")
    } catch (err) {
        console.error(err)
        return res.status(400).send("Unable to delete presentation.")
    }
})
