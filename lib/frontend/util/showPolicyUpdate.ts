import { DateTime } from "luxon"
import getVersion from "./getVersion"
import fetchCurrentVersion from "./fetchCurrentVersion"

const showPolicyUpdate = () => {
    if (typeof window !== "undefined" && window.localStorage) {
        if (!localStorage.getItem("privacy_visited")) {
            return false
        }
        const visitedDate = DateTime.fromISO(
            localStorage.getItem("privacy_visited")
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
    return false
}

export default showPolicyUpdate
