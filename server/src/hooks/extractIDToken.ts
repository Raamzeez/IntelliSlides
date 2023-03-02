import { Request } from "express";

const extractIDToken = (req: Request) => {
  return req.headers.authorization.split(" ")[1];
};

export default extractIDToken;
