import express from "express";
import jwtDecode from "jwt-decode";
import iUserJWT from "../models/userJWT";

const router = express.Router();

router.get("/fetchUserInfo", (req, res) => {
  const id_token = req.cookies.id_token;
  const { name, picture, email }: iUserJWT = jwtDecode(id_token);
  const responseObj = { name, picture, email };
  return res.status(200).send(responseObj);
});

export default router;
