import React, { FC } from "react";
import { Row } from "react-bootstrap";
import Button from "./Button";

interface iProps {
  title: string;
  presentationId: string;
  onClickHandler: () => void;
}

const Success: FC<iProps> = ({ title, presentationId, onClickHandler }) => {
  return (
    <>
      <i
        style={{ fontSize: 130, color: "#00d173" }}
        className="animate__animated animate__fadeInDown fa-solid fa-circle-check"
      />
      <h1 style={{ marginTop: 15 }}>Success</h1>
      <h5 style={{ marginTop: 25, fontWeight: 500 }}>
        Your Presentation "{title}" Was Created!
      </h5>
      <p
        style={{
          fontSize: 13,
          color: "grey",
          fontWeight: 400,
        }}
      >
        ID: {presentationId}
      </p>
      <Row>
        <Button
          type="primary"
          value="Home"
          onClickHandler={onClickHandler}
          className="animate__animated animate__fadeIn"
          style={{ marginTop: 50, marginRight: 50 }}
        />
        <Button
          type="secondary"
          value="View"
          onClickHandler={() =>
            window.open(
              `https://docs.google.com/presentation/d/${presentationId}/edit#slide=id.p`,
              "_blank"
            )
          }
          className="animate__animated animate__fadeIn"
          style={{ marginTop: 50 }}
        />
      </Row>
    </>
  );
};

export default Success;
