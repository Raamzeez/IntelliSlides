import React, { FC } from "react";
import { Col, Image, Row } from "react-bootstrap";

const Footer: FC = () => {
  return (
    <Row
      style={{
        position: "absolute",
        bottom: 0,
        height: "10vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "rgb(30, 20, 120)",
      }}
    >
      <Col>
        <Image
          src={require("../images/OpenAILogo.png")}
          height={30}
          width={120}
        />
      </Col>
      <Col>
        <p style={{ fontSize: 15, fontWeight: 200, marginTop: 22 }}>
          Version 0.1
        </p>
      </Col>
      <Col>
        <Image
          src={require("../images/GoogleSlidesLogo.png")}
          height={75}
          width={200}
        />
      </Col>
    </Row>
  );
};

export default Footer;
