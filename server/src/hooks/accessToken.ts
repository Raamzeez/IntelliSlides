import client from "../client";
import verifyAccessToken from "../functions/verifyAccessToken";
import userDB from "../schemas/user";

const accessToken = async (id: string) => {
  const foundUser = await userDB.findById(id);
  if (!foundUser) {
    return null;
  }
  const accessToken = foundUser.googleOAuthCredentials.access_token;
  const verified = await verifyAccessToken(accessToken);
  if (!verified) {
    const refreshToken = foundUser.googleOAuthCredentials.refresh_token;
    client.setCredentials({
      refresh_token: refreshToken,
      access_token: accessToken,
    });
    const credentials = await (await client.refreshAccessToken()).credentials;
    const updatedUser = foundUser.update({
      $set: { googleOAuthCredentials: credentials },
    });
    return credentials.access_token;
  }
  return accessToken;
};

export default accessToken;
