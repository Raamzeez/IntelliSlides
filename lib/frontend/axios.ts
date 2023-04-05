import axios from "axios"

const api = axios.create({
    baseURL: "/api/v1",
    validateStatus: (s) => s >= 200 && s <= 500,
    headers: {
        Authorization: `Bearer ${
            typeof localStorage !== "undefined" &&
            localStorage.getItem("id_token")
        }`,
    },
    timeout: 10000,
})

export default api
