import React, { FC, useState } from "react";
import { Card, Dropdown, DropdownButton } from "react-bootstrap";
import NumberInput from "./NumberInput";
// import NumberInput from "./NumberInput";

interface iProps {
  onClickHandler: () => void;
}

const AdvancedOptions: FC<iProps> = ({ onClickHandler }) => {
  const [hide, setHide] = useState(true);

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
              transition: "all 0.8s ease",
            }
          : {
              position: "absolute",
              right: 0,
              width: 30,
              height: "10vh",
              backgroundColor: "#2d394f",
              transition: "all 0.8s ease",
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
          <p style={{ fontSize: 15, marginTop: 30 }}>Theme: </p>
          <DropdownButton key={"primary"} title="Simple Light" id={"1"}>
            <Dropdown.Item active>Simple Light</Dropdown.Item>
            <Dropdown.Item>Simple Dark</Dropdown.Item>
            <Dropdown.Item>Streamline</Dropdown.Item>
            <Dropdown.Item>Focus</Dropdown.Item>
            <Dropdown.Item>Shift</Dropdown.Item>
            <Dropdown.Item>Momentum</Dropdown.Item>
            <Dropdown.Item>Paradigm</Dropdown.Item>
            <Dropdown.Item>Material</Dropdown.Item>
            <Dropdown.Item>Swiss</Dropdown.Item>
            <Dropdown.Item>Beach Day</Dropdown.Item>
            <Dropdown.Item>Slate</Dropdown.Item>
            <Dropdown.Item>Coral</Dropdown.Item>
            <Dropdown.Item>Spearmint</Dropdown.Item>
            <Dropdown.Item>Plum</Dropdown.Item>
            <Dropdown.Item>Paperback</Dropdown.Item>
            <Dropdown.Item>Modern Writer</Dropdown.Item>
            <Dropdown.Item>Geometric</Dropdown.Item>
            <Dropdown.Item>Pop</Dropdown.Item>
            <Dropdown.Item>Luxe</Dropdown.Item>
            <Dropdown.Item>Blue & Gold</Dropdown.Item>
            <Dropdown.Item>Tropic</Dropdown.Item>
            <Dropdown.Item>Marina</Dropdown.Item>
            <Dropdown.Item>Gameday</Dropdown.Item>
          </DropdownButton>
          <p style={{ fontSize: 15, marginTop: 30 }}>Timeout (seconds): </p>
          <NumberInput
            // label="Timeout: "
            value={300}
            onChangeHandler={(e) => null}
            required={true}
          />
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
