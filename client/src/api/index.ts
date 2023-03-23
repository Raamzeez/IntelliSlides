import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:4000/api/v1",
    validateStatus: (s) => s >= 200 && s <= 500,
    headers: {
        Authorization: `Bearer ${localStorage.getItem("id_token")}`,
    },
    timeout: 10000,
})

export default api
