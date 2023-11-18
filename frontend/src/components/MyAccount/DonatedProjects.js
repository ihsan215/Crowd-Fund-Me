import React from "react";
import "../../style/components/MyAccount/ProjectsArea.css";
import CallDonatedProject from "./CallDonatedProject";

function CreatedProjects() {
  return (
    <React.Fragment>
      <div className="table-area">
        <h3>Donated Projects</h3>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Project Title</th>
              <th scope="col">Donation Amount</th>
            </tr>
          </thead>
          <tbody>
            <CallDonatedProject />
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
}

export default CreatedProjects;
