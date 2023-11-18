import React from "react";

import "../../style/components/MyAccount/ProjectsArea.css";

import CallProjectSumm from "./CallProjectSumm";

function CreatedProjects() {
  return (
    <React.Fragment>
      <div className="table-area">
        <h3>Created Projects</h3>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Project Title</th>
              <th scope="col">Total Fund</th>
            </tr>
          </thead>
          <tbody>
            <CallProjectSumm />
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
}

export default CreatedProjects;
