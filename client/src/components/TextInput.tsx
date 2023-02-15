import React, { ChangeEvent, FC, useState } from "react";
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

  const iconLeftSpacing = () => {
    if (width <= 300) {
      return "26vw";
    } else if (width <= 600) {
      return "22vw";
    } else if (width <= 1000) {
      return "18vw";
    } else {
      return "16.5vw";
    }
  };

  return (
    <div style={{ margin: 20 }}>
      <div>
        <p style={{ fontSize: 18, marginBottom: info ? -5 : 20 }}>{label}</p>
        {info && (
          <InfoIcon
            style={{
              position: "relative",
              bottom: 19,
              left: iconLeftSpacing(),
            }}
            onClickHandler={onTipClickHandler}
          />
        )}
      </div>
      <div>
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
      </div>
    </div>
  );
};

export default TextInput;
