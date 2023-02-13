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
        backgroundColor: "dodgerblue",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: showingAlert ? 50 : 20,
        right: 20,
      }}
      className={`pointer ${hover ? "shadow" : ""}`}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClickHandler}
    >
      <Image src={require("../images/GearIcon.png")} height={30} width={30} />
    </div>
  );
};

export default SettingsIcon;
