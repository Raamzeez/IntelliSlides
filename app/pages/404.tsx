import React, { FC } from "react"
import { Container } from "react-bootstrap"
import Button from "../components/Button"

const NotFound: FC = () => {
    return (
        <Container fluid className="App">
            <h1>Page Not Found</h1>
            <p style={{ fontWeight: 300, color: "grey", fontSize: 15 }}>404</p>
            <Button
                type="success"
                value="Back"
                // onClickHandler={() => navigate("/")}
                // onClickHandler={() => navigate(-1)}
                onClickHandler={() => console.log("Navigate")}
                style={{ marginTop: "5%" }}
            />
        </Container>
    )
}

export default NotFound
