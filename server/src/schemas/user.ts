import mongoose, { Schema } from "mongoose";
import iUserAccount from "../models/userAccount";

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
};

const userSchema = new Schema(schema);

const userDB = mongoose.model<iUserAccount>("users", userSchema);

export default userDB;
