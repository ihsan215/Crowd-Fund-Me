import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Web3Context from "../web3/Web3-context.js";
import Button from "./Button.js";

import "./WalletConnectBtn.css";

import walletIcon from "../style/img/wallet.png";
import userIcon from "../style/img/user.png";

function WalletConnectBtn() {
  const web3Ctx = useContext(Web3Context);

  const beforeConnection = () => {
    return (
      <Button className="cntBtn" onClick={web3Ctx.connectWallet}>
        <img src={userIcon} alt="userIcon" />| Connect Wallet
      </Button>
    );
  };

  const afterConnection = () => {
    return (
      <div className="dropdown-center">
        <Button
          className="dropdown-toggle cntBtn"
          type="button"
          id="dropdownMenuButton1"
          data_bs_toggle="dropdown"
          aria_expanded="false"
        >
          <img
            style={{ marginTop: "-0.2rem" }}
            src={walletIcon}
            alt="walletIcon"
          />
          |{" "}
          {`${web3Ctx.account.slice(0, 5)}...${web3Ctx.account.slice(
            web3Ctx.account.length - 4,
            web3Ctx.account.length
          )}`}
        </Button>
        <ul
          class="dropdown-menu dropdown-center btn-menu"
          aria-labelledby="dropdownMenuButton1"
        >
          <li className="btn-item">
            <Link to={"/myAccount"} class="dropdown-item" href="#">
              My Account
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li className="btn-item">
            <Link className="dropdown-item" href="#">
              My Projects
            </Link>
          </li>
          <hr className="dropdown-divider" />
          <li className="btn-item">
            <Link
              className="dropdown-item link-item"
              to="/"
              onClick={web3Ctx.disconnectWallet}
            >
              Disconnect Wallet
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <React.Fragment>
      {web3Ctx.isWalletConnected ? afterConnection() : beforeConnection()}
    </React.Fragment>
  );
}

export default WalletConnectBtn;
