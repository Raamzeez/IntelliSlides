import React, { CSSProperties, FC } from "react";

interface iProps {
  onClickHandler: () => void;
  type: "success" | "danger" | "primary";
  value: string;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
}

const Button: FC<iProps> = ({
  onClickHandler,
  type,
  value,
  disabled,
  className,
  style,
}) => {
  return (
    <div
      className={`${
        type === "success" ? "submit" : type === "danger" ? "cancel" : "primary"
      } ${disabled ? "" : "pointer"} ${className}`}
      style={{
        height: 45,
        width: 120,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "50%",
        borderRadius: 10,
        opacity: disabled ? 0.35 : 1,
        ...style,
      }}
      onClick={disabled ? () => null : onClickHandler}
    >
      <p style={{ fontSize: 17, marginTop: 13 }}>{value}</p>
    </div>
  );
};

export default Button;
