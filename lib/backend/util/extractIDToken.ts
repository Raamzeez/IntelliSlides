import { NextApiRequest } from "next/types"

const extractIDToken = (req: NextApiRequest) => {
    return req.headers.authorization!.split(" ")[1]
}

export default extractIDToken
