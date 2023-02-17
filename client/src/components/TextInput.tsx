import React, { ChangeEvent, FC, useState } from "react";
import { Col, Row } from "react-bootstrap";
import useWindowDimensions from "../util/useWindowDimensions";
import InfoIcon from "./InfoIcon";

interface iProps {
  label: string;
  value: string;
  onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  info?: boolean;
  onTipClickHandler?: () => void;
  disabled?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  required?: boolean;
}

const TextInput: FC<iProps> = ({
  label,
  value,
  onChangeHandler,
  info,
  onTipClickHandler,
  disabled,
  maxLength,
  minLength,
  pattern,
  required,
}) => {
  const { width } = useWindowDimensions();

  const [clicked, setClicked] = useState(false);

  const iconLeft = () => {
    if (width <= 300) {
      return "10%";
    } else if (width <= 400) {
      return "7%";
    } else if (width <= 550) {
      return "4%";
    } else if (width <= 1200) {
      return "3%";
    }
    return 0;
  };

  return (
    <Row style={{ margin: 20 }}>
      {info && (
        <InfoIcon
          style={{
            marginTop: 10,
            marginRight: 5,
            position: "relative",
            left: iconLeft(),
          }}
          onClickHandler={onTipClickHandler}
        />
      )}
      <Col>
        <p style={{ fontSize: 18, marginTop: 9, marginRight: -5 }}>{label}:</p>
      </Col>
      <Col>
        <input
          type="text"
          value={value}
          onChange={onChangeHandler}
          className={clicked ? "input" : "shadow"}
          style={{
            height: "4vh",
            width: "27vw",
            borderRadius: 8,
            border: "none",
            backgroundColor: "rgb(64, 65, 78)",
            color: "white",
            paddingLeft: 10,
            fontSize: 15,
          }}
          disabled={disabled}
          maxLength={maxLength}
          minLength={minLength}
          pattern={pattern}
          required={required}
          onClick={() => setClicked(true)}
        />
      </Col>
    </Row>
  );
};

export default TextInput;
