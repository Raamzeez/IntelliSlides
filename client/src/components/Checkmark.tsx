import React, { FC } from "react";

interface iProps {
  label: string;
  value: boolean;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkmark: FC<iProps> = ({ label, value, onChangeHandler }) => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <label className="container" style={{ marginTop: 10 }}>
        <input type="checkbox" checked={value} onChange={onChangeHandler} />
        <span className="checkmark"></span>
      </label>
      <p style={{ fontSize: 14, marginTop: 13, marginLeft: 10 }}>{label}</p>
    </div>
  );
};

export default Checkmark;
