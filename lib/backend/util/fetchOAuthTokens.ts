import axios from "axios"
import iTokenPayload from "../models/tokenPayload"
import iTokenResponse from "../models/tokenResponse"

const fetchOAuthTokens = async (
    code: string
): Promise<iTokenResponse | null> => {
    const URL = "https://oauth2.googleapis.com/token"
    const payload: iTokenPayload = {
        client_id: process.env.GOOGLE_WEB_CLIENT_ID!,
        client_secret: process.env.GOOGLE_WEB_CLIENT_SECRET!,
        code: code as string,
        grant_type: "authorization_code",
        redirect_uri: "postmessage",
    }
    const response = await axios.post(URL, payload, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    })
    const data: iTokenResponse = response.data
    return data
}

export default fetchOAuthTokens
