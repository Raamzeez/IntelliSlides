import React, { FC } from "react"
import { Container, Image } from "react-bootstrap"

const Versions: FC = () => {
    return (
        <>
            <Container fluid className="Home">
                <Image
                    src={require("../images/IntelliSlidesBannerTransparent.png")}
                    style={{
                        height: 75,
                        width: 280,
                        marginTop: 30,
                    }}
                    className="animate__animated animate__fadeIn"
                />
            </Container>
        </>
    )
}

export default Versions
