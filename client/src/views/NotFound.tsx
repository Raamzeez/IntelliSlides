import React, { FC } from "react"
import { Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import Button from "../../components/Button"

const NotFound: FC = () => {
    const navigate = useNavigate()

    return (
        <Container fluid className="App">
            <h1>Page Not Found</h1>
            <p style={{ fontWeight: 300, color: "grey", fontSize: 15 }}>404</p>
            <Button
                type="success"
                value="Back"
                // onClickHandler={() => navigate("/")}
                onClickHandler={() => navigate(-1)}
                style={{ marginTop: "5%" }}
            />
        </Container>
    )
}

export default NotFound
