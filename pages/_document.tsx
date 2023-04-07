import React from "react"
import Document, { Head, Main, NextScript, Html } from "next/document"
import Script from "next/script"

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <Script
                        async
                        src="https://www.googletagmanager.com/gtag/js?id=G-GYT5YBMLYB"
                    />
                    <Script>
                        {`
                        window.dataLayer = window.dataLayer || [] function
                        gtag() {dataLayer.push(arguments)}
                        gtag("js", new Date()) gtag("config", "G-GYT5YBMLYB")
                        `}
                    </Script>
                    <link rel="icon" href="favicon.ico" />
                    <link
                        rel="apple-touch-icon"
                        href="%PUBLIC_URL%/logo192.png"
                    />
                    <link
                        rel="stylesheet"
                        href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
