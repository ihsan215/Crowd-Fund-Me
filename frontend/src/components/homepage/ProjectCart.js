import React from "react";
import imgSrc from "../../style/img/projectInfo.png";

function ProjectCart(props) {
  return (
    <React.Fragment>
      <div class="card">
        <img
          src={props.url}
          class="card-img-top project-cart-img"
          alt="project"
        />
        <div class="card-body">
          <h5 class="card-title">{props.title}</h5>
          <p class="card-text project-cart-description">{props.description}</p>
          <a href="#" class="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ProjectCart;
