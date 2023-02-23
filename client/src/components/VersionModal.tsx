import React, { FC } from "react";
import {
  // Carousel,
  Image,
  Modal,
  Pagination,
} from "react-bootstrap";
import fetchVersion from "../util/fetchVersion";

interface iProps {
  onCloseHandler: () => void;
}

const VersionModal: FC<iProps> = ({ onCloseHandler }) => {
  return (
    <Modal show={true} onHide={onCloseHandler}>
      <div
        style={{
          height: 550,
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
        <h4 style={{ marginTop: 20, fontWeight: 400 }}>{fetchVersion()}</h4>
        <Image
          src="https://media1.giphy.com/media/1337pmGIGROcdG/200w.webp?cid=ecf05e479zcgytk4ujp1jy90jbwlkbxjxss829rz8m9v0lok&rid=200w.webp&ct=g"
          height={"50%"}
          width={"100%"}
        />
        <Pagination style={{ marginTop: 30, position: "absolute", bottom: 10 }}>
          <Pagination.Item>1</Pagination.Item>
          <Pagination.Item>2</Pagination.Item>
          <Pagination.Item>3</Pagination.Item>
          <Pagination.Item>4</Pagination.Item>
          <Pagination.Item>5</Pagination.Item>
        </Pagination>
      </div>
    </Modal>
  );
};

export default VersionModal;
