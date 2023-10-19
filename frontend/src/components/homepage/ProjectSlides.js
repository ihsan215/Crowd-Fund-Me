import React, { useState } from "react";
import ProjectCart from "./ProjectCart";

import { PopularProjects } from "../../auxiliary/GetProjects";

import leftIcon from "../../style/img/left.png";
import rightIcon from "../../style/img/right.png";

function displayProject(activeSlides) {
  return PopularProjects.map((item) => {
    return (
      <div
        className={`project-item ${
          activeSlides.includes(item.id) ? "dp" : "hide"
        } ${
          item.id === activeSlides[0]
            ? "bn-slide-l"
            : item.id === activeSlides[1]
            ? "current-slide"
            : "bn-slide-r"
        }`}
      >
        <ProjectCart
          key={item.id}
          title={item.title}
          description={item.description}
          url={item.url}
        />
      </div>
    );
  });
}

function ProjectSlides() {
  const [activeSlides, setActiveSlides] = useState([
    PopularProjects.length - 1,
    0,
    1,
  ]);

  const onNextBtn = () => {
    setActiveSlides(
      activeSlides.map((item) => {
        let newItem = item + 1;
        if (newItem >= PopularProjects.length) {
          newItem -= PopularProjects.length;
        }
        return newItem;
      })
    );
  };

  const onBeforeBtn = () => {
    setActiveSlides(
      activeSlides.map((item) => {
        let newItem = item - 1;
        if (newItem < 0) {
          newItem += PopularProjects.length;
        }
        return newItem;
      })
    );
  };

  return (
    <React.Fragment>
      <div className="slide-area">
        <button className="arrow-btn left-btn" onClick={onBeforeBtn}>
          <img src={leftIcon} alt="left-icon" />
        </button>
        <div className="popular-project-area">
          {displayProject(activeSlides)}
        </div>
        <button className="arrow-btn right-btn" onClick={onNextBtn}>
          <img src={rightIcon} alt="right-icon" />
        </button>
      </div>
    </React.Fragment>
  );
}

export default ProjectSlides;
