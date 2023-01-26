import React, { FC } from "react";
import { Modal } from "react-bootstrap";

interface iProps {
  onCloseHandler: () => void;
}

const LoadingModal: FC<iProps> = ({ onCloseHandler }) => {
  return (
    <>
      <Modal show={true} onHide={onCloseHandler}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default LoadingModal;
