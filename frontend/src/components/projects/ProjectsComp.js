import React, { useState } from "react";
import ProjectCart from "../../UI/ProjectCart.js";

import { PopularProjects } from "../../auxiliary/GetProjects.js";

function displayProject(page) {
  return PopularProjects.map((item) => {
    return (
      <ProjectCart
        key={item.id}
        title={item.title}
        description={item.description}
        url={item.url}
      />
    );
  });
}

function ProjectsComp() {
  const [activePage, setActivePage] = useState(0);

  return (
    <React.Fragment>
      <div className="project-page__projects">
        <h3 class="heading">CrowdFund Projects</h3>
        <div class="container">
          <div class="product-row">{displayProject(activePage)}</div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ProjectsComp;
