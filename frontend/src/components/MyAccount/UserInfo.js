import React, { useContext } from "react";
import Web3Context from "../../web3/Web3-context.js";

import "../../style/components/MyAccount/UserInfo.css";

// Import Components
import PersonelInfo from "./PersonelInfo.js";

function UserInfo() {
  const web3Ctx = useContext(Web3Context);

  // wallet
  // balance
  // network

  return (
    <div class="container-xl mt-5 p-1" style={{ height: 20 + "rem" }}>
      <PersonelInfo />
    </div>
  );
}

export default UserInfo;
