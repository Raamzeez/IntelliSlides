import jwtDecode from "jwt-decode"
import extractIDToken from "../../../../lib/backend/hooks/extractIDToken"
import iUserJWT from "../../../../lib/backend/models/userJWT"
import { authenticatedHandler } from "../../../../lib/backend/handlers/auth_guard"

export default authenticatedHandler(async (req, res) => {
    const id_token = extractIDToken(req)
    const { name, picture, email }: iUserJWT = jwtDecode(id_token)
    const responseObj = { name, picture, email }
    return res.status(200).send(responseObj)
})
