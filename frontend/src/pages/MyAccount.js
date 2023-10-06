import React from "react";

import UserInfo from "../components/MyAccount/UserInfo";
import ProjectInfo from "../components/MyAccount/ProjectInfo";

function MyAccount() {
  return (
    <React.Fragment>
      <UserInfo />
      <ProjectInfo />
    </React.Fragment>
  );
}

export default MyAccount;
