import React from "react";

import ProjectItem from "./ProjectItem";

import { PopularProjects } from "../../auxiliary/GetProjects";

function Projects() {
  return (
    <React.Fragment>
      <div className="container main-area project-area">
        <div className="row project-row">
          <ProjectItem
            id={PopularProjects[0].id}
            title={PopularProjects[0].title}
            description={PopularProjects[0].description}
            url={PopularProjects[0].url}
          />

          <ProjectItem
            id={PopularProjects[1].id}
            title={PopularProjects[1].title}
            description={PopularProjects[1].description}
            url={PopularProjects[1].url}
          />
          <ProjectItem
            id={PopularProjects[1].id}
            title={PopularProjects[1].title}
            description={PopularProjects[1].description}
            url={PopularProjects[1].url}
          />

          <ProjectItem
            id={PopularProjects[1].id}
            title={PopularProjects[1].title}
            description={PopularProjects[1].description}
            url={PopularProjects[1].url}
          />

          <ProjectItem
            id={PopularProjects[0].id}
            title={PopularProjects[0].title}
            description={PopularProjects[0].description}
            url={PopularProjects[0].url}
          />
          <ProjectItem
            id={PopularProjects[0].id}
            title={PopularProjects[0].title}
            description={PopularProjects[0].description}
            url={PopularProjects[0].url}
          />
          <ProjectItem
            id={PopularProjects[0].id}
            title={PopularProjects[0].title}
            description={PopularProjects[0].description}
            url={PopularProjects[0].url}
          />
          <ProjectItem
            id={PopularProjects[0].id}
            title={PopularProjects[0].title}
            description={PopularProjects[0].description}
            url={PopularProjects[0].url}
          />
          <ProjectItem
            id={PopularProjects[0].id}
            title={PopularProjects[0].title}
            description={PopularProjects[0].description}
            url={PopularProjects[0].url}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Projects;
