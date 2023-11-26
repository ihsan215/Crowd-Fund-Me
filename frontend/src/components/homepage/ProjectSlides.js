import React, { useState, useEffect } from "react";
import ProjectCart from "../../UI/ProjectCart.js";
import { useLocation } from "react-router-dom";
import { getPopularProjects } from "../../auxiliary/GetProjects";
import leftIcon from "../../style/img/left.png";
import rightIcon from "../../style/img/right.png";
import Spinning from "../../UI/Spinning.js";

function ProjectSlides() {
  const location = useLocation();
  const [PopularProjects, setPopularProjects] = useState([]);

  async function getProjects() {
    const PopularProjects = await getPopularProjects();
    setPopularProjects(PopularProjects);
  }

  useEffect(() => {
    const elementId = location.hash.substring(1); // Remove the leading '#' from the URL hash
    scrollToElement(elementId);
  }, [location]);

  useEffect(() => {
    getProjects();
    onNextBtn();
  }, []);

  const scrollToElement = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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
      <div
        className="d-flex-c"
        id="explore-project"
        style={{
          justifyContent: "space-evenly",
          backgroundColor: "#202020",
          color: "aliceblue",
        }}
      >
        <h1>
          Explore <span style={{ color: "rgb(255,216,0)" }}>CrowdFundMe</span>{" "}
          Projects
        </h1>
      </div>
      <div className="slide-area">
        <button className="arrow-btn left-btn" onClick={onBeforeBtn}>
          <img src={leftIcon} alt="left-icon" />
        </button>
        <div className="popular-project-area">
          {PopularProjects.length > 0 ? (
            PopularProjects.map((item) => {
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
                    author={item.author}
                    projectURL={item.projectURL}
                    ownerURL={item.ownerURL}
                    categoria={item.categoria}
                    className="project-cart"
                  />
                </div>
              );
            })
          ) : (
            <Spinning />
          )}
        </div>
        <button className="arrow-btn right-btn" onClick={onNextBtn}>
          <img src={rightIcon} alt="right-icon" />
        </button>
      </div>
    </React.Fragment>
  );
}

export default ProjectSlides;
