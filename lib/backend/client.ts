import { OAuth2Client } from "google-auth-library"

const client = new OAuth2Client(
    process.env.GOOGLE_WEB_CLIENT_ID,
    process.env.GOOGLE_WEB_CLIENT_SECRET,
    // "http://localhost:3000/api/v1/login"
    "postmessage"
)

export default client
