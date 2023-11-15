import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import WalletConnectBtn from "./WalletConnectBtn.js";
import "../style/components/MainNavigation.css";
import logoIcon from "../style/img/logo.svg";
import Web3Context from "../web3/Web3-context.js";

function MainNavigation() {
  const [isMenuDisplay, setIsMenuDisplay] = useState(false);
  const [msgClassName, setMsgClassName] = useState("");
  const [customMessage, setCustomMessage] = useState("");

  const web3Ctx = useContext(Web3Context);

  const menuBtn = () => {
    setIsMenuDisplay(!isMenuDisplay);
  };

  useEffect(() => {
    web3Ctx.create_project.setMessage(setMsgClassName, setCustomMessage);
  }, [web3Ctx.create_project.createPrjectStatus]);

  function closeMsgFunc() {
    setMsgClassName("");
    setCustomMessage("");
  }

  return (
    <React.Fragment>
      <nav className="main-nav d-flex-c">
        <div className="logo">
          <Link to={"/"}>
            <img src={logoIcon} alt="logo" style={{ height: "4.5rem" }} />
            <div className="logo-text">
              <h1>CrowdFundMe</h1>
              <p>Innovate. Fund. Thrive</p>
            </div>
          </Link>
        </div>

        <div className={`menu d-flex-c ${isMenuDisplay ? "" : "dp-option"}`}>
          <ul className="menu-list d-flex-c">
            <li className="menu-item">
              <a href={"./#explore-project"}>Explore </a>
            </li>
            <li className="menu-item">
              {" "}
              <Link to={"/projects"}>Projects</Link>
            </li>
            <li className="menu-item">
              <Link to={"/contactUs"}>Contact Us</Link>
            </li>
            <li>
              {" "}
              <div className="search-menu">
                <input
                  className="search"
                  placeholder="search projects"
                  type="search"
                />
              </div>
            </li>
            <li>
              {" "}
              <div className="connect-wallet-btn">
                <WalletConnectBtn />
              </div>
            </li>
          </ul>
        </div>

        <button onClick={menuBtn} className="nav-dropdown-menu">
          &#9776;
        </button>
      </nav>
      <div className={`menu-area ${isMenuDisplay ? "" : "dp-option"}`}></div>

      <div className={`custom-message ${msgClassName}`}>
        <h4>{customMessage}</h4>
        <button
          type="button"
          class="btn-close"
          aria-label="Close"
          onClick={closeMsgFunc}
        ></button>
      </div>
    </React.Fragment>
  );
}

export default MainNavigation;
