import React from "react";
import { Link } from "react-router-dom";
import WalletConnectBtn from "../UI/WalletConnectBtn.js";

import "../style/components/MainNavigation.css";

function MainNavigation() {
  return (
    <React.Fragment>
      <nav className="main-nav d-flex-c">
        <div className="logo">
          <h1>Logo</h1>
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
              type="search"
              placeholder="search projects"
            />
          </div>

          <div className="connect-wallet-btn">Connect Btn</div>
        </div>
      </nav>
    </React.Fragment>
  );
}

export default MainNavigation;
