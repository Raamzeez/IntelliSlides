import React, { useEffect, useState } from "react"
import { Col, Container, Image, Row } from "react-bootstrap"
import iPresentation from "../lib/frontend/models/presentation"
import BackArrow from "../components/BackArrow"
import Presentation from "../components/Presentation"

import api from "../lib/frontend/axios"
import iError from "../lib/frontend/models/error"
import { BounceLoader } from "react-spinners"
import { useStore } from "../lib/frontend/context/store"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faWarning } from "@fortawesome/free-solid-svg-icons"
import Button from "../components/Button"
import { useRouter } from "next/router"
import PresentationModal from "../components/PresentationModal"

interface iState {
    loading: boolean
    error: iError | null
    showModal: boolean
    selectedPresentation: iPresentation | null
    presentations: iPresentation[]
}

const Presentations: React.FC = () => {
    const router = useRouter()

    const { user, hydrateAll } = useStore()

    const [state, setState] = useState<iState>({
        loading: false,
        error: null,
        showModal: false,
        selectedPresentation: null,
        presentations: [
            {
                presentationId: "1",
                title: "Test",
                subtitle: "Test2",
                slideCount: 5,
                thumbnail: {
                    contentUrl:
                        "https://images.pexels.com/photos/7116676/pexels-photo-7116676.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                    height: 300,
                    width: 300,
                },
            },
            {
                presentationId: "2",
                title: "Test2",
                subtitle: "Test3",
                slideCount: 5,
                thumbnail: {
                    contentUrl:
                        "https://images.pexels.com/photos/7116676/pexels-photo-7116676.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                    height: 300,
                    width: 300,
                },
            },
        ],
    })

    useEffect(() => {
        const fetchData = async () => {
            await hydrateAll()
        }

        hydrateAll()

        // const fetchPresentations = async (): Promise<
        //     iPresentation[] | void
        // > => {
        //     console.log("Fetching Presentations")
        //     const response = await api.get("/user/presentations")
        //     if (response.status !== 200) {
        //         setState({
        //             ...state,
        //             loading: false,
        //             error: { message: response.data },
        //         })
        //     }
        //     if (response.data.length === 0) {
        //         setState({
        //             ...state,
        //             loading: false,
        //             error: {
        //                 message:
        //                     "You Don't Have Any Created Presentations To View",
        //             },
        //         })
        //     }
        //     setState({
        //         ...state,
        //         presentations: response.data,
        //         loading: false,
        //     })
        //     return response.data
        // }
        // setTimeout(() => {
        //     console.log( "user found on frontend" ,user)
        //     if (user) {
        //         // fetchPresentations()
        //     } else {
        //         setState({
        //             ...state,
        //             loading: false,
        //             error: {
        //                 message: "User Not Authenticated. Please login again.",
        //             },
        //         })
        //     }
        // }, 1000)
    }, [])

    return (
        <Container
            fluid
            className="Home"
            style={{ flex: 1, flexDirection: "column" }}
        >
            {state.selectedPresentation && (
                <PresentationModal
                    presentation={state.selectedPresentation}
                    onCloseHandler={() =>
                        setState({ ...state, selectedPresentation: null })
                    }
                />
            )}
            <BackArrow />
            <Row style={{ flex: 0.1 }}>
                <Col>
                    <h1
                        style={{ marginTop: 30, fontWeight: 300 }}
                        className="dynamic-color"
                    >
                        Presentations
                    </h1>
                </Col>
            </Row>
            <Row
                style={{ width: "100vw", flex: 0.9, marginTop: 30 }}
                className="center-container"
            >
                {!state.error ? (
                    <>
                        {!state.loading &&
                            state.presentations.length > 0 &&
                            state.presentations.map((presentation, index) => {
                                return (
                                    <Col
                                        key={index}
                                        lg={4}
                                        className="center-container"
                                    >
                                        <Presentation
                                            presentation={presentation}
                                            onClickHandler={() =>
                                                setState({
                                                    ...state,
                                                    selectedPresentation:
                                                        presentation,
                                                })
                                            }
                                        />
                                    </Col>
                                )
                            })}
                        {state.loading && (
                            <BounceLoader size={200} color="dodgerblue" />
                        )}
                    </>
                ) : (
                    <>
                        <Col
                            className="center-column animate__animated animate__fadeInDown"
                            style={{ marginBottom: "7.5%" }}
                        >
                            <FontAwesomeIcon
                                icon={faWarning}
                                size="6x"
                                color="#fcba03"
                            />
                            <h3
                                style={{ marginTop: 30, fontWeight: 600 }}
                                className="dynamic-color"
                            >
                                {state.error.message}
                            </h3>
                            <Button
                                style={{ marginTop: 50 }}
                                type="secondary"
                                value="Home"
                                onClickHandler={() => router.push("/app")}
                            />
                        </Col>
                    </>
                )}
            </Row>
        </Container>
    )
}

export default Presentations
