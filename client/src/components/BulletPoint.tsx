import React, { FC } from "react";

interface iProps {
  label: string;
  count: number;
}

const BulletPoint: FC<iProps> = ({ label, count }) => {
  return (
    <li
      style={{
        fontSize: 12,
        width: "80%",
        marginLeft: "5%",
        marginTop: `7vh`,
      }}
    >
      {label}
    </li>
  );
};

export default BulletPoint;
