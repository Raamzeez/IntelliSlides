const showBetaAlert = () => {
    if (typeof window !== "undefined" && window.sessionStorage) {
        if (sessionStorage.getItem("showAlert") === "false") {
            return false
        }
        return true
    }
    return false
}

export default showBetaAlert
