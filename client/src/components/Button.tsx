import React, { CSSProperties, FC, useState } from "react";

interface iProps {
  onClickHandler: () => void;
  type: "success" | "danger" | "primary" | "secondary";
  value: string;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
  textStyle?: CSSProperties;
  hoverStyle?: CSSProperties;
}

const Button: FC<iProps> = ({
  onClickHandler,
  type,
  value,
  disabled,
  className,
  style,
  textStyle,
  hoverStyle,
}) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className={`${
        type === "success"
          ? "submit"
          : type === "danger"
          ? "cancel"
          : type === "primary"
          ? "primary"
          : "secondary"
      } ${disabled ? "" : "pointer"} ${className} ${hover ? "shadow" : ""}`}
      style={{
        height: 45,
        width: 120,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        opacity: disabled ? 0.35 : 1,
        ...style,
      }}
      onClick={disabled ? () => null : onClickHandler}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <p style={{ fontSize: 17, marginTop: 13, ...textStyle }}>{value}</p>
    </div>
  );
};

export default Button;
