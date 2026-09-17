

const API_ENDPOINT = import.meta.env.VITE_API_BASE_URL

export const ENDPOINT = {
    "saveUser": API_ENDPOINT + "/accounts/saveUser/",
    "logout": API_ENDPOINT + "/accounts/logout/",
    "register": API_ENDPOINT + "/accounts/register/",
    "profile": API_ENDPOINT + "/accounts/profile/",
    "token_refresh": API_ENDPOINT + "/accounts/token/refresh/",

}