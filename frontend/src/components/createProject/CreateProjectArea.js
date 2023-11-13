import React from "react";

import "../../style/components//Forms.css";

import CreateProjectForm from "./CreateProjectForm";

import imgSrc from "../../style/img/project_inf.png";

function CreateProjectArea() {
  return (
    <React.Fragment>
      <div className="container__area">
        <div className="form-col-project">
          <CreateProjectForm />
        </div>
        <div className="map-col">
          <img
            className="create-project-img"
            src={imgSrc}
            alt="create project img"
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default CreateProjectArea;
