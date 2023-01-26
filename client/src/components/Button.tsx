import React, { FC } from "react";

interface iProps {
  onClickHandler: () => void;
  type: "success" | "danger" | "primary";
  value: string;
}

const Button: FC<iProps> = ({ onClickHandler, type, value }) => {
  return (
    <div
      className={`${
        type === "success" ? "submit" : type === "danger" ? "cancel" : "primary"
      } pointer`}
      style={{
        height: 45,
        width: 120,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "50%",
        borderRadius: 10,
      }}
      onClick={onClickHandler}
    >
      <p style={{ fontSize: 17, marginTop: 13 }}>{value}</p>
    </div>
  );
};

export default Button;
