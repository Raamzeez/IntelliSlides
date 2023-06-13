import client from "../client"
import cryptr from "../cryptyr"
import userDB from "../schemas/user"
import { ObjectId } from "mongodb"

const refreshToken = async (id: ObjectId) => {
    const foundUser = await userDB.findById(id)
    if (!foundUser) {
        return null
    }
    const refreshToken = cryptr.decrypt(foundUser.refreshToken)
    let verified
    try {
        const tokenInfo = await client.getTokenInfo(refreshToken)
        verified = true
    } catch (err) {
        verified = false
    }
    if (!verified) {
        return null
    }
    return refreshToken
}

export default refreshToken
