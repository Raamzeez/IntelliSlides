import jwtDecode from "jwt-decode"
import { ObjectId } from "mongodb"
import { NextApiRequest } from "next/types"
import extractIDToken from "./extractIDToken"
import subToObjectId from "./subToObjectId"
import iUserJWT from "../models/userJWT"

const idTokenToMongoID = (req: NextApiRequest): ObjectId => {
    const ObjectID = new ObjectId(
        subToObjectId((jwtDecode(extractIDToken(req)) as iUserJWT).sub)
    )
    return ObjectID
}

export default idTokenToMongoID
