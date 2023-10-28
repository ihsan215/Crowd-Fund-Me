import React, { useState, useContext } from "react";

import Web3Context from "../web3/Web3-context.js";
import Button from "../UI/Button.js";
import Web3WalletModal from "./Web3WalletModal.js";
import walletAddressFormat from "../auxiliary/walletAddressFormat.js";
import "../style/WalletConnectBtn.css";

import walletIcon from "../style/img/eth.png";
import userIcon from "../style/img/user.png";

function WalletConnectBtn() {
  const [showModal, setshowModal] = useState(false);

  const web3Ctx = useContext(Web3Context);

  const afterConnectionHandle = () => {
    setshowModal(true);
  };

  const beforeConnection = () => {
    return (
      <Button className="cntBtn" onClick={web3Ctx.walletConnect}>
        <img src={userIcon} alt="userIcon" />| Connect Wallet
      </Button>
    );
  };

  const afterConnection = () => {
    return (
      <Button className="cntBtn after-click" onClick={afterConnectionHandle}>
        <p className="btn-balance">{web3Ctx.balance}</p>
        <img
          style={{ marginTop: "-0.1rem", marginRight: "-1rem" }}
          src={walletIcon}
          alt="walletIcon"
        />
        | {walletAddressFormat(web3Ctx.address)}
      </Button>
    );
  };

  const closeModel = () => {
    setshowModal(false);
  };

  return (
    <React.Fragment>
      {web3Ctx.isConnected && web3Ctx.address
        ? afterConnection()
        : beforeConnection()}
      {showModal && <Web3WalletModal onClose={closeModel} />}
    </React.Fragment>
  );
}

export default WalletConnectBtn;
