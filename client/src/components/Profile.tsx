import React, { FC } from "react";
import { Image } from "react-bootstrap";
import useWindowDimensions from "../util/useWindowDimensions";
import LogoutButton from "./LogoutButton";

interface iProps {
  imageURL: string;
  email: string;
  name: string;
  onLogoutHandler: () => void;
}

const Profile: FC<iProps> = ({ imageURL, email, name, onLogoutHandler }) => {
  const { width } = useWindowDimensions();

  const rightPosition = {
    position: "absolute",
    right: -30,
  };

  return (
    <div
      className={width > 650 ? "profile" : ""}
      style={{
        height: width > 750 ? 157.5 : 130,
        // ...rightPosition
      }}
    >
      <Image
        src={imageURL}
        height={50}
        width={50}
        style={{ borderRadius: 25, margin: 10 }}
        className="shadow"
      />
      {width > 750 && <p style={{ fontSize: 10, margin: 10 }}>{email}</p>}
      <LogoutButton onClickHandler={onLogoutHandler} />
    </div>
  );
};

export default Profile;
