import React, { useState } from "react";

import ProjectCategory from "../components/projects/ProjectCategory";
import ProjectsComp from "../components/projects/ProjectsComp";
import FilterMenu from "../components/projects/FilterMenu";

import "../style/Projects.css";

function Projects() {
  const [SelectedItem, setSelectedItem] = useState(null);

  return (
    <React.Fragment>
      <div className="project-page__area">
        <ProjectCategory setSelectedItem={setSelectedItem} />
        <ProjectsComp SelectedItem={SelectedItem} />
      </div>
    </React.Fragment>
  );
}

export default Projects;
