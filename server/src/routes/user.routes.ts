import express from "express";
import jwtDecode from "jwt-decode";
import { ObjectId } from "mongodb";
import client from "../client";
import extractIDToken from "../hooks/extractIDToken";
import subToObjectId from "../hooks/subToObjectId";
import requireAuth from "../middleware/requireAuth";
import iUserJWT from "../models/userJWT";
import userDB from "../schemas/user";

const userRouter = express.Router();

userRouter.get("/userInfo", requireAuth, (req, res) => {
  const id_token = extractIDToken(req);
  const { name, picture, email }: iUserJWT = jwtDecode(id_token);
  const responseObj = { name, picture, email };
  console.log("responseObj");
  console.log(responseObj);
  return res.status(200).send(responseObj);
});

userRouter.get("/login", async (req, res) => {
  console.log("Verifying Code");
  // console.log(req.headers);
  try {
    //Google guidelines suggest we check and verify the header name and value
    if (req.headers["x-requested-with"] !== "XmlHttpRequest") {
      return res.status(400).send("Invalid Headers");
    }
    //We retrieve the authorization code from the request
    const code = req.query.code as string;
    //We use the built in Node JS OAuth2Client to get id and access token data
    const tokensResponse = await (await client.getToken(code)).tokens;
    const { id_token } = tokensResponse;
    console.log(id_token);
    const userResponse: iUserJWT = jwtDecode(id_token);
    console.log("User Decoded JWT ID Token");
    console.log(userResponse);
    //We confirm that the user is veriifed by Google
    if (!userResponse.email_verified) {
      return res.status(403).send("Google account is not verified");
    }
    //We sent the ID token in a secure httpOnly cookie to the frontend
    const UTCSeconds = userResponse.exp;
    const date = new Date(0);
    date.setUTCSeconds(UTCSeconds);
    console.log("Set cookie");
    //We then either update the user in the MongoDB database with updated credentials or add the user if it doesn't exist
    const id = userResponse.sub;
    const foundUser = await userDB.findByIdAndUpdate(
      new ObjectId(subToObjectId(id)),
      {
        firstName: userResponse.given_name,
        lastName: userResponse.family_name,
        email: userResponse.email,
        googleOAuthCredentials: tokensResponse,
      },
      { upsert: true, new: true }
    );
    console.log("Stored user with id: " + id);
    console.log(foundUser);
    return res.status(200).send({
      id_token,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).send("Error");
  }
});

export default userRouter;
