import React, { FC } from "react";
import { Modal } from "react-bootstrap";

interface iProps {
  title: string;
  message: string;
  onCloseHandler: () => void;
}

const InfoModal: FC<iProps> = ({ title, message, onCloseHandler }) => {
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
        <h4 style={{ marginTop: 20 }}>{title}</h4>
        <p style={{ fontSize: 13, marginTop: 30, width: "80%" }}>{message}</p>
      </div>
    </Modal>
  );
};

export default InfoModal;
