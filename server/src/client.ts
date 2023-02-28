import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(
  process.env.GOOGLE_WEB_CLIENT_ID,
  process.env.GOOGLE_WEB_CLIENT_SECRET,
  "postmessage"
);

export default client;
