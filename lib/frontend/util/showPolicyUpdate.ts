import { DateTime } from "luxon"
import getVersion from "./getVersion"
import fetchCurrentVersion from "./fetchCurrentVersion"

const showPolicyUpdate = () => {
    const visitedDate = DateTime.fromJSDate(
        JSON.parse(localStorage.getItem("visited_policy"))
    )
    const version = getVersion(fetchCurrentVersion())
    const updateDate = DateTime.fromJSDate(version.date)
    if (!version.policyChange) {
        return false
    }
    if (visitedDate.toMillis() > updateDate.toMillis()) {
        return false
    }
    return true
}

export default showPolicyUpdate
