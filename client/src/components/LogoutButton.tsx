import React, { FC, useState } from "react";

interface iProps {
  onClickHandler: () => void;
}

const LogoutButton: FC<iProps> = ({ onClickHandler }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      style={{
        height: 30,
        width: 100,
        borderRadius: 7,
        backgroundColor: hover ? "darkred" : "#d60032",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 21,
      }}
      className="pointer"
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClickHandler}
    >
      <p style={{ fontSize: 12, marginTop: 18 }}>Logout</p>
    </div>
  );
};

export default LogoutButton;
