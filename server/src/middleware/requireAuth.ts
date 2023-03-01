import { NextFunction, Request, Response } from "express";
import client from "../client";

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  // Get the JWT token from the HttpOnly cookie
  console.log("Calling requireAuth Middleware");
  const id_token = req.cookies.id_token;
  // If the JWT token is not present, redirect the user to the login page
  console.log(req.cookies);
  console.log("ID Token: " + id_token);
  if (!id_token) {
    console.log("No ID Token");
    return res.status(400).send("FAIL");
  }

  // Verify the JWT token to ensure that it is valid
  try {
    await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_WEB_CLIENT_ID,
    });
    console.log("Verified ID Token");
    next();
  } catch (err) {
    console.log("Unverifiable ID Token");
    return res.status(400).send("FAIL");
  }
};

export default requireAuth;
