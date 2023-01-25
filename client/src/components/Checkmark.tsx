import React, { FC } from "react";

interface iProps {
  label: string;
}

const Checkmark: FC<iProps> = ({ label }) => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <label className="container" style={{ marginTop: 10 }}>
        <input type="checkbox" />
        <span className="checkmark"></span>
      </label>
      <p style={{ fontSize: 14 }}>{label}</p>
    </div>
  );
};

export default Checkmark;
