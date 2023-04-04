import axios from "axios"

const api = axios.create({
    baseURL:
        process.env.NODE_ENV === "development"
            ? `http://localhost:4000/api/v1`
            : "/api/v1",
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
