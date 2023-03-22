import { ObjectId } from "mongodb"
import client from "../client"
import cryptr from "../cryptyr"
import verifyAccessToken from "../functions/verifyAccessToken"
import userDB from "../schemas/user"

const accessToken = async (id: ObjectId) => {
    const foundUser = await userDB.findById(id)
    if (!foundUser) {
        return null
    }
    const refreshToken = cryptr.decrypt(foundUser.refreshToken)
    client.setCredentials({ refresh_token: refreshToken })
    const response = await client.refreshAccessToken()
    const { access_token } = response.credentials
    const verified = await verifyAccessToken(access_token)
    if (verified === "success") {
        return access_token
    } else if (verified === "scopes") {
        return "invalid_scopes"
    }
    return null
}

export default accessToken
