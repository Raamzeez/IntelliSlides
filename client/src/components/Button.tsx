import React, { FC } from "react";

const Button: FC = () => {
  return (
    <div
      className="submit pointer"
      style={{
        height: 45,
        width: 120,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "50%",
        borderRadius: 10,
      }}
    >
      <p style={{ fontSize: 17 }}>Submit</p>
    </div>
  );
};

export default Button;
