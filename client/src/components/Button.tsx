import React, { CSSProperties, FC, useState } from "react";

interface iProps {
  onClickHandler: () => void;
  type: "success" | "danger" | "primary" | "secondary";
  value: string;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
  hoverStyle?: CSSProperties;
}

const Button: FC<iProps> = ({
  onClickHandler,
  type,
  value,
  disabled,
  className,
  style,
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
      <p style={{ fontSize: 17, marginTop: 13 }}>{value}</p>
    </div>
  );
};

export default Button;
