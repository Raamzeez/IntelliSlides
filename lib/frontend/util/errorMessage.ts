import { AxiosError } from "axios"

const errorMessage = (err: AxiosError) => {
    let errorMessage = (err as AxiosError).message
    if (errorMessage === "Network Error") {
        errorMessage +=
            " - Unable to Reach Our Servers. Please try again later."
    }
    return errorMessage
}

export default errorMessage
