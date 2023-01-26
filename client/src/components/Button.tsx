import React, { FC } from "react";

interface iProps {
  onClickHandler: () => void;
}

const Button: FC<iProps> = ({ onClickHandler }) => {
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
      onClick={onClickHandler}
    >
      <p style={{ fontSize: 17, marginTop: 13 }}>Submit</p>
    </div>
  );
};

export default Button;
