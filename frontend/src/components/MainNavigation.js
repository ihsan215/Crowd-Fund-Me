import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Web3Context from "../web3/Web3-context.js";

import "../style/components/MainNavigation.css";

function MainNavigation() {
  const web3Ctx = useContext(Web3Context);

  return (
    <React.Fragment>
      <nav class="navbar navbar-expand-lg myNav">
        <Link class="navbar-brand" to="/">
          <p className="logo-title"> &lt;&lt; CrodFundMe &gt;&gt;</p>
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <button onClick={web3Ctx.connectWallet}>connect</button>
        </div>
      </nav>
    </React.Fragment>
  );
}

export default MainNavigation;
