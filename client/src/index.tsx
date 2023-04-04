import React from "react"
import ReactDOM from "react-dom/client"
import "./style/index.css"
import "./style/fonts.css"
import App from "./views/App"
import reportWebVitals from "./reportWebVitals"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import PrivacyPolicy from "./views/PrivacyPolicy"
import NotFound from "./views/NotFound"
import Home from "./views/Home"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId="17334999010-paoosc6532efnvctrbbjat1acl9vplnk.apps.googleusercontent.com">
            <Router>
                <Routes>
                    <Route path="*" element={<NotFound />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/app" element={<App />} />
                    {/* <Route path="/versions" element={<Versions />} /> */}
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                </Routes>
            </Router>
        </GoogleOAuthProvider>
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
