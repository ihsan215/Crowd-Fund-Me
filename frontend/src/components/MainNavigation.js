import React, { useState } from "react";
import { Link } from "react-router-dom";
import WalletConnectBtn from "../UI/WalletConnectBtn.js";
import "../style/components/MainNavigation.css";
import logoIcon from "../style/img/logo.svg";

function MainNavigation() {
  const [isMenuDisplay, setIsMenuDisplay] = useState(false);

  const menuBtn = () => {
    setIsMenuDisplay(!isMenuDisplay);
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
            <li className="menu-item">Explore</li>
            <li className="menu-item">Projects</li>
            <li className="menu-item">Contact Us</li>
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
    </React.Fragment>
  );
}

export default MainNavigation;
