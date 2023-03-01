import axios from "axios";

const verifyAccessToken = async (token: string) => {
  const response = await axios.get(
    "https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=" + token
  );
  if (response.status !== 200) {
    return false;
  }
  if (response.data.expires_in <= 1) {
    return false;
  }
  return true;
};

export default verifyAccessToken;
