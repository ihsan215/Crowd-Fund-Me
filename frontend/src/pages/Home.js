import React from "react";

import Intro from "../components/homepage/Intro";
import GeneralInfo from "../components/homepage/GeneralInfo";

import "../style/Home.css";

function HomePage() {
  return (
    <React.Fragment>
      <div class="container-xl mt-3 p-1">
        <Intro />
        <GeneralInfo />
      </div>
    </React.Fragment>
  );
}

export default HomePage;
