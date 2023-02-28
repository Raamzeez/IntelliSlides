import React, { CSSProperties, FC } from "react";
import AppTheme from "../types/appTheme";

interface iProps {
  theme: AppTheme;
  style?: CSSProperties;
}

const ThemeButton: FC<iProps> = ({ theme, style }) => {
  return (
    <div
      style={{
        height: 60,
        width: 60,
        borderRadius: 30,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme === "dark" ? "white" : "black",
        ...style,
      }}
      className="shadow pointer"
    >
      <i
        className={theme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon"}
        style={{
          fontSize: 25,
          color: theme === "dark" ? "black" : "white",
        }}
      />
    </div>
  );
};

export default ThemeButton;
