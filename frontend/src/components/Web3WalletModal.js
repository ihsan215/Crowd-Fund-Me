import React, { useContext } from "react";
import Modal from "../UI/Modal";

import Web3Context from "../web3/Web3-context.js";
import walletAddressFormat from "../auxiliary/walletAddressFormat";
import CopyIcon from "../UI/CopyIcon";

import EthIcon from "../style/img/ethereum.png";

function Web3WalletModal({ onClose, msg }) {
  const web3Ctx = useContext(Web3Context);

  const clickCopyBoard = () => {
    navigator.clipboard.writeText(web3Ctx.address);

    return <h1>COPYED</h1>;
  };

  return (
    <React.Fragment>
      <Modal onClose={onClose} msg={msg}>
        <div>
          <img src={EthIcon} alt="eth icon" style={{ width: "125px" }} />
          <p>
            {walletAddressFormat(web3Ctx.address)}{" "}
            <span>
              <CopyIcon onClick={clickCopyBoard} />
            </span>
          </p>
        </div>
      </Modal>
    </React.Fragment>
  );
}

export default Web3WalletModal;
