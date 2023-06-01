import React, { FC } from "react"
import { Container } from "react-bootstrap"
import Button from "../components/Button"
import { useRouter } from "next/router"

const NotFound: FC = () => {
    const router = useRouter()

    return (
        <Container fluid className="App">
            <h1 className="animate__animated animate__fadeIn dynamic-color">
                Page Not Found
            </h1>
            <p style={{ fontWeight: 300, color: "grey", fontSize: 15 }}>404</p>
            <Button
                type="primary"
                value="Back"
                onClickHandler={() => router.back()}
                style={{ marginTop: "5%" }}
                className="shadowHover ease"
            />
        </Container>
    )
}

export default NotFound
