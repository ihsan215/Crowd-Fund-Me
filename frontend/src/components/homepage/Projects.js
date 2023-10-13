import React from "react";

import ProjectItem from "./ProjectItem";

import { PopularProjects } from "../../auxiliary/GetProjects";

const SlideButtons = () => {
  return PopularProjects.map((item) => {
    return (
      <button
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide-to={item.id.toString()}
        className={item.id === 0 ? "active" : ""}
        aria-current="true"
        aria-label={`Slide + ${item.id.toString()}`}
      ></button>
    );
  });
};

const Slides = () => {
  return PopularProjects.map((item) => {
    return (
      <ProjectItem
        id={item.id}
        title={item.title}
        description={item.description}
        url={item.url}
        className={item.id === 0 ? "active" : ""}
      />
    );
  });
};

function Projects() {
  return (
    <React.Fragment>
      <div
        id="carouselExampleIndicators"
        class="carousel slide project-area"
        data-bs-ride="carousel"
      >
        <div class="carousel-indicators">{SlideButtons()}</div>
        <div class="carousel-inner">{Slides()}</div>

        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </React.Fragment>
  );
}

export default Projects;
