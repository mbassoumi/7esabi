export const IS_PROD = process.env.NODE_ENV === "production";
export const API_SERVER = "https://mybank-api.bisoomi.com";
export const GRAPHQL_URL = API_SERVER + "/graphql";
export const DEFAULT_OAUTH_URL =
  "https://bisoomico.auth.eu-central-1.amazoncognito.com/login?redirect_uri=https%3A%2F%2Fmybank.bisoomi.com%2Foauth_callback&response_type=code&client_id=6u52kh8ajmsgurkk64s16hmrfs";
