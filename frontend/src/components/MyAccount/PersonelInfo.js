import React, { useContext } from "react";
import Web3Context from "../../web3/Web3-context.js";
import { getChainName } from "./auxFile.js";

import demoImg from "../../style/img/ihsan.JPG";

function PersonelInfo() {
  const web3Ctx = useContext(Web3Context);
  const demoName = "ihsan";

  return (
    <div className="row">
      <div
        className="col d-flex align-items-center justify-content-lg-evenly mt-1"
        style={{ width: 20 + "rem" }}
      >
        <img
          src={demoImg}
          class="rounded-circle"
          alt="profile img"
          style={{
            height: 300 + "px",
            width: 300 + "px",
          }}
        />
      </div>

      <div
        className="col d-flex  justify-content-lg-between flex-column mt-1 p-5 info-area"
        style={{ width: 20 + "rem" }}
      >
        <h1>Hello, {demoName} !</h1>
        <p>Address: {web3Ctx.mainAccount}</p>
        <p>
          Network ID : {parseInt(web3Ctx.networkId)}{" "}
          {getChainName(parseInt(web3Ctx.networkId))}
        </p>
        <p>Balance : {web3Ctx.balance}</p>
      </div>
    </div>
  );
}

export default PersonelInfo;
