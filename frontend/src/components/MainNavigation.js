import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Web3Context from "../web3/Web3-context.js";

import "../style/components/MainNavigation.css";

function MainNavigation() {
  const web3Ctx = useContext(Web3Context);

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg myNav">
        <Link class="navbar-brand" to="/">
          <p className="logo-title"> &lt;&lt; CrodFundMe &gt;&gt;</p>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <button onClick={web3Ctx.connectAccount}>
            {web3Ctx.isWalletConnected ? "Disconnect" : "Connect"}
          </button>
        </div>
      </nav>
    </React.Fragment>
  );
}

export default MainNavigation;
