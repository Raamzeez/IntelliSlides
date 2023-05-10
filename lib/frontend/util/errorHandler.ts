import { AxiosResponse } from "axios"

const errorHandler = (
    response: AxiosResponse,
    state: any,
    logout: () => void,
    customState?: any
) => {
    const setStateObject = {
        ...state,
        ...customState,
        warning: null,
        error: { status: response.status, message: response.data },
    }
    if (response.status !== 200) {
        if (response.status === 401 || response.status === 403) {
            logout()
        }
        return setStateObject
    }
}

export default errorHandler
