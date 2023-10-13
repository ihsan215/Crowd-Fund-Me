import React from "react";

import Intro from "../components/homepage/Intro";
import GeneralInfo from "../components/homepage/GeneralInfo";
import Projects from "../components/homepage/Projects";

import "../style/Home.css";

function HomePage() {
  return (
    <React.Fragment>
      <div class="container-xl mt-3 p-1">
        <Intro />
        <GeneralInfo />
        <Projects />
      </div>
    </React.Fragment>
  );
}

export default HomePage;
