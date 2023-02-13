import React, { FC } from "react";

interface iProps {
  onCloseHandler: () => void;
}

const Alert: FC<iProps> = ({ onCloseHandler }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        height: "7vh",
        width: "100vw",
        backgroundColor: "#ff99af",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p style={{ fontSize: 15, marginTop: 10 }}>
        This is a Public Beta Release - Please be aware that there may be bugs
        and issues!
      </p>
      <i
        className="fa-solid fa-x pointer"
        style={{
          color: "white",
          fontSize: 20,
          position: "absolute",
          top: 15,
          right: 30,
        }}
        onClick={onCloseHandler}
      />
    </div>
  );
};

export default Alert;
