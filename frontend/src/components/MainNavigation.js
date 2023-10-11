import React from "react";
import { Link } from "react-router-dom";
import WalletConnectBtn from "../UI/WalletConnectBtn.js";

import "../style/components/MainNavigation.css";

import logoIcon from "../style/img/logo.svg";

function MainNavigation() {
  return (
    <React.Fragment>
      <nav className="main-nav d-flex-c">
        <div className="logo">
          <Link to={"/"}>
            <img src={logoIcon} alt="logo" style={{ height: "5rem" }} />
          </Link>
        </div>

        <div className="menu d-flex-c">
          <ul className="menu-list d-flex-c">
            <li className="menu-item">Explore</li>
            <li className="menu-item">Projects</li>
            <li className="menu-item">Contact Us</li>
          </ul>

          <div className="search-menu">
            <input
              className="search"
              placeholder="search projects"
              type="search"
            />
          </div>

          <div className="connect-wallet-btn">
            <WalletConnectBtn />
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
}

export default MainNavigation;
