import { Schema } from "mongoose";

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

export default userSchema;
