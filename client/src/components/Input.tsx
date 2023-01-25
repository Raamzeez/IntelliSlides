import React, { FC } from "react";

interface iProps {
  label: string;
}

const Input: FC<iProps> = ({ label }) => {
  return (
    <div style={{ margin: 20 }}>
      <p style={{ fontSize: 18 }}>{label}</p>
      <input
        type="text"
        className="shadow"
        style={{
          height: "4vh",
          width: "27vw",
          borderRadius: 10,
          border: "none",
          backgroundColor: "rgb(64, 65, 78)",
          color: "white",
        }}
      ></input>
    </div>
  );
};

export default Input;
