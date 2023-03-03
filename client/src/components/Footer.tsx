import React, { FC, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import fetchVersion from "../util/fetchVersion";
import useWindowDimensions from "../util/useWindowDimensions";

interface iProps {
  onClickHandler: () => void;
}

const Footer: FC<iProps> = ({ onClickHandler }) => {
  const { width } = useWindowDimensions();

  const [hoverText, setHoverText] = useState(false);

  return (
    <Row
      style={{
        position: "relative",
        bottom: 0,
        width: "100%",
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
          {fetchVersion()}
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
