interface iTokenPayload {
  client_id: string;
  client_secret: string;
  code: string;
  grant_type: string;
  redirect_uri: string;
}

export default iTokenPayload;
