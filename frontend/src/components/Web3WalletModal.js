import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../UI/Modal";
import Web3Context from "../web3/Web3-context.js";
import walletAddressFormat from "../auxiliary/walletAddressFormat";
import CopyIcon from "../UI/CopyIcon";
import Button from "../UI/Button";
import EthIcon from "../style/img/ethereum.png";

import "../style/Web3WalletModal.css";

function Web3WalletModal({ onClose, msg }) {
  const navigate = useNavigate();
  const [isCopied, setIsCopied] = useState(false);

  const web3Ctx = useContext(Web3Context);

  const clickCopyBoard = () => {
    navigator.clipboard.writeText(web3Ctx.address);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const disconnectWallet = () => {
    web3Ctx.disconnectWallet();
    navigate("/");
    onClose();
  };

  return (
    <React.Fragment>
      <Modal onClose={onClose} msg={msg}>
        <div className="web3-wallet-modal-area">
          <img src={EthIcon} alt="eth icon" style={{ width: "125px" }} />
          <div className="wallet-info-area">
            <p>{web3Ctx.balance} SepoliaETH</p>
            <p>|</p>
            <p>
              {walletAddressFormat(web3Ctx.address)}{" "}
              <span>
                <CopyIcon
                  onClick={clickCopyBoard}
                  isCopied={isCopied}
                  className="copy-icon-area"
                />
              </span>
            </p>
          </div>
          <Button
            className="explorer-btn"
            onClick={() => {
              window.open(
                "https://sepolia.etherscan.io/",
                "_blank",
                "noreferrer"
              );
            }}
          >
            &#9737; Explorer &#10138;
          </Button>
          <div className="modal-menu-area">
            <ul className="modal-menu">
              <li
                className="modal-menu-item"
                onClick={() => {
                  navigate(`/myAccount/${web3Ctx.address}`);
                  onClose();
                }}
              >
                My &nbsp;{" "}
                <span style={{ color: "rgb(255,216,0)" }}>CrowdFundMe</span>
                &nbsp; Account
              </li>

              <li className="modal-menu-item" onClick={disconnectWallet}>
                Disconnect Wallet
              </li>
            </ul>
          </div>
          <p className="modal-menu-note">
            The application serves solely for testing purposes and interacts
            with the{" "}
            <span style={{ color: "rgb(255,216,0)" }}>CrowdFundMe</span>{" "}
            Contract deployed on the Sepolia test network.
          </p>
        </div>
      </Modal>
    </React.Fragment>
  );
}

export default Web3WalletModal;
