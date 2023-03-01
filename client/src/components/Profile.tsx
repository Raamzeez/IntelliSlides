import React, { FC } from "react";
import { Image } from "react-bootstrap";

interface iProps {
  imageURL: string;
  email: string;
  name: string;
}

const Profile: FC<iProps> = ({ imageURL, email, name }) => {
  return (
    <div style={{ borderRadius: 5 }} className="">
      <Image
        src={imageURL}
        height={50}
        width={50}
        style={{ borderRadius: 25, margin: 10 }}
      />
      <p style={{ fontSize: 10, margin: 10 }}>{email}</p>
    </div>
  );
};

export default Profile;
