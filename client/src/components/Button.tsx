import React, { FC } from "react";

interface iProps {
  onClickHandler: () => void;
  type: "success" | "danger" | "primary";
  value: string;
  disabled?: boolean;
}

const Button: FC<iProps> = ({ onClickHandler, type, value, disabled }) => {
  return (
    <div
      className={`${
        type === "success" ? "submit" : type === "danger" ? "cancel" : "primary"
      } ${disabled ? "" : "pointer"}`}
      style={{
        height: 45,
        width: 120,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "50%",
        borderRadius: 10,
        opacity: disabled ? 0.35 : 1,
      }}
      onClick={disabled ? () => null : onClickHandler}
    >
      <p style={{ fontSize: 17, marginTop: 13 }}>{value}</p>
    </div>
  );
};

export default Button;
