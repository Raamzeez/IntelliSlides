import jwtDecode from "jwt-decode"
import { NextApiRequest, NextApiResponse } from "next/types"
import extractIDToken from "../../../../lib/backend/hooks/extractIDToken"
import iUserJWT from "../../../../lib/backend/models/userJWT"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const id_token = extractIDToken(req)
    const { name, picture, email }: iUserJWT = jwtDecode(id_token)
    const responseObj = { name, picture, email }
    return res.status(200).send(responseObj)
}
