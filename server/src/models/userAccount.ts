import { Credentials } from "google-auth-library";

interface iUserAccount {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  googleOAuthCredentials: Credentials;
}

export default iUserAccount;
