import client from "../client"
import cryptr from "../cryptyr"
import userDB from "../schemas/user"

const refreshToken = async (id: string) => {
    const foundUser = await userDB.findById(id)
    if (!foundUser) {
        return null
    }
    const refreshToken = cryptr.decrypt(foundUser.refreshToken)
    let verified
    try {
        const tokenInfo = await client.getTokenInfo(refreshToken)
        console.log(tokenInfo)
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
