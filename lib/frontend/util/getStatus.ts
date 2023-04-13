import loadingStatuses from "../data/loadingStatuses"
import iError from "../models/error"
import LoadingType from "../types/loading"

const getStatus = (
    status: LoadingType,
    loadingStatus: LoadingType,
    error: iError | null
) => {
    if (error && loadingStatus === status) {
        return "error"
    }
    if (loadingStatus === status) {
        return "loading"
    }
    let loadingStatusIndex = 0
    let statusIndex = 0
    loadingStatuses.forEach((obj, index) => {
        if (obj.type === loadingStatus) {
            loadingStatusIndex = index
        }
        if (obj.type === status) {
            statusIndex = index
        }
    })
    if (loadingStatusIndex > statusIndex) {
        return "success"
    }
    return "hold"
}

export default getStatus
