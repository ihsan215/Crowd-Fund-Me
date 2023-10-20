import React from "react";

import Intro from "../components/homepage/Intro";
import GeneralInfo from "../components/homepage/GeneralInfo";
import ProjectInfo from "../components/homepage/ProjectInfo";
import ProjectSlides from "../components/homepage/ProjectSlides";

import BreakLine from "../components/BreakLine";

import "../style/Home.css";

function HomePage() {
  return (
    <React.Fragment>
      <div class="container-xl p-1">
        <Intro />
        <GeneralInfo />
        <BreakLine />
        <ProjectInfo />
        <ProjectSlides />
        <BreakLine />
      </div>
    </React.Fragment>
  );
}

export default HomePage;
