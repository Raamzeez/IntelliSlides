import React, { ChangeEvent, FC } from "react";

interface iProps {
  onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}

const NumberInput: FC<iProps> = ({ onChangeHandler }) => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <p style={{ fontSize: 18, marginRight: 15 }}>Slide Count: </p>
      <input
        type="number"
        className="numberInput shadow"
        onChange={onChangeHandler}
        style={{
          height: 30,
          width: 60,
          border: "none",
          backgroundColor: "rgb(64, 65, 78)",
          color: "white",
          fontSize: 15,
        }}
        min={1}
        max={99}
      />
    </div>
  );
};

export default NumberInput;
