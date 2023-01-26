import React, { ChangeEvent, FC, useState } from "react";

interface iProps {
  value: number;
  onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  required?: boolean;
}

const NumberInput: FC<iProps> = ({
  value,
  onChangeHandler,
  disabled,
  maxLength,
  minLength,
  pattern,
  required,
}) => {
  const [clicked, setClicked] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <p style={{ fontSize: 18, marginRight: 15 }}>Slide Count: </p>
      <input
        type="number"
        className={clicked ? "input" : ""}
        value={value}
        onChange={onChangeHandler}
        style={{
          height: 30,
          width: 60,
          border: "none",
          backgroundColor: "rgb(64, 65, 78)",
          color: "white",
          fontSize: 15,
          paddingLeft: 10,
        }}
        min={1}
        max={99}
        disabled={disabled}
        maxLength={maxLength}
        minLength={minLength}
        pattern={pattern}
        required={required}
        onClick={() => setClicked(true)}
      />
    </div>
  );
};

export default NumberInput;
