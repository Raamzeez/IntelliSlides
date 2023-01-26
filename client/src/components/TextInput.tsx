import React, { ChangeEvent, FC } from "react";

interface iProps {
  label: string;
  value: string;
  onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: FC<iProps> = ({ label, value, onChangeHandler }) => {
  return (
    <div style={{ margin: 20 }}>
      <p style={{ fontSize: 18 }}>{label}</p>
      <input
        type="text"
        value={value}
        onChange={onChangeHandler}
        className="shadow"
        style={{
          height: "4vh",
          width: "27vw",
          borderRadius: 10,
          border: "none",
          backgroundColor: "rgb(64, 65, 78)",
          color: "white",
          paddingLeft: 10,
          fontSize: 15,
        }}
      ></input>
    </div>
  );
};

export default TextInput;
