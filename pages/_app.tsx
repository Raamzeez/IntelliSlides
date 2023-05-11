//Libraries
import { config } from "@fortawesome/fontawesome-svg-core"
import { AppProps } from "next/app"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { ThemeProvider } from "next-themes"
import { SSRProvider } from "react-bootstrap"
import { StoreProvider } from "../lib/frontend/context/store"

import React from "react"
import Head from "next/head"

// //Library CSS
import "react-toastify/dist/ReactToastify.css"
import "@fortawesome/fontawesome-svg-core/styles.css"

// //Bootstrap CSS
import "../styles/bootstrap.min.quartz.css"
// import "bootstrap/dist/css/bootstrap.min.css"

// //Custom CSS
import "../styles/index.css"
import "../styles/fonts.css"
import "../styles/backgrounds.css"

import "../styles/App.css"
import "../styles/home.css"
import "../styles/privacy.css"
import "../styles/versions.css"
import "../styles/presentations.css"

config.autoAddCss = false

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <React.StrictMode>
            <ThemeProvider defaultTheme="light">
                <StoreProvider>
                    <SSRProvider>
                        <GoogleOAuthProvider clientId="17334999010-paoosc6532efnvctrbbjat1acl9vplnk.apps.googleusercontent.com">
                            <Head>
                                <meta charSet="utf-8" />
                                <meta
                                    name="viewport"
                                    content="width=device-width, initial-scale=1"
                                />
                                <meta name="theme-color" content="#000000" />
                                <meta
                                    name="description"
                                    content="Web site created using create-react-app"
                                />
                                <title>IntelliSlides</title>
                            </Head>
                            <main>
                                <Component {...pageProps} />
                            </main>
                        </GoogleOAuthProvider>
                    </SSRProvider>
                </StoreProvider>
            </ThemeProvider>
        </React.StrictMode>
    )
}

export default MyApp
