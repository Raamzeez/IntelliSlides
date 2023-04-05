import axios from "axios"
import VerifyResponse from "../types/verifyResponse"

const verifyAccessToken = async (token: string): Promise<VerifyResponse> => {
    const response = await axios.get(
        "https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=" + token
    )
    if (response.status !== 200) {
        return "unverifiable"
    }
    if (response.data.expires_in <= 1) {
        return "expired"
    }
    const scopes = response.data.scope.split(" ")
    if (!scopes.includes("https://www.googleapis.com/auth/presentations")) {
        return "scopes"
    }
    return "success"
}

export default verifyAccessToken
