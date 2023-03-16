import React from "react"
import ReactDOM from "react-dom/client"
import "./style/index.css"
import "./style/fonts.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { ThemeProvider } from "theme-ui"
import { theme } from "./style/theme"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
    // <React.StrictMode>
    <GoogleOAuthProvider clientId="17334999010-paoosc6532efnvctrbbjat1acl9vplnk.apps.googleusercontent.com">
        <App />
    </GoogleOAuthProvider>
    // </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
