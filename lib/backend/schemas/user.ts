import mongoose, { Schema } from "mongoose"
import iUserAccount from "../models/userAccount"

const schema = {
    firstName: String,
    lastName: String,
    email: String,
    refreshToken: String,
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

const userDB =
    mongoose.models.users || mongoose.model<iUserAccount>("users", userSchema)

export default userDB
