import React, { FC, useState } from "react";
import { Image } from "react-bootstrap";

interface iProps {
  onClickHandler: () => void;
  showingAlert: boolean;
}

const SettingsIcon: FC<iProps> = ({ onClickHandler, showingAlert }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      style={{
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: "rgb(80, 80, 80)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: showingAlert ? "8vh" : 20,
        left: 20,
        transition: "all 0.5s ease",
      }}
      className={`pointer ${hover ? "shadow" : ""}`}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClickHandler}
    >
      <Image src={require("../images/GearIcon.png")} height={27} width={27} />
    </div>
  );
};

export default SettingsIcon;
