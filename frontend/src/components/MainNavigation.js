import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Web3Context from "../web3/Web3-context.js";
import "../style/components/MainNavigation.css";
import WalletConnectBtn from "../UI/WalletConnectBtn.js";

function MainNavigation() {
  const web3Ctx = useContext(Web3Context);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("UseEffet", web3Ctx);
      web3Ctx.checkAccountConnected();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <React.Fragment>
      <nav className="navbar sticky-top  navbar-expand-lg myNav">
        <Link class="navbar-brand" to="/">
          <p className="logo-title"> &lt;&lt; CrodFundMe &gt;&gt;</p>
        </Link>
        <button
          class="btn navbar-toggler me-5"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div className="navbar-collapse collaps" id="collapse">
          <hr></hr>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-5 ">
            <li className="nav-item  m-auto">
              <WalletConnectBtn />
            </li>
          </ul>
        </div>
      </nav>
    </React.Fragment>
  );
}

export default MainNavigation;
