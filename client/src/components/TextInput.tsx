import React, { ChangeEvent, FC, useState } from "react";

interface iProps {
  label: string;
  value: string;
  onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
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
  disabled,
  maxLength,
  minLength,
  pattern,
  required,
}) => {
  const [clicked, setClicked] = useState(false);

  return (
    <div style={{ margin: 20 }}>
      <p style={{ fontSize: 18 }}>{label}</p>
      <input
        type="text"
        value={value}
        onChange={onChangeHandler}
        className={clicked ? "input" : ""}
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
      ></input>
    </div>
  );
};

export default TextInput;
