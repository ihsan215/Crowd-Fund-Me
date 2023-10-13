import React from "react";

function ProjectItem(props) {
  return (
    <React.Fragment>
      <div className={`carousel-item ${props.className}`}>
        <img
          src={props.url}
          className="d-block w-100"
          alt={props.title + "img"}
        />
        <div className="carousel-caption d-none d-md-block">
          <h5>{props.title}</h5>
          <p>{props.description}</p>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ProjectItem;
