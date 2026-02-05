import axios from "axios";

export async function fetchOAuthToken() {
  const res = await axios.post(
    process.env.OAUTH_TOKEN_URL!,
    {
      grant_type: "client_credentials",
      client_id: process.env.OAUTH_CLIENT_ID,
      client_secret: process.env.OAUTH_CLIENT_SECRET,
      scope: process.env.OAUTH_SCOPE,
    },
    { timeout: 3000 }
  );

  return res.data; // { access_token, expires_in }
}
