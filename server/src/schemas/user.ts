import mongoose, { Schema } from "mongoose"
import iUserAccount from "../models/userAccount"

const schema = {
    firstName: String,
    lastName: String,
    email: String,
    googleOAuthCredentials: {
        refresh_token: String,
        expiry_date: Number,
        access_token: String,
        token_type: String,
        id_token: String,
        scope: String,
    },
    slidesInHour: {
        date: Date,
        slideCount: Number,
    },
    presentations: [
        {
            topic: String,
            title: String,
            subtitle: String,
            slideCount: Number,
            id: String,
            thumbnail: {
                contentUrl: String,
                height: Number,
                width: Number,
            },
        },
    ],
}

const userSchema = new Schema(schema)

const userDB = mongoose.model<iUserAccount>("users", userSchema)

export default userDB
