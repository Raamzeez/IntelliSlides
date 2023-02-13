import React, { FC } from "react";
import { Modal } from "react-bootstrap";

interface iProps {
  onCloseHandler: () => void;
}

const SettingsModal: FC<iProps> = ({ onCloseHandler }) => {
  return (
    <Modal show={true} onHide={onCloseHandler}>
      <div
        style={{
          height: 300,
          width: "100%",
          backgroundColor: "#282c34",
          display: "flex",
          flexDirection: "column",
          //   justifyContent: "center",
          alignItems: "center",
        }}
      >
        <i
          className="fa-solid fa-x pointer"
          style={{
            color: "white",
            fontSize: 20,
            position: "absolute",
            top: 15,
            right: 15,
          }}
          onClick={onCloseHandler}
        />
        <h4 style={{ marginTop: 20 }}>Settings</h4>
      </div>
    </Modal>
  );
};

export default SettingsModal;
