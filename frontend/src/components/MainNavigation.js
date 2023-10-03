import React from "react";
import { Link } from "react-router-dom";

import "../style/components/MainNavigation.css";

function MainNavigation() {
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

        <div class="collapse navbar-collapse" id="navbarSupportedContent"></div>
      </nav>
    </React.Fragment>
  );
}

export default MainNavigation;
