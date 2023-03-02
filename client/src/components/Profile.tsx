import React, { FC } from "react";
import { Image } from "react-bootstrap";
import LogoutButton from "./LogoutButton";

interface iProps {
  imageURL: string;
  email: string;
  name: string;
  onLogoutHandler: () => void;
}

const Profile: FC<iProps> = ({ imageURL, email, name, onLogoutHandler }) => {
  return (
    <div className="profile">
      <Image
        src={imageURL}
        height={50}
        width={50}
        style={{ borderRadius: 25, margin: 10 }}
        className="shadow"
      />
      <p style={{ fontSize: 10, margin: 10 }}>{email}</p>
      <LogoutButton onClickHandler={onLogoutHandler} />
    </div>
  );
};

export default Profile;
