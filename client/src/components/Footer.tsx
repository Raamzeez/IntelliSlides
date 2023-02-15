import React, { FC, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";

interface iProps {
  onClickHandler: () => void;
}

const Footer: FC<iProps> = ({ onClickHandler }) => {
  const [hoverText, setHoverText] = useState(false);

  return (
    <Row
      style={{
        position: "absolute",
        bottom: 0,
        minHeight: "10vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="footerBackground"
    >
      <Col>
        <Image
          src={require("../images/OpenAILogo.png")}
          height={30}
          width={120}
        />
      </Col>
      <Col>
        <p
          style={{
            fontSize: 15,
            fontWeight: 200,
            marginTop: 22,
            textDecoration: hoverText ? "underline" : "",
            opacity: hoverText ? 1 : 0.75,
          }}
          onMouseOver={() => setHoverText(true)}
          onMouseLeave={() => setHoverText(false)}
          onClick={onClickHandler}
          className="pointer"
        >
          Version 1.0.0
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
