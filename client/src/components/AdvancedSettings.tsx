import React, { FC, useState } from "react";
import { Card, Dropdown, DropdownButton } from "react-bootstrap";
import Model from "../types/model";
import Theme from "../types/theme";
import NumberInput from "./NumberInput";
// import NumberInput from "./NumberInput";

interface iProps {
  onClickHandler: () => void;
}

interface iState {
  model: Model;
  theme: Theme;
  timeout: number;
}

const AdvancedOptions: FC<iProps> = ({ onClickHandler }) => {
  const [hide, setHide] = useState(true);

  const [state, setState] = useState<iState>({
    model: "text-davinci-003",
    theme: "Simple Light",
    timeout: 300,
  });

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
              backgroundColor: "darkblue",
              // backgroundColor: "#2d394f",
              transition: "all 0.8s ease",
            }
          : {
              position: "absolute",
              right: 0,
              width: 30,
              height: "10vh",
              // backgroundColor: "#2d394f",
              backgroundColor: "darkblue",
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
          <DropdownButton
            key={"secondary"}
            title={state.model}
            id={"1"}
            onSelect={(value) => setState({ ...state, model: value as Model })}
          >
            <Dropdown.Item eventKey={"text-davinci-003"}>
              text-davinci-003
            </Dropdown.Item>
            <Dropdown.Item eventKey={"text-curie-001"}>
              text-curie-001
            </Dropdown.Item>
            <Dropdown.Item eventKey={"text-babbage-001"}>
              text-babbage-001
            </Dropdown.Item>
            <Dropdown.Item eventKey={"text-ada-001"}>
              text-ada-001
            </Dropdown.Item>
          </DropdownButton>
          <p style={{ fontSize: 15, marginTop: 30 }}>Theme: </p>
          <DropdownButton
            key={"primary"}
            title={state.theme}
            id={"2"}
            onSelect={(value) => setState({ ...state, theme: value as Theme })}
          >
            <Dropdown.Item eventKey={"Simple Light"}>
              Simple Light
            </Dropdown.Item>
            <Dropdown.Item eventKey={"Simple Dark"}>Simple Dark</Dropdown.Item>
            <Dropdown.Item eventKey={"Streamline"}>Streamline</Dropdown.Item>
            <Dropdown.Item eventKey={"Focus"}>Focus</Dropdown.Item>
            <Dropdown.Item eventKey={"Shift"}>Shift</Dropdown.Item>
            <Dropdown.Item eventKey={"Momentum"}>Momentum</Dropdown.Item>
            <Dropdown.Item eventKey={"Paradigm"}>Paradigm</Dropdown.Item>
            <Dropdown.Item eventKey={"Material"}>Material</Dropdown.Item>
            <Dropdown.Item eventKey={"Swiss"}>Swiss</Dropdown.Item>
            <Dropdown.Item eventKey={"Beach Day"}>Beach Day</Dropdown.Item>
            <Dropdown.Item eventKey={"Slate"}>Slate</Dropdown.Item>
            <Dropdown.Item eventKey={"Coral"}>Coral</Dropdown.Item>
            <Dropdown.Item eventKey={"Spearmint"}>Spearmint</Dropdown.Item>
            <Dropdown.Item eventKey={"Plum"}>Plum</Dropdown.Item>
            <Dropdown.Item eventKey={"Paperback"}>Paperback</Dropdown.Item>
            <Dropdown.Item eventKey={"Modern Writer"}>
              Modern Writer
            </Dropdown.Item>
            <Dropdown.Item eventKey={"Geometric"}>Geometric</Dropdown.Item>
            <Dropdown.Item eventKey={"Pop"}>Pop</Dropdown.Item>
            <Dropdown.Item eventKey={"Luxe"}>Luxe</Dropdown.Item>
            <Dropdown.Item eventKey={"Blue & Gold"}>Blue & Gold</Dropdown.Item>
            <Dropdown.Item eventKey={"Tropic"}>Tropic</Dropdown.Item>
            <Dropdown.Item eventKey={"Marina"}>Marina</Dropdown.Item>
            <Dropdown.Item eventKey={"Gameday"}>Gameday</Dropdown.Item>
          </DropdownButton>
          <p style={{ fontSize: 15, marginTop: 30 }}>Timeout (seconds): </p>
          <NumberInput
            // label="Timeout: "
            value={state.timeout}
            onChangeHandler={(e) =>
              setState({ ...state, timeout: parseInt(e.target.value) })
            }
            required={true}
            min={60}
            max={600}
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
