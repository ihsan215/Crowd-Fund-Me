import React from "react";

import "../../style/components/MyAccount/ProjectsArea.css";

function CreatedProjects() {
  return (
    <React.Fragment>
      <div className="table-area">
        <h3>Suportted Projects</h3>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Project Title</th>
              <th scope="col">Donation Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>1000</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>2000</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Jacob</td>
              <td>2000</td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>Jacob</td>
              <td>2000</td>
            </tr>
            <tr>
              <th scope="row">5</th>
              <td>Jacob</td>
              <td>2000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
}

export default CreatedProjects;
