import React, { useEffect, useState } from "react"
import { Col, Container, Image, Row } from "react-bootstrap"
import iPresentation from "../lib/frontend/models/presentation"
import BackArrow from "../components/BackArrow"

import api from "../lib/frontend/axios"
import iError from "../lib/frontend/models/error"
import { BounceLoader } from "react-spinners"
import { useStore } from "../lib/frontend/context/store"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faWarning } from "@fortawesome/free-solid-svg-icons"
import Button from "../components/Button"
import { useRouter } from "next/router"
import { useSpring, animated } from "react-spring"

interface iState {
    loading: boolean
    presentations: iPresentation[]
    error: iError | null
}

const trans = (x, y, s) =>
    `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

const calc = (x, y) => {
    if (typeof window !== "undefined") {
        const BUFFER = 50

        const why = -(y - window.innerHeight / 2) / BUFFER
        const ex = (x - window.innerWidth / 2) / BUFFER

        console.log("why", why)
        console.log("y", y)
        return [-(y / 50), x / 50, 1.1]
    }
}

const Presentations: React.FC = () => {
    const router = useRouter()

    const { user } = useStore()

    const [state, setState] = useState<iState>({
        loading: false,
        error: null,
        presentations: [
            {
                presentationId: "1",
                title: "Test",
                subtitle: "Test2",
                thumbnail: {
                    contentUrl:
                        "https://images.pexels.com/photos/7116676/pexels-photo-7116676.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                    height: 300,
                    width: 300,
                },
            },
        ],
    })

    const [props, set] = useSpring(() => ({
        xys: [0, 0, 1],
        config: { mass: 5, tension: 350, friction: 40 },
    }))

    useEffect(() => {
        const fetchPresentations = async (): Promise<
            iPresentation[] | void
        > => {
            console.log("Fetching Presentations")
            const response = await api.get("/user/presentations")
            if (response.status !== 200) {
                setState({
                    ...state,
                    loading: false,
                    error: { message: response.data },
                })
            }
            if (response.data.length === 0) {
                setState({
                    ...state,
                    loading: false,
                    error: {
                        message:
                            "You Don't Have Any Created Presentations To View",
                    },
                })
            }
            setState({
                ...state,
                presentations: response.data,
                loading: false,
            })
            return response.data
        }
        setTimeout(() => {
            console.log(user)
            if (user) {
                // fetchPresentations()
            } else {
                setState({
                    ...state,
                    loading: false,
                    error: {
                        message: "User Not Authenticated. Please login again.",
                    },
                })
            }
        }, 1000)
    }, [])

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
                {!state.error ? (
                    <>
                        {!state.loading &&
                            state.presentations.length > 0 &&
                            state.presentations.map(
                                ({ title, subtitle, thumbnail }, index) => {
                                    return (
                                        <Col
                                            key={index}
                                            lg={4}
                                            className="center-container"
                                        >
                                            {/* <animated.div
                                                onMouseMove={(e) => {
                                                    const {
                                                        clientX: x,
                                                        clientY: y,
                                                    } = e

                                                    return set({
                                                        xys: calc(x, y),
                                                    })
                                                }}
                                                // onMouseLeave={() => set({ xys: [0, 0, 1] })}
                                                style={{
                                                    transform:
                                                        props.xys.interpolate(
                                                            trans
                                                        ),
                                                }}
                                            > */}
                                            <Image
                                                src={thumbnail.contentUrl}
                                                height={300}
                                                width={300}
                                                style={{
                                                    position: "absolute",
                                                }}
                                            />
                                            <div
                                                style={{
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
                                className="shadow"
                                color="#fcba03"
                            />
                            <h3 style={{ marginTop: 30, fontWeight: 600 }}>
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
