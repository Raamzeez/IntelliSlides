import React, { FC, useState } from "react";
import { Card, Dropdown, DropdownButton, Modal } from "react-bootstrap";
import models from "../data/models";
import themes from "../data/themes";
import Model from "../types/model";
import Theme from "../types/theme";
import fetchSetting from "../util/fetchSetting";
import useWindowDimensions from "../util/useWindowDimensions";
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
  const widthThreshold = 750;

  const { width } = useWindowDimensions();

  const [hide, setHide] = useState(
    localStorage.getItem("showAdvancedSettings") === "true" &&
      width >= widthThreshold
      ? true
      : false
  );

  const [state, setState] = useState<iState>({
    model: fetchSetting("model", "text-davinci-003", "string", models) as Model,
    theme: fetchSetting(
      "presentationTheme",
      "Simple Light",
      "string",
      themes
    ) as Theme,
    timeout: fetchSetting("timeout", 180, "number") as number,
  });

  const onHide = (hide: boolean) => {
    localStorage.setItem("showAdvancedSettings", JSON.stringify(hide));
    setHide(hide);
  };

  const onModelChange = (model: Model) => {
    localStorage.setItem("model", JSON.stringify(model));
    setState({ ...state, model });
  };

  const onThemeChange = (theme: Theme) => {
    localStorage.setItem("presentationTheme", JSON.stringify(theme));
    setState({ ...state, theme });
  };

  const onTimeoutChange = (timeout: number) => {
    localStorage.setItem("timeout", JSON.stringify(timeout));
    setState({ ...state, timeout });
  };

  const content = () => {
    return (
      <>
        <h4 style={{ marginTop: 8.75 }}>Advanced Settings</h4>
        <div
          style={{
            height: 2,
            width: "90%",
            marginLeft: "5%",
            backgroundColor: "grey",
          }}
        />
        <p style={{ fontSize: 15, marginTop: 15, marginBottom: -15 }}>
          Text Model{" "}
        </p>
        <a
          href="https://platform.openai.com/docs/models/gpt-3"
          target={"_blank"}
          rel="noreferrer"
          style={{ fontSize: 10 }}
        >
          Learn More
        </a>
        <DropdownButton
          style={{ marginTop: 15 }}
          key={"secondary"}
          title={state.model}
          id={"1"}
          onSelect={(model) => onModelChange(model as Model)}
        >
          {models.map((model) => {
            return <Dropdown.Item eventKey={model}>{model}</Dropdown.Item>;
          })}
        </DropdownButton>
        <p style={{ fontSize: 15, marginTop: 30 }}>Presentation Theme: </p>
        <DropdownButton
          key={"primary"}
          title={state.theme}
          id={"2"}
          onSelect={(theme) => onThemeChange(theme as Theme)}
        >
          {themes.map((theme) => {
            return <Dropdown.Item eventKey={theme}>{theme}</Dropdown.Item>;
          })}
        </DropdownButton>
        <p style={{ fontSize: 15, marginTop: 30 }}>Timeout (seconds): </p>
        <NumberInput
          // label="Timeout: "
          value={state.timeout}
          onChangeHandler={(e) => onTimeoutChange(parseInt(e.target.value))}
          required={true}
          min={60}
          max={600}
        />
      </>
    );
  };

  return (
    <Card
      style={
        !hide && width > widthThreshold
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
      onClick={hide ? () => onHide(false) : () => null}
    >
      {!hide && width > widthThreshold ? (
        <div className="animate__animated animate__fadeIn animate__slower">
          <i
            className="fa-solid fa-right-long pointer"
            style={{ position: "absolute", top: 5, right: 10, fontSize: 20 }}
            onClick={() => onHide(true)}
          />
          {content()}
        </div>
      ) : (
        <>
          <i
            className="fa-solid fa-left-long pointer"
            style={{ position: "absolute", top: "40%", right: 3, fontSize: 20 }}
          />
          {!hide && (
            <Modal show={true} onHide={() => onHide(true)}>
              <div
                style={{
                  height: "60vh",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  //   justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#3925ba",
                }}
              >
                <i
                  className="fa-solid fa-x pointer"
                  style={{
                    color: "white",
                    position: "absolute",
                    top: 15,
                    right: 15,
                  }}
                  onClick={() => onHide(true)}
                />
                {content()}
              </div>
            </Modal>
          )}
        </>
      )}
    </Card>
  );
};

export default AdvancedOptions;
