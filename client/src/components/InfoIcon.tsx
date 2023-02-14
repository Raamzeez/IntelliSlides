import React, { CSSProperties, FC } from "react";

interface iProps {
  onClickHandler: any;
  style?: CSSProperties;
}

const InfoIcon: FC<iProps> = ({ onClickHandler, style }) => {
  return (
    <div
      style={{
        height: 22,
        width: 22,
        borderRadius: 11,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0352fc",
        ...style,
      }}
      className="pointer"
      onClick={onClickHandler}
    >
      <p style={{ marginTop: 17, fontSize: 17 }}>i</p>
    </div>
  );
};

export default InfoIcon;
