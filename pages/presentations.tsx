import React, { useEffect, useState } from "react"
import { Col, Container, Image, Row } from "react-bootstrap"
import iPresentation from "../lib/frontend/models/presentation"
import BackArrow from "../components/BackArrow"

import api from "../lib/frontend/axios"
import iError from "../lib/frontend/models/error"
import { BounceLoader } from "react-spinners"

interface iState {
    loading: boolean
    presentations: iPresentation[]
    error: iError | null
}

const Presentations: React.FC = () => {
    useEffect(() => {
        const fetchPresentations = async () => {
            console.log("Fetching Presentations")
            const response = await api.get("/user/presentations")
            if (response.status !== 200) {
                return setState({
                    ...state,
                    loading: false,
                    error: { message: response.data },
                })
            }
            console.log(response.data)
            setState({ ...state, presentations: response.data, loading: false })
        }
        fetchPresentations()
    }, [])

    const [state, setState] = useState<iState>({
        loading: true,
        error: null,
        presentations: [],
    })

    useEffect(() => {})

    return (
        <Container
            fluid
            className="Home"
            style={{ flex: 1, flexDirection: "column" }}
        >
            <BackArrow />
            <Row style={{ flex: 0.1 }}>
                <Col>
                    <h1 style={{ marginTop: 30, fontWeight: 300 }}>
                        Presentations
                    </h1>
                </Col>
            </Row>
            <Row
                style={{ width: "100vw", flex: 0.9, marginTop: 30 }}
                className="center-container"
            >
                {!state.loading &&
                    state.presentations.map(
                        ({ title, subtitle, thumbnail }, index) => {
                            return (
                                <Col
                                    key={index}
                                    lg={4}
                                    className="center-container"
                                >
                                    <Image
                                        src={thumbnail.contentUrl}
                                        // height={thumbnail.height}
                                        // width={thumbnail.width}
                                        height={300}
                                        width={300}
                                        style={{ position: "absolute" }}
                                    />
                                    <div
                                        style={{
                                            // height: thumbnail.height,
                                            // width: thumbnail.width,
                                            height: 300,
                                            width: 300,
                                        }}
                                        className="presentation-card pointer center-column"
                                    >
                                        <h3>{title}</h3>
                                        <h3>{subtitle}</h3>
                                    </div>
                                </Col>
                            )
                        }
                    )}
                {state.loading && (
                    <BounceLoader size={200} color="dodgerblue" />
                )}
            </Row>
        </Container>
    )
}

export default Presentations
