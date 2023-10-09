import React from "react";

import "../../style/components/MyAccount/UserInfo.css";

// Import Components
import PersonelInfo from "./PersonelInfo.js";

function UserInfo() {
  return (
    <div class="container-xl mt-5 p-1" style={{ height: 20 + "rem" }}>
      <PersonelInfo />
    </div>
  );
}

export default UserInfo;
