import React, { useState } from "react";
import ProjectCart from "./ProjectCart";
import Button from "../../UI/Button";

import { PopularProjects } from "../../auxiliary/GetProjects";

import leftIcon from "../../style/img/left.png";
import rightIcon from "../../style/img/right.png";

function displayProject(activeSlides) {
  return PopularProjects.map((item) => {
    return (
      <div
        className={`project-item ${
          activeSlides.includes(item.id) ? "active" : "hidden"
        }`}
      >
        <ProjectCart
          title={item.title}
          description={item.description}
          url={item.url}
        />
      </div>
    );
  });
}

function ProjectSlides() {
  const [activeSlides, setActiveSlides] = useState([0, 1, 2]);
  const [showLeftBtn, setShowLeftBtn] = useState(false);
  const [showrightBtn, setShowrightBtn] = useState(true);

  const onNextBtn = () => {
    if (activeSlides[2] >= PopularProjects.length - 1) {
      setShowrightBtn(false);
      return;
    }
    setActiveSlides(
      activeSlides.map((item) => {
        return item + 1;
      })
    );

    setShowLeftBtn(true);
  };

  const onBeforeBtn = () => {
    if (activeSlides[0] <= 0) {
      setShowLeftBtn(false);
      return;
    }

    setActiveSlides(
      activeSlides.map((item) => {
        return item - 1;
      })
    );

    setShowrightBtn(true);
  };

  return (
    <React.Fragment>
      <div className="slide-area">
        <button className="arraw-btn left-btn" onClick={onBeforeBtn}>
          <img
            src={leftIcon}
            alt="left-icon"
            className={showLeftBtn ? "" : "hidden"}
          />
        </button>
        <div className="popular-project-area">
          {displayProject(activeSlides)}
        </div>
        <button className="arraw-btn right-btn" onClick={onNextBtn}>
          <img
            src={rightIcon}
            alt="right-icon"
            className={showrightBtn ? "" : "hidden"}
          />
        </button>
      </div>
    </React.Fragment>
  );
}

export default ProjectSlides;
