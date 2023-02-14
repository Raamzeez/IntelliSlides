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
        height: "10vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "rgb(30, 20, 120)",
        background:
          "linear-gradient(90deg, rgba(0,147,163,1) 0%, rgba(1,123,193,1) 100%)",
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
