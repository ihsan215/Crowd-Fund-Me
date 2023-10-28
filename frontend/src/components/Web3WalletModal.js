import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";

import Web3Context from "../web3/Web3-context.js";
import walletAddressFormat from "../auxiliary/walletAddressFormat";
import CopyIcon from "../UI/CopyIcon";

import EthIcon from "../style/img/ethereum.png";

import "../style/Web3WalletModal.css";

function Web3WalletModal({ onClose, msg }) {
  const [isCopied, setIsCopied] = useState(false);

  const web3Ctx = useContext(Web3Context);

  const clickCopyBoard = () => {
    navigator.clipboard.writeText(web3Ctx.address);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
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
        </div>
      </Modal>
    </React.Fragment>
  );
}

export default Web3WalletModal;
