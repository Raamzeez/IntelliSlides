import React from "react"
import Head from "next/head"
import { AppProps } from "next/app"
import { GoogleOAuthProvider } from "@react-oauth/google"
import "../public/style/index.css"
import "../public/style/fonts.css"
import "../public/style/App.css"
import "../public/style/bootstrap.min.quartz.css"
import "react-toastify/dist/ReactToastify.css"

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <React.StrictMode>
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
        </React.StrictMode>
    )
}

export default MyApp
