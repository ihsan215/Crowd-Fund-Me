import React, { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import WalletConnectBtn from "./WalletConnectBtn.js";
import "../style/components/MainNavigation.css";
import logoIcon from "../style/img/logo.svg";
import Web3Context from "../web3/Web3-context.js";
import { AJAXCall } from "../auxiliary/FetchingData.js";
import Spining from "../UI/Spinning.js";

function MainNavigation() {
  const [isMenuDisplay, setIsMenuDisplay] = useState(false);
  const [msgClassName, setMsgClassName] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const [showSpining, setShowSpining] = useState(false);

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

  const search = async (url) => {
    const response = await AJAXCall(url, {
      method: "GET",
    });

    setUsers(response.users);

    setTimeout(() => {
      if (response.users.length == 0) {
        setShowSpining(false);
      }
    }, 3000);
  };

  const searchHandle = (e) => {
    setShowUsers(true);
    if (e.target.value.length > 0) {
      setShowSpining(true);
      search(
        `https://crodfundme-server-21625d4d752e.herokuapp.com/getUsersearch/${e.target.value}`
      );
    } else {
      setShowSpining(false);
      setShowUsers(false);
    }
  };

  const outFocusHande = (e) => {
    e.target.value = "";
    setTimeout(() => {
      setShowSpining(false);
      setShowUsers(false);
    }, 100);
  };

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
              <div className="search-menu" onBlur={outFocusHande}>
                <input
                  className="search"
                  placeholder="search users"
                  type="search"
                  onChange={searchHandle}
                />
                {showUsers && (
                  <div className="search-options">
                    {users.length > 0 ? (
                      users.map((item) => (
                        <Link to={`/myAccount/${item.walletId}`}>
                          {item.name}
                        </Link>
                      ))
                    ) : showSpining ? (
                      <Spining isBtn={true} />
                    ) : (
                      <p>Not found !</p>
                    )}
                  </div>
                )}
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
