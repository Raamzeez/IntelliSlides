import React, { FC, useState } from "react";

interface iProps {
  onClickHandler: () => void;
}

const AutoButton: FC<iProps> = ({ onClickHandler }) => {
  const [clicked, setClicked] = useState(false);

  // autoButton:active {
  //     background-color: #008CBA;
  //     color: white;
  //     box-shadow: 0 4px #656565;
  //     transform: translateY(3px);
  // }

  const onClick = () => {
    setClicked(!clicked);
    onClickHandler();
  };

  const clickedStyle = () => {
    if (clicked) {
      return {
        backgroundColor: "#008CBA",
        color: "white",
        boxShadow: "0 4px #656565",
        transform: "translateY(3px)",
      };
    }
    return {};
  };

  return (
    <div
      className="auto autoButton"
      style={{ position: "relative", left: 40, bottom: 4, ...clickedStyle() }}
      onClick={() => onClick()}
    >
      Auto
    </div>
  );
};

export default AutoButton;
