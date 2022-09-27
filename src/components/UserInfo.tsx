import React from "react";
import { User } from "firebase/auth";

interface UserInfoProps {
  user: User | null | undefined;
}

const UserInfo = (props: UserInfoProps): JSX.Element => {
  return (
    <>
      <br />
      {props.user?.displayName}
      <br />
    </>
  );
};

export default UserInfo;
