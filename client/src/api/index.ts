import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:4000/api/v1",
    validateStatus: (s) => s >= 200 && s <= 299,
    headers: {
        Authorization: `Bearer ${localStorage.getItem("id_token")}`,
    },
})

export default api
