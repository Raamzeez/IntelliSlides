import React from "react"
import Head from "next/head"
import { AppProps } from "next/app"
import { GoogleOAuthProvider } from "@react-oauth/google"

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <GoogleOAuthProvider clientId="17334999010-paoosc6532efnvctrbbjat1acl9vplnk.apps.googleusercontent.com">
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <title>IntelliSlides</title>
            </Head>
            <main>
                <Component {...pageProps} />
            </main>
        </GoogleOAuthProvider>
    )
}

export default MyApp
