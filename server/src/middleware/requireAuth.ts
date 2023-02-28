import { NextFunction, Request, Response } from "express";
import client from "../client";

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  // Get the JWT token from the HttpOnly cookie
  const id_token = req.cookies.id_token;
  // If the JWT token is not present, redirect the user to the login page
  if (!id_token) {
    res.redirect("http://localhost:3000/");
    return;
  }

  // Verify the JWT token to ensure that it is valid
  try {
    await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_WEB_CLIENT_ID,
    });
    next();
  } catch (err) {
    res.redirect("http://localhost:3000/");
  }
};

export default requireAuth;
