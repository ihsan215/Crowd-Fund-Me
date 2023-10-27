import React, { useContext } from "react";

import Web3Context from "../web3/Web3-context.js";
import Button from "./Button.js";

import "./WalletConnectBtn.css";

import walletIcon from "../style/img/eth.png";
import userIcon from "../style/img/user.png";

function WalletConnectBtn() {
  const web3Ctx = useContext(Web3Context);

  const beforeConnection = () => {
    return (
      <Button className="cntBtn" onClick={web3Ctx.walletConnect}>
        <img src={userIcon} alt="userIcon" />| Connect Wallet
      </Button>
    );
  };

  const afterConnection = () => {
    return (
      <Button className="cntBtn after-click">
        <p className="btn-balance">{web3Ctx.balance}</p>
        <img
          style={{ marginTop: "-0.1rem", marginRight: "-1rem" }}
          src={walletIcon}
          alt="walletIcon"
        />
        |{" "}
        {`${web3Ctx.address.slice(0, 5)}...${web3Ctx.address.slice(
          web3Ctx.address.length - 4,
          web3Ctx.address.length
        )}`}
      </Button>
    );
  };

  return (
    <React.Fragment>
      {web3Ctx.isConnected && web3Ctx.address
        ? afterConnection()
        : beforeConnection()}
    </React.Fragment>
  );
}

export default WalletConnectBtn;
