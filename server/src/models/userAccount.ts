import { Credentials } from "google-auth-library"
import iPresentation from "./presentation"

interface iUserAccount {
    _id: string
    firstName: string
    lastName: string
    email: string
    refreshToken: string
    slidesInHour: {
        date: Date
        slideCount: number
    }
    presentations: iPresentation[]
}

export default iUserAccount
