import React, { FC, useState } from "react";
import { Card, Dropdown, DropdownButton } from "react-bootstrap";
import NumberInput from "./NumberInput";

interface iProps {
  onClickHandler: () => void;
}

const AdvancedOptions: FC<iProps> = ({ onClickHandler }) => {
  const [hide, setHide] = useState(false);

  return (
    <Card
      style={
        !hide
          ? {
              position: "absolute",
              right: 30,
              height: "55vh",
              width: "25vw",
              // backgroundColor: "rgb(64, 65, 78)",
              backgroundColor: "#2d394f",
              transition: "all 1s ease",
            }
          : {
              position: "absolute",
              right: 0,
              width: "2vw",
              height: "10vh",
              backgroundColor: "#2d394f",
              transition: "all 1.15s ease",
            }
      }
      className="shadow"
      onClick={hide ? () => setHide(false) : () => null}
    >
      {!hide ? (
        <div className="animate__animated animate__fadeIn animate__slower">
          <i
            className="fa-solid fa-right-long pointer"
            style={{ position: "absolute", top: 5, right: 10, fontSize: 20 }}
            onClick={() => setHide(true)}
          />
          <h4 style={{ marginTop: 8.75 }}>Advanced Settings</h4>
          <div
            style={{
              height: 2,
              width: "90%",
              marginLeft: "5%",
              backgroundColor: "grey",
            }}
          />
          <p style={{ fontSize: 15, marginTop: 30 }}>Text Model: </p>
          <DropdownButton key={"secondary"} title="text-davinci-003" id={"1"}>
            <Dropdown.Item active>text-davinci-003</Dropdown.Item>
            <Dropdown.Item>text-curie-001</Dropdown.Item>
            <Dropdown.Item>text-babbage-001</Dropdown.Item>
            <Dropdown.Item>text-ada-001</Dropdown.Item>
          </DropdownButton>
        </div>
      ) : (
        <>
          <i
            className="fa-solid fa-left-long pointer"
            style={{ position: "absolute", top: "40%", right: 3, fontSize: 20 }}
          />
        </>
      )}
    </Card>
  );
};

export default AdvancedOptions;
