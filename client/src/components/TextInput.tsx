import React, { ChangeEvent, FC, useState } from "react";
import { Col, Row } from "react-bootstrap";
import useWindowDimensions from "../util/useWindowDimensions";
import InfoIcon from "./InfoIcon";

interface iProps {
  label: string;
  value: string;
  onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
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
  placeholder,
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
    <Row
      style={{
        margin: width > 400 ? 20 : "9.5vw",
        padding: 0,
        flex: 1,
        width: width > 991 ? "40vw" : "80vw",
      }}
    >
      <Col className="centerContainer" lg={1}>
        {info && <InfoIcon onClickHandler={onTipClickHandler} />}
      </Col>
      <Col className="centerContainer" lg={2}>
        <p style={{ fontSize: 15, marginTop: 15 }}>{label}:</p>
      </Col>
      <Col className="centerContainer" lg={9}>
        <input
          type="text"
          value={value}
          onChange={onChangeHandler}
          className={clicked ? "input" : "shadow"}
          style={{
            height: 35,
            width: "100%",
            borderRadius: 8,
            border: "none",
            backgroundColor: "rgb(64, 65, 78)",
            color: "white",
            paddingLeft: 10,
            fontSize: 15,
          }}
          placeholder={placeholder}
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
