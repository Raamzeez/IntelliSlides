import React from "react"
import Button from "../components/Button"
import { Container, Form } from "react-bootstrap"

const Contact: React.FC = () => {
    return (
        <Container fluid className="Home">
            <h1 className="dynamic-color" style={{ marginTop: 25 }}>
                Contact
            </h1>
            <p className="dynamic-color" style={{ marginTop: 25 }}>
                Email: intellislides.contact@gmail.com
            </p>
            <div
                style={{ height: "60vh", width: "60vw", marginTop: 25 }}
                className="shadow"
            >
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label className="dynamic-color">Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            className="dynamic-color"
                        />
                    </Form.Group>
                    <Form.Group
                        controlId="formBasicEmail"
                        style={{ marginTop: 20 }}
                    >
                        <Form.Label className="dynamic-color">Type</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            className="dynamic-color"
                        />
                    </Form.Group>
                    <Form.Group
                        controlId="formBasicEmail"
                        style={{ marginTop: 20 }}
                    >
                        <Form.Label className="dynamic-color">
                            Message
                        </Form.Label>
                        <br />
                        <textarea name="Text1" cols={40} rows={5}></textarea>
                    </Form.Group>
                </Form>
            </div>
            <Button
                style={{ margin: 30 }}
                type="success"
                value="Submit"
                onClickHandler={() => null}
            />
        </Container>
    )
}

export default Contact
