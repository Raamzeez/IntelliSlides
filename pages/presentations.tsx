import React, { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import iPresentation from "../lib/frontend/models/presentation"

interface iState {
    loading: boolean
    presentations: iPresentation[]
}

const Presentations: React.FC = () => {
    const [state, setState] = useState<iState>({
        loading: true,
        presentations: [],
    })

    useEffect(() => {})

    return <Container fluid className="Home"></Container>
}

export default Presentations
