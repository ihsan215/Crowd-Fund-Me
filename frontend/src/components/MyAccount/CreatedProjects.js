import React from "react";

import "../../style/components/MyAccount/ProjectsArea.css";

import CallProjectSumm from "./CallProjectSumm";

function CreatedProjects({ userId }) {
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
              <th scope="col">Project Link</th>
            </tr>
          </thead>
          <tbody>
            <CallProjectSumm userId={userId} />
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
}

export default CreatedProjects;
