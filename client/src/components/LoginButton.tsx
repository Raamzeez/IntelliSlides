import React, { CSSProperties, FC, useState } from "react";
import { Image } from "react-bootstrap";

interface iProps {
  onClickHandler: () => void;
  style?: CSSProperties;
}

const LoginButton: FC<iProps> = ({ onClickHandler, style }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      style={{
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: hover ? "lightgrey" : "white",
        display: "flex",
        justifyContent: "center",
        transition: "all 0.15s ease",
        ...style,
      }}
      className="pointer shadow"
      onClick={onClickHandler}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Image
        src={require("../images/Google_Icon.png")}
        height={30}
        width={30}
        style={{ marginTop: 15, marginLeft: 0 }}
      />
    </div>
  );
};

export default LoginButton;
