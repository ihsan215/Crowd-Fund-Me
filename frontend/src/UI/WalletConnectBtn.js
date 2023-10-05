import React, { useContext } from "react";
import Web3Context from "../web3/Web3-context.js";
import Button from "./Button.js";

import "./WalletConnectBtn.css";

import walletIcon from "../style/img/wallet.png";
import userIcon from "../style/img/user.png";
import accountIcon from "../style/img/account.png";
import projectsIcon from "../style/img/projects.png";
import disconnectIcon from "../style/img/disconnect.png";

function WalletConnectBtn() {
  const web3Ctx = useContext(Web3Context);

  const connectBtn = async () => {
    if (!web3Ctx.walletIsConnected) {
      await web3Ctx.connectAccount();
      console.log(web3Ctx.mainAccount);
    } else {
    }
  };

  const beforeConnection = () => {
    return (
      <Button className="cntBtn" onClick={connectBtn}>
        <img src={userIcon} alt="userIcon" />| Connect Wallet
      </Button>
    );
  };

  const afterConnection = () => {
    return (
      <div class="dropdown">
        <Button
          className="dropdown-toggle cntBtn"
          type="button"
          id="dropdownMenuButton1"
          data_bs_toggle="dropdown"
          aria_expanded="false"
        >
          <img src={walletIcon} alt="walletIcon" />|{" "}
          {`${web3Ctx.mainAccount.slice(0, 5)}...${web3Ctx.mainAccount.slice(
            web3Ctx.mainAccount.length - 4,
            web3Ctx.mainAccount.length
          )}`}
        </Button>
        <ul
          class="dropdown-menu dropdown-menu-end btn-menu"
          aria-labelledby="dropdownMenuButton1"
        >
          <li className="btn-item">
            <a class="dropdown-item" href="#">
              <img src={accountIcon} alt="accountIcon" />
              My Account
            </a>
          </li>
          <li>
            <hr class="dropdown-divider" />
          </li>
          <li className="btn-item">
            <a class="dropdown-item" href="#">
              <img src={projectsIcon} alt="projectsIcon" />
              My Projects
            </a>
          </li>
          <li className="btn-item">
            <a class="dropdown-item" href="#">
              <img src={disconnectIcon} alt="disconnectIcon" />
              Disconnect Wallet
            </a>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <React.Fragment>
      {web3Ctx.walletIsConnected ? afterConnection() : beforeConnection()}
    </React.Fragment>
  );
}

export default WalletConnectBtn;
