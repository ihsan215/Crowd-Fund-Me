import React from "react";

function ProjectItem(props) {
  return (
    <React.Fragment>
      <div className="col-3 project-col">
        <img src={props.url} alt="project img" />
        <h1>{props.title}</h1>
        <p>{props.description}</p>
      </div>
    </React.Fragment>
  );
}

export default ProjectItem;
