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
        borderRadius: 10,
        backgroundColor: hover ? "darkblue" : "blue",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 21,
        marginTop: 20,
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
